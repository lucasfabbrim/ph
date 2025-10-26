"use client"

import { useState } from "react"
import { AlertCircle, ArrowRight, ChevronDown, QrCode, ShieldCheck, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"

import { Card } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/lib/products"
import { useForm } from "@/hooks/use-form"

// ===== SCHEMAS E TIPOS =====
const validationSchema = z.strictObject({
  cpfCnpj: z
    .string()
    .min(1, 'CPF/CNPJ é obrigatório.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length >= 11;
    }, 'CPF/CNPJ deve conter no mínimo 11 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return replacedDoc.length <= 14;
    }, 'CPF/CNPJ deve conter no máximo 14 caracteres.')
    .refine((doc) => {
      const replacedDoc = doc.replace(/\D/g, '');
      return !!Number(replacedDoc);
    }, 'CPF/CNPJ deve conter apenas números.'),
});

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  cpfCnpj: string
}

// ===== UTILITÁRIOS =====
const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 2) return numbers
  if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
  if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
}

const formatCPFCNPJ = (value: string) => {
  const numbers = value.replace(/\D/g, "")
  if (numbers.length <= 11) {
    // CPF: 000.000.000-00
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`
  } else {
    // CNPJ: 00.000.000/0000-00
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`
  }
}

const isValidCPF = (cpf: string): boolean => {
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false
  
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cpf.charAt(9))) return false
  
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  return remainder === parseInt(cpf.charAt(10))
}

const isValidCNPJ = (cnpj: string): boolean => {
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false
  
  let sum = 0
  let weight = 2
  for (let i = 11; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  let remainder = sum % 11
  const firstDigit = remainder < 2 ? 0 : 11 - remainder
  if (firstDigit !== parseInt(cnpj.charAt(12))) return false
  
  sum = 0
  weight = 2
  for (let i = 12; i >= 0; i--) {
    sum += parseInt(cnpj.charAt(i)) * weight
    weight = weight === 9 ? 2 : weight + 1
  }
  remainder = sum % 11
  const secondDigit = remainder < 2 ? 0 : 11 - remainder
  return secondDigit === parseInt(cnpj.charAt(13))
}

// ===== COMPONENTES =====
const DecorativeSVG = ({ fill = "#EFEFEF" }: { fill?: string }) => (
  <svg className="w-full" width="100%" height="17" viewBox="0 0 642 17" preserveAspectRatio="none">
    <path
      d="M0 2.4326e-10L10.7167 5.38333C17.4596 8.77055 25.407 8.77055 32.15 5.38333C38.893 1.99612 46.8404 1.99612 53.5833 5.38333C60.3263 8.77055 68.2737 8.77055 75.0167 5.38333C81.7596 1.99612 89.707 1.99612 96.45 5.38333C103.193 8.77055 111.14 8.77055 117.883 5.38333C124.626 1.99612 132.574 1.99612 139.317 5.38333C146.06 8.77055 154.007 8.77055 160.75 5.38333C167.493 1.99612 175.44 1.99612 182.183 5.38333C188.926 8.77055 196.874 8.77055 203.617 5.38333C210.36 1.99612 218.307 1.99612 225.05 5.38333C231.793 8.77055 239.74 8.77055 246.483 5.38333C253.226 1.99612 261.174 1.99612 267.917 5.38333C274.66 8.77055 282.607 8.77055 289.35 5.38333C296.093 1.99612 304.04 1.99612 310.783 5.38333C317.526 8.77055 325.474 8.77055 332.217 5.38333C338.96 1.99612 346.907 1.99612 353.65 5.38333C360.393 8.77055 368.34 8.77055 375.083 5.38333C381.826 1.99612 389.774 1.99612 396.517 5.38333C403.26 8.77055 411.207 8.77055 417.95 5.38333C424.693 1.99612 432.64 1.99612 439.383 5.38333C446.126 1.99612 454.074 1.99612 460.817 5.38333C467.56 1.99612 475.507 1.99612 482.25 5.38333C488.993 8.77055 496.94 8.77055 503.683 5.38333C510.426 1.99612 518.374 1.99612 525.117 5.38334C531.86 8.77055 539.807 8.77054 546.55 5.38333C553.293 1.99613 561.24 1.99612 567.983 5.38333C574.726 8.77055 582.674 8.77055 589.417 5.38333C596.16 1.99612 604.107 1.99612 610.85 5.38332C617.593 8.77054 625.54 8.77054 632.283 5.38332L643 0V17H0V2.4326e-10Z"
      fill={fill}
    />
  </svg>
)

// ===== COMPONENTE PRINCIPAL =====
export default function CheckoutPage() {
  // ===== ESTADOS =====
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [orderBumpSelected, setOrderBumpSelected] = useState(false)
  const router = useRouter()

  // ===== VALIDAÇÃO =====
  const validateForm = (values: CheckoutFormData) => {
    const errors: Record<string, string | undefined> = {}
    
    if (!values.fullName || values.fullName.trim().length < 3) {
      errors.fullName = "Nome deve ter pelo menos 3 caracteres"
    }
    
    if (!values.email) {
      errors.email = "E-mail é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "E-mail inválido"
    }
    
    if (!values.phone) {
      errors.phone = "Telefone é obrigatório"
    } else if (!/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(values.phone)) {
      errors.phone = "Telefone inválido. Use o formato (XX) XXXXX-XXXX"
    }
    
    // Validação CPF/CNPJ usando Zod
    try {
      validationSchema.parse({ cpfCnpj: values.cpfCnpj })
      
      // Validações adicionais de CPF/CNPJ
      if (values.cpfCnpj) {
        const cleanDoc = values.cpfCnpj.replace(/\D/g, "")
        if (cleanDoc.length === 11) {
          if (!isValidCPF(cleanDoc)) {
            errors.cpfCnpj = "CPF inválido"
          }
        } else if (cleanDoc.length === 14) {
          if (!isValidCNPJ(cleanDoc)) {
            errors.cpfCnpj = "CNPJ inválido"
          }
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.cpfCnpj = error.issues[0]?.message || "CPF/CNPJ inválido"
      }
    }
    
    return errors
  }

  // ===== HOOKS =====
  const {
    values,
    errors,
    isSubmitting,
    setValue,
    handleSubmit,
  } = useForm<CheckoutFormData>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      cpfCnpj: ""
    },
    validate: validateForm,
    onSubmit: async (data) => {
      await onSubmit(data)
    }
  })

  // ===== HANDLERS =====
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    setValue("phone", formatted)
  }

  const handleDocumentChange = (value: string) => {
    const formatted = formatCPFCNPJ(value)
    setValue("cpfCnpj", formatted)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method)
  }

  const handleContinue = () => {
    if (paymentMethod === "pix") {
      console.log("Processando pagamento PIX...")
    } else if (paymentMethod === "credit-card") {
      console.log("Processando pagamento cartão...")
    }
  }

  const onSubmit = async (data: CheckoutFormData) => {
    console.log("[v0] Form data:", data)
    localStorage.setItem("checkoutData", JSON.stringify(data))
    setIsLoading(true)
    
    try {
      // Criar pagamento PIX
      const { createPixPayment } = await import("@/lib/api")
      
      const pixPayload = {
        productId: orderBumpSelected ? PRODUCTS.note_complete_bundle.id : PRODUCTS.note_private.id,
        email: data.email,
        phone: data.phone.replace(/\D/g, ''),
        document: data.cpfCnpj.replace(/\D/g, '')
      }
      
      console.log("Criando pagamento PIX:", pixPayload)
      const pixResponse = await createPixPayment(pixPayload)
      
      if (pixResponse.success && pixResponse.data) {
        // Salvar dados do PIX no localStorage
        const pixData = {
          id: pixResponse.data.id,
          qrCode: pixResponse.data.qrCode,
          qrCodeBase64: pixResponse.data.qrCodeBase64,
          value: pixResponse.data.value,
          expirationDate: pixResponse.data.expirationDate,
        }
        
        localStorage.setItem(`pix_${pixResponse.data.id}`, JSON.stringify(pixData))
        
        // Redirecionar para a página de invoice
        router.push(`/invoice/${pixResponse.data.id}`)
      } else {
        console.error("Erro ao criar pagamento PIX:", pixResponse)
        alert("Erro ao processar pagamento. Tente novamente.")
      }
    } catch (error) {
      console.error("Erro ao criar pagamento:", error)
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // ===== UTILITÁRIOS DE PRODUTO =====
  const getProductImage = (productId: string) => {
    if (productId === PRODUCTS.note_private.id) {
      return "/note-private.png"
    }
    if (productId === PRODUCTS.note_finances.id) {
      return "/note-finances.png"
    }
    return "/noteplanning-app-icon-logo.jpg"
  }

  const getProductName = (productId: string) => {
    if (productId === PRODUCTS.note_private.id) {
      return PRODUCTS.note_private.name
    }
    if (productId === PRODUCTS.note_finances.id) {
      return PRODUCTS.note_finances.name
    }
    return "Note Private (Template)"
  }

  // ===== CÁLCULOS =====
  const totalPrice = orderBumpSelected ? PRODUCTS.note_complete_bundle.price : PRODUCTS.note_private.price

  return (
    <>
      <motion.div 
        className="min-h-screen bg-[#EFEFEF] flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-5xl flex flex-col lg:flex-row lg:justify-between">
          {/* ===== HEADER SECTION ===== */}
          <motion.div 
            className=""
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div id="header" className="justify-center text-center items-center h-auto pt-4 flex flex-col gap-2">
              <div id="header-noteplanning" className="flex space-x-2">
                <Image
                  src="/noteplanning-app-icon-logo.jpg"
                  alt="icon-noteplanning"
                  width={24}
                  height={20}
                  quality={100}
                  className="rounded-[5px]"
                />
                <h4 className="tracking-tighter font-medium text-xl text-zinc-600">noteplanning</h4>
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
                  src={getProductImage(PRODUCTS.note_private.id)}
                  alt="product-noteplanning"
                  width={100}
                  height={20}
                  quality={100}
                  className="rounded-[5px]"
                />
                <h2>{getProductName(PRODUCTS.note_private.id)}</h2>
              </div>
              
              <div id="header-details" className="items-center justify-center space-y-3 pt-2">
                <div className="p-2 bg-[#D1EFE0] h-7 rounded-[7px] flex flex-row justify-between items-center text-center">
                  <h2 className="px-2 text-sm text-zinc-700">Detalhe da Compra</h2>
                  <ChevronDown className="size-5 text-zinc-700" strokeWidth={1.0} />
                </div>
              </div>
              
              <div id="header-prices" className="flex flex-col w-full pb-4 px-5">
                <div className="bg-green-200 h-[1px] w-full" />
                <div className="flex w-full justify-between items-center pt-1">
                  <h2 className="font-normal text-base">TOTAL</h2>
                  <motion.h2 
                    className="font-bold text-zinc-800"
                    style={{ color: "#00dc82" }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      color: ["#00dc82", "#00ff88", "#00dc82"]
                    }}
                    transition={{ 
                      duration: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  >
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </motion.h2>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ===== FORM SECTION ===== */}
          <motion.div 
            style={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card id="content" className="rounded-t-[20px] bg-[#FFFFFF] flex flex-col shadow-zinc-200">
              <div id="content-header" className="flex flex-col my-6 items-center">
                <h1 className="font-semibold text-zinc-900">OS SEUS DADOS</h1>
              </div>
              
              <div id="content-inputs" className="px-4 pb-10">
                <form onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="fullName" className="text-zinc-600">
                        Nome e sobrenome *
                      </FieldLabel>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="João Silva"
                        value={values.fullName || ""}
                        onChange={(e) => setValue("fullName", e.target.value)}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <motion.p 
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="size-4" />
                          {errors.fullName}
                        </motion.p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="email" className="text-zinc-600">
                        E-mail *
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="joao@example.com"
                        value={values.email || ""}
                        onChange={(e) => setValue("email", e.target.value)}
                        className={errors.email ? "border-red-500" : ""}
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

                    <Field>
                      <FieldLabel htmlFor="phone" className="text-zinc-600">
                        Celular *
                      </FieldLabel>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={values.phone || ""}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        className={errors.phone ? "border-red-500" : ""}
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

                    <Field>
                      <FieldLabel htmlFor="cpfCnpj" className="text-zinc-600">
                        CPF / CNPJ *
                      </FieldLabel>
                      <Input
                        id="cpfCnpj"
                        type="text"
                        placeholder="000.000.000-00"
                        value={values.cpfCnpj || ""}
                        onChange={(e) => handleDocumentChange(e.target.value)}
                        className={errors.cpfCnpj ? "border-red-500" : ""}
                      />
                      {errors.cpfCnpj && (
                        <motion.p 
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <X className="size-4" />
                          {errors.cpfCnpj}
                        </motion.p>
                      )}
                    </Field>
                  </FieldGroup>
                </form>
              </div>
              
              <div id="content-method-payment" className="flex flex-col pb-10 px-5 space-y-5">
                <h1 className="font-semibold text-zinc-800 items-center text-center">MÉTODO DE PAGAMENTO</h1>
                <div 
                  className="p-4 bg-green-500 text-white rounded-[7px] h-20 w-44 flex flex-col space-y-2 cursor-pointer hover:bg-green-600 transition-colors"
                  onClick={() => handlePaymentMethodSelect("pix")}
                >
                  <QrCode className="size-5" />
                  <h2 className="text-sm font-medium">PIX</h2>
                </div>
                
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

        {/* ===== ORDER BUMP SECTION ===== */}
        <motion.div 
          id="orderbump" 
          className="flex flex-col px-4 pb-10 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <DecorativeSVG />
          
          <div id="orderbump-header" className="flex flex-col items-center text-center justify-center space-y-2 mt-4">
            <h1 className="text-zinc-900 font-semibold">Essa oferta não irá aparecer em nenhum outro lugar!</h1>
            <h4 className="text-zinc-900">Aproveite e compre outros produtos com desconto.</h4>
          </div>
          
          <div id="orderbump-products" className="flex flex-col items-center text-center justify-center space-y-2 pt-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOrderBumpSelected(!orderBumpSelected)}
              className="cursor-pointer"
            >
              <Card className="bg-white p-2 px-4 py-4 items-start text-start justify-start">
                <h1 className="text-zinc-900 font-medium">{PRODUCTS.note_complete_bundle.description}</h1>
                <div className="py-2 flex flex-row items-center gap-4">
                  <Checkbox 
                    className="border-green-600 border-2 size-5"
                    checked={orderBumpSelected}
                    onCheckedChange={(checked) => setOrderBumpSelected(!!checked)}
                  />
                  <div id="header-products" className="pb-2 flex flex-row items-center space-x-4 pt-3">
                    <Image
                      src={getProductImage(PRODUCTS.note_finances.id)}
                      alt="order-bump-bundle"
                      width={100}
                      height={100}
                      quality={100}
                      className="rounded-[5px]"
                    />
                    <div className="flex flex-col space-y-1">
                      <h2 className="text-zinc-700">{PRODUCTS.note_complete_bundle.name}</h2>
                      <h2 className="font-semibold">R$ {PRODUCTS.note_complete_bundle.price.toFixed(2).replace('.', ',')}</h2>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
          
          <DecorativeSVG />
        </motion.div>

        {/* ===== BUTTON SECTION ===== */}
        <motion.div
          id="button-pay"
          className="flex flex-col justify-center items-center text-center pb-8 bg-white w-full space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <DecorativeSVG fill="white" />
          
          {/* ===== ERROR CARD ===== */}
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md mx-4"
            >
              <Card className="bg-red-50 border-red-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <X className="size-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-red-800 font-semibold text-sm mb-2">
                      Corrija os seguintes erros:
                    </h3>
                    <ul className="text-red-700 text-sm space-y-1">
                      {Object.entries(errors).map(([field, error]) => (
                        error && (
                          <li key={field} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-red-500 rounded-full flex-shrink-0"></span>
                            <span>{error}</span>
                          </li>
                        )
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
          
          <Button 
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white h-14 px-12 text-lg font-semibold shadow-lg"
          >
            Finalizar Compra
            <ArrowRight className="ml-2 size-5" />
          </Button>
          
          <Button className="bg-zinc-200 text-zinc-600 h-9 w-auto flex flex-row gap-2 items-center">
            Fale com um especialista
            <ArrowRight className="size-2 text-zinc-500" />
          </Button>
        </motion.div>

        {/* ===== FOOTER ===== */}
        <div id="footer" className="py-10 p-10">
          <div id="header-noteplanning" className="flex space-x-2">
            <Image
              src="/noteplanning-app-icon-logo.jpg"
              alt="icon-noteplanning"
              width={24}
              height={24}
              quality={100}
              className="rounded-[5px]"
            />
            <h4 className="tracking-tighter font-medium text-xl text-zinc-600">noteplanning</h4>
          </div>
        </div>
      </motion.div>
    </>
  )
}