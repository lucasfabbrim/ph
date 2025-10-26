"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { PRODUCTS } from "@/lib/products"
import { CheckoutFormData } from "@/types/checkout"
import { formatPhone } from "@/lib/formatters"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface CheckoutFormProps {
  onPixGenerated: (data: CheckoutFormData & { additionalProducts: string[] }) => void
}

export default function CheckoutForm({ onPixGenerated }: CheckoutFormProps) {
  const [showCoupon, setShowCoupon] = useState(false)
  const [additionalProducts, setAdditionalProducts] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderBumpSelected, setOrderBumpSelected] = useState(false)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const productId = searchParams.get('product') || 'np-001'
  const profile = searchParams.get('profile') || 'lucasmendes'
  
  const product = productId === 'np-001' ? PRODUCTS.note_private : PRODUCTS.note_finances
  const orderBumpProduct = productId === 'np-001' ? PRODUCTS.note_finances : PRODUCTS.note_private
  const totalPrice = orderBumpSelected ? PRODUCTS.note_complete_bundle.price : product.price

  const checkoutSchema = z.object({
    email: z.string().email('E-mail inválido'),
    confirmEmail: z.string().email('E-mail inválido'),
    fullName: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  }).refine((data) => data.email === data.confirmEmail, {
    message: "Os e-mails não coincidem",
    path: ["confirmEmail"],
  })

  const { register, handleSubmit, formState: { errors, touchedFields }, watch, setValue } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      email: '',
      confirmEmail: '',
      fullName: '',
      phone: ''
    }
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const sanitizedData = {
      ...data,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      document: "52804013820",
      additionalProducts: orderBumpSelected ? ['bundle-001'] : []
    }

    onPixGenerated(sanitizedData)
    setIsSubmitting(false)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setValue('phone', formatted)
  }

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  const toggleOrderBump = (checked: boolean) => {
    setOrderBumpSelected(checked)
  }

  const watchedValues = watch()
  const isButtonDisabled = Object.keys(errors).length > 0 || isSubmitting || !watchedValues.fullName || !watchedValues.email || !watchedValues.confirmEmail || !watchedValues.phone

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4"
    >
      <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-b border-gray-200 p-6"
        >
          <div className="flex gap-4">
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[#ffd93d]">
              <img
                src={productId === 'np-001' ? '/note-private.png' : '/note-finances.png'}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-base font-semibold leading-tight text-gray-900">
                {product.name}
              </h1>
              <p className="mb-2 text-sm text-gray-600">{product.description}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                (+ impostos aplicáveis.{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Clique aqui
                </button>{" "}
                para mais informações)
              </p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Label htmlFor="email" className="text-sm font-normal text-gray-700">
                Seu endereço de email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite o email para receber sua compra"
                  {...register('email')}
                  className={`mt-1.5 transition-all ${
                    errors.email ? "border-red-500 bg-red-50 pr-10 focus-visible:ring-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.email && touchedFields.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    {errors.email?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <Label htmlFor="confirmEmail" className="text-sm font-normal text-gray-700">
                Confirme seu endereço de email
              </Label>
              <div className="relative">
                <Input
                  id="confirmEmail"
                  type="email"
                  placeholder="Digite novamente o email para confirmar"
                  {...register('confirmEmail')}
                  className={`mt-1.5 transition-all ${
                    errors.confirmEmail ? "border-red-500 bg-red-50 pr-10 focus-visible:ring-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.confirmEmail && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.confirmEmail && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    {errors.confirmEmail?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Label htmlFor="fullName" className="text-sm font-normal text-gray-700">
                Seu nome completo
              </Label>
              <div className="relative">
                <Input
                  id="fullName"
                  placeholder="Digite seu nome completo"
                  {...register('fullName')}
                  className={`mt-1.5 transition-all ${
                    errors.fullName ? "border-red-500 bg-red-50 pr-10 focus-visible:ring-red-500" : "border-gray-300"
                  }`}
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </motion.div>
                )}
              </div>
              <AnimatePresence>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    {errors.fullName?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Label htmlFor="phone" className="text-sm font-normal text-gray-700">
                Número de telefone
              </Label>
              <div className="mt-1.5 flex gap-2">
                <div className="flex h-10 w-24 items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-3 text-sm">
                  🇧🇷 +55
                </div>
                <div className="relative flex-1">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder=""
                    {...register('phone', {
                      onChange: handlePhoneChange
                    })}
                    className={`transition-all ${
                      errors.phone
                        ? "border-red-500 bg-red-50 pr-10 focus-visible:ring-red-500"
                        : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </motion.div>
                  )}
                </div>
              </div>
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-1.5 flex items-center gap-1 text-sm font-medium text-red-600"
                  >
                    {errors.phone?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>


            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="border-t border-gray-200 pt-5"
            >
              <div className="mb-4">
                <Label className="text-sm font-normal text-gray-700">Método de pagamento</Label>
                <div className="mt-2 flex items-center gap-3 rounded-md border border-green-200 bg-green-50 p-4 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" viewBox="0 0 48 48" fill="currentColor">
                      <path fill="#4db6ac" d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"/>
                      <path fill="#4db6ac" d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"/>
                      <path fill="#4db6ac" d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-green-800">PIX</span>
                    <p className="text-xs text-green-600">Pagamento instantâneo</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 border-t border-gray-200 pt-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Compre junto</h2>
            <div className="space-y-3">
              <motion.div
                whileHover={!isSubmitting ? { scale: 1.005 } : {}}
                onClick={() => !isSubmitting && toggleOrderBump(!orderBumpSelected)}
                className={`rounded-md border p-4 transition-all cursor-pointer ${
                  orderBumpSelected ? "border-green-400 bg-green-50" : "border-gray-200 bg-white"
                } ${isSubmitting ? "opacity-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-[#1e3a8a]">
                    <img
                      src={productId === 'np-001' ? '/note-finances.png' : '/note-private.png'}
                      alt={orderBumpProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-normal leading-tight text-gray-900">
                      {orderBumpProduct.name}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-gray-900">{formatPrice(orderBumpProduct.price)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Checkbox
                    id="order-bump"
                    checked={orderBumpSelected}
                    onCheckedChange={toggleOrderBump}
                    className="border-gray-400"
                    disabled={isSubmitting}
                  />
                  <Label htmlFor="order-bump" className="cursor-pointer text-sm font-normal text-gray-700">
                    Adicionar à compra
                  </Label>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-8 border-t border-gray-200 pt-6"
          >
            <h2 className="mb-4 text-base font-semibold text-gray-900">Detalhes do pedido</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-900">
                <span>{product.name}</span>
                <span className="font-medium">{formatPrice(product.price)}</span>
              </div>
              <AnimatePresence>
                {orderBumpSelected && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-sm text-gray-900"
                    >
                      <span>{orderBumpProduct.name}</span>
                      <span className="font-medium">{formatPrice(orderBumpProduct.price)}</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-sm text-gray-900"
                    >
                      <span>Subtotal</span>
                      <span className="font-medium">{formatPrice(product.price + orderBumpProduct.price)}</span>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between text-sm text-green-600"
                    >
                      <span>Desconto Bundle</span>
                      <span className="font-medium">-{formatPrice((product.price + orderBumpProduct.price) - PRODUCTS.note_complete_bundle.price)}</span>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >
            <Button
              type="submit"
              disabled={isButtonDisabled}
              className="w-full rounded-md bg-[#16a34a] py-6 text-base font-semibold text-white transition-all hover:bg-[#15803d] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60"
            >
              {isSubmitting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processando...</span>
                </motion.div>
              ) : (
                "Gerar PIX"
              )}
            </Button>
            {isButtonDisabled && !isSubmitting && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-center text-xs text-gray-500"
              >
                Preencha todos os campos corretamente para continuar
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="mt-6 space-y-3 text-center text-xs leading-relaxed text-gray-600"
          >
            <p>
              <button type="button" className="text-blue-600 hover:underline">
                Tem dúvidas sobre o produto? Entre em contato
              </button>
            </p>
            <p>
              <button type="button" className="text-blue-600 hover:underline">
                Não consegue concluir esta compra? Visite nossa Central de Ajuda
              </button>
            </p>
            <p>Se precisar enviar uma solicitação para nossa equipe de suporte, forneça o código abaixo:</p>
            <p className="font-mono text-xs text-gray-700">GKTID-A99376132Q1-17615003487J3-3255</p>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs leading-relaxed">
                Ao clicar em 'Gerar PIX' declaro que (i) entendo que a PushinPay está processando este pedido em nome de{" "}
                <span className="font-medium">{watchedValues.fullName || ''}</span> e não tem responsabilidade sobre o conteúdo e/ou
                controle sobre ele; (ii) concordo com os{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Termos de Uso
                </button>
                ,{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Política de Privacidade
                </button>{" "}
                e{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  outras políticas da empresa
                </button>{" "}
                e (iii) sou maior de idade ou autorizado e acompanhado por um responsável legal.
              </p>
            </div>
            <p className="pt-2">
              <button type="button" className="text-blue-600 hover:underline">
                Saiba mais sobre sua compra aqui
              </button>
              .
            </p>
            <div className="border-t border-gray-200 pt-4">
              <p>
                PushinPay © 2025 - Todos os direitos reservados
                <br />
                2025-10-26T13:07:50Z{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  REF
                </button>
              </p>
            </div>
          </motion.div>
        </form>
      </Card>
    </motion.div>
  )
}
