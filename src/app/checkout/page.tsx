"use client"

import { useState, useEffect, Suspense } from "react"
import { AlertCircle, ArrowRight, QrCode, ShieldCheck, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { validateCPFOrCNPJ, formatDocument, formatBrazilianPhone, validateBrazilianPhone, validateEmail } from "@/lib/validation"
import { useForm } from "@/hooks/use-form"
import { PRODUCTS, calculateTotal } from "@/lib/products"
import { createPixPayment } from "@/lib/api"
import { fadeInUp, fadeIn, staggerContainer, staggerItem } from "@/lib/animation-variants"
import { getProfile } from "@/config/profiles"
import { Profile } from "@/types/profile"

import { Card } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PaymentProcessingModal } from "@/components/modals/payment-processing-modal"

interface CheckoutFormData {
  name: string
  email: string
  phone: string
  document: string
}

function CheckoutContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderBumpSelected, setOrderBumpSelected] = useState(false)
  const [showProcessingModal, setShowProcessingModal] = useState(false)
  const [paymentReady, setPaymentReady] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const validateForm = (values: CheckoutFormData) => {
    const errors: Record<string, string | undefined> = {}
    
    if (!values.name || values.name.trim().length < 2) {
      errors.name = "Nome deve ter pelo menos 2 caracteres"
    }
    
    if (!values.email) {
      errors.email = "Email é obrigatório"
    } else {
      const emailError = validateEmail(values.email)
      if (emailError) errors.email = emailError
    }
    
    if (!values.phone) {
      errors.phone = "Telefone é obrigatório"
    } else if (!validateBrazilianPhone(values.phone)) {
      errors.phone = "Telefone inválido. Use o formato (XX) XXXXX-XXXX"
    }
    
    if (!values.document) {
      errors.document = "CPF/CNPJ é obrigatório"
    } else {
      const docError = validateCPFOrCNPJ(values.document)
      if (docError) errors.document = docError
    }
    
    return errors
  }

  const {
    values,
    errors,
    isSubmitting,
    setValue,
    register,
    handleSubmit
  } = useForm<CheckoutFormData>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      document: ""
    },
    validate: validateForm,
    onSubmit: async (data) => {
      await onSubmit(data)
    }
  })

  const phoneValue = values.phone || ""
  const documentValue = values.document || ""

  useEffect(() => {
    const profileId = searchParams.get("profile")
    if (profileId) {
      const profileData = getProfile(profileId)
      setProfile(profileData)
    } else {
      // Redirecionar para perfil padrão se não especificado
      router.push("/checkout?profile=oordonhas")
    }
  }, [searchParams, router])

  const handlePhoneChange = (value: string) => {
    const formatted = formatBrazilianPhone(value)
    setValue("phone", formatted)
  }

  const handleDocumentChange = (value: string) => {
    const formatted = formatDocument(value)
    setValue("document", formatted)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true)
    setShowProcessingModal(true)
    setPaymentReady(false)

    try {
      const productId = orderBumpSelected ? PRODUCTS.note_finances.id : PRODUCTS.note_private.id

      const cleanedPhone = data.phone.replace(/\D/g, "")
      const cleanedDocument = data.document.replace(/\D/g, "")

      const payload = {
        productId,
        email: data.email,
        phone: cleanedPhone,
        document: cleanedDocument,
      }

      const response = await createPixPayment(payload)

      if (response.success && response.data && response.data.id) {

        localStorage.setItem(`pix_${response.data.id}`, JSON.stringify(response.data))
        localStorage.setItem("pending_invoice_id", response.data.id)

        setPaymentReady(true)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido"
      alert(`Erro ao processar pagamento: ${errorMessage}. Tente novamente.`)
      setShowProcessingModal(false)
      setIsLoading(false)
      setPaymentReady(false)
    }
  }

  const handleModalComplete = () => {

    const invoiceId = localStorage.getItem("pending_invoice_id")

    if (invoiceId) {
      localStorage.removeItem("pending_invoice_id")
      router.push(`/invoice/${invoiceId}`)
    } else {
      setShowProcessingModal(false)
      setIsLoading(false)
    }
  }

  const productIds = ["note_private"]
  if (orderBumpSelected) {
    productIds.push("note_finances")
  }
  const totalPrice = calculateTotal(productIds)

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando perfil...</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="min-h-screen bg-[#EFEFEF] flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:justify-between lg:gap-8 lg:px-4">
        <motion.div className="lg:w-1/3" variants={fadeInUp}>
          <div id="header" className="justify-center text-center items-center h-auto pt-4 flex flex-col gap-2">
            <div id="header-profile" className="flex space-x-2">
              <Image
                src={profile.avatar}
                alt={`${profile.name} profile`}
                width={24}
                height={24}
                quality={100}
                className="rounded-[5px]"
              />
              <h4 className="tracking-tighter font-medium text-xl text-zinc-600">{profile.name}</h4>
            </div>
            <div
              id="header-payment-security"
              className="p-2 px-20 bg-[#FFFFFF] rounded-[10px] mx-4 my-4 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="size-5 text-zinc-700" />
              <h2 className="text-base text-zinc-600 tracking-wide">COMPRA SEGURA</h2>
            </div>
            <div id="header-products" className="pb-2 flex flex-row items-center space-x-4 pt-1">
              <Image
                src={profile.links[0]?.icon || "/assets/whey.png"}
                alt={`${PRODUCTS.note_private.name} product`}
                width={96}
                height={96}
                quality={100}
                className="rounded-[5px]"
              />
              <h2 className="text-foreground font-medium">{PRODUCTS.note_private.name}</h2>
            </div>
            <div id="header-prices" className="flex flex-col w-full pb-4 px-5">
              <div className="bg-green-200 h-[1px] w-full" />
              <div className="flex w-full justify-between items-center pt-1">
                <h2 className="font-normal text-base">TOTAL</h2>
                <motion.h2
                  className="font-bold text-zinc-800"
                  key={totalPrice}
                  initial={{ scale: 1.2, color: "#00dc82" }}
                  animate={{ scale: 1, color: "#27272a" }}
                  transition={{ duration: 0.3 }}
                >
                  R$ {totalPrice.toFixed(2)}
                </motion.h2>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="lg:w-2/3" variants={fadeInUp}>
          <Card id="content" className="rounded-t-[20px] bg-[#FFFFFF] flex flex-col shadow-zinc-200">
            <div id="content-header" className="flex flex-col my-6 items-center">
              <h1 className="font-semibold text-zinc-900">OS SEUS DADOS</h1>
            </div>
            <div id="content-inputs" className="px-4 pb-10">
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                  <FieldGroup>
                    <motion.div variants={staggerItem}>
                      <Field>
                        <FieldLabel htmlFor="name" className="text-zinc-600">
                          Nome e sobrenome *
                        </FieldLabel>
                        <Input
                          id="name"
                          type="text"
                          placeholder="João Silva"
                          {...register("name")}
                          className={errors.name ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {errors.name && (
                          <motion.p
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="size-4" />
                            {errors.name}
                          </motion.p>
                        )}
                      </Field>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Field>
                        <FieldLabel htmlFor="email" className="text-zinc-600">
                          E-mail *
                        </FieldLabel>
                        <Input
                          id="email"
                          type="email"
                          placeholder="joao@example.com"
                          {...register("email")}
                          className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {errors.email && (
                          <motion.p
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="size-4" />
                            {errors.email}
                          </motion.p>
                        )}
                      </Field>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Field>
                        <FieldLabel htmlFor="phone" className="text-zinc-600">
                          Celular *
                        </FieldLabel>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={phoneValue}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePhoneChange(e.target.value)}
                          className={errors.phone ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {errors.phone && (
                          <motion.p
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="size-4" />
                            {errors.phone}
                          </motion.p>
                        )}
                      </Field>
                    </motion.div>

                    <motion.div variants={staggerItem}>
                      <Field>
                        <FieldLabel htmlFor="document" className="text-zinc-600">
                          CPF / CNPJ *
                        </FieldLabel>
                        <Input
                          id="document"
                          type="text"
                          placeholder="000.000.000-00"
                          value={documentValue}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleDocumentChange(e.target.value)}
                          className={errors.document ? "border-red-500 focus:border-red-500" : ""}
                        />
                        {errors.document && (
                          <motion.p
                            className="text-red-500 text-sm mt-1 flex items-center gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <X className="size-4" />
                            {errors.document}
                          </motion.p>
                        )}
                      </Field>
                    </motion.div>
                  </FieldGroup>
                </motion.div>
              </form>
            </div>
            <div id="content-method-payment" className="flex flex-col pb-10 px-5 space-y-5">
              <h1 className="font-semibold text-zinc-800 items-center text-center">MÉTODO DE PAGAMENTO</h1>
              <motion.div
                className="p-4 text-white rounded-[7px] h-20 w-44 flex flex-col space-y-2"
                style={{ backgroundColor: profile.theme.primaryColor }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <QrCode className="size-5" />
                <h2 className="text-sm font-medium">PIX</h2>
              </motion.div>
              <div className="flex flex-col no-underline">
                <h4 className="text-green-500 flex flex-row items-center gap-2 text-xs">
                  <AlertCircle className="size-4" />
                  ATENÇÃO A ESTES DETALHES
                </h4>
                <div className="pt-3 px-1 text-xs text-zinc-500/90 flex flex-col space-y-1.5">
                  <span>- Somente à vista;</span>
                  <span>
                    - O(s) produto(s) será(ão) liberado(s) somente após recebermos a confirmação de pagamento;
                  </span>
                  <span>
                    - Fique atento(a) à data de vencimento. Após a expiração, será necessário refazer seu pedido.
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        id="orderbump"
        className="flex flex-col px-4 pb-10 w-full max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <svg
          className="w-full"
          width="100%"
          height="17"
          viewBox="0 0 642 17"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
            fill="#EFEFEF"
          />
        </svg>
        <div id="orderbump-header" className="flex flex-col items-center text-center justify-center space-y-2 mt-4">
          <h1 className="text-zinc-900 font-semibold">Essa oferta não irá aparecer em nenhum outro lugar!</h1>
          <h4 className="text-zinc-900">Aproveite e compre outros produtos com desconto.</h4>
        </div>
        <div id="orderbump-products" className="flex flex-col items-center text-center justify-center space-y-2 pt-4">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-white p-2 px-4 py-4 items-start text-start justify-start w-full max-w-2xl">
              <h1 className="text-zinc-900 font-medium">(50% OFF) {profile.sectionTitle} complementar exclusivo!</h1>
              <div className="py-2 flex flex-row items-center gap-4">
                <Checkbox
                  checked={orderBumpSelected}
                  onCheckedChange={(checked: boolean) => setOrderBumpSelected(checked)}
                  className="border-green-600 border-2 size-5"
                />
                <div id="header-products" className="pb-2 flex flex-row items-center space-x-4 pt-3">
                  <Image
                    src="/assets/note-perfil.png"
                    alt="Note Finances"
                    width={96}
                    height={96}
                    quality={100}
                    className="rounded-[5px]"
                  />
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-zinc-700">{PRODUCTS.note_finances.name}</h2>
                    <h2 className="font-semibold">R$ {PRODUCTS.note_finances.price.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
        <svg className="w-full" width="100%" height="17" viewBox="0 0 642 17" preserveAspectRatio="none">
          <path
            d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
            fill="#EFEFEF"
          />
        </svg>
      </motion.div>

      <motion.div
        id="button-pay"
        className="flex flex-col justify-center items-center text-center pb-8 bg-white w-full space-y-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <svg className="w-full" width="100%" height="17" viewBox="0 0 642 17" preserveAspectRatio="none">
          <path
            d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
            fill="white"
          />
        </svg>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || isSubmitting}
            size="lg"
            className="text-white h-14 px-12 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            style={{ 
              backgroundColor: profile.theme.primaryColor,
              '--hover-color': profile.theme.secondaryColor
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = profile.theme.secondaryColor
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = profile.theme.primaryColor
            }}
          >
            {isLoading || isSubmitting ? "Processando..." : "Finalizar Compra"}
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </motion.div>
        <Button variant="ghost" className="text-zinc-600 h-9 w-auto flex flex-row gap-2 items-center">
          Fale com um especialista
          <ArrowRight className="size-4 text-zinc-500" />
        </Button>
      </motion.div>

      <PaymentProcessingModal isOpen={showProcessingModal} onComplete={handleModalComplete} isReady={paymentReady} />
    </motion.div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
