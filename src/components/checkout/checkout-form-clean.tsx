"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CircleAlertIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { PRODUCTS } from "@/lib/products"
import { CheckoutFormData } from "@/types/checkout"
import { formatPhone } from "@/lib/formatters"
import { useCheckoutForm } from "@/hooks/use-checkout-form"
import { usePaymentCheck } from "@/hooks/use-payment-check"
import { FullScreenLoading } from "@/components/checkout/loading-spinner"
import { PaymentSuccess } from "@/components/checkout/payment-success"
import { OrderBump } from "@/components/checkout/order-bump"
import { OrderDetails } from "@/components/checkout/order-details"
import { PixPaymentInfo } from "@/components/checkout/pix-payment-info"

interface CheckoutFormProps {
  onPixGenerated: (data: CheckoutFormData & { additionalProducts: string[] }) => void
}

export default function CheckoutForm({ onPixGenerated }: CheckoutFormProps) {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product') || 'np-001'
  const paymentId = searchParams.get('payment_id')

  const product = productId === 'np-001' ? PRODUCTS.note_private : PRODUCTS.note_finances
  const orderBumpProduct = productId === 'np-001' ? PRODUCTS.note_finances : PRODUCTS.note_private

  const {
    register,
    handleSubmit,
    errors,
    touchedFields,
    setValue,
    additionalProducts,
    isSubmitting,
    setIsSubmitting,
    orderBumpSelected,
    toggleOrderBump,
    isButtonDisabled,
    watchedValues
  } = useCheckoutForm()

  const totalPrice = orderBumpSelected ? PRODUCTS.note_complete_bundle.price : product.price

  const { isChecking, isApproved } = usePaymentCheck({ paymentId })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    const sanitizedData = {
      ...data,
      fullName: data.fullName.trim(),
      email: data.email.toLowerCase().trim(),
      document: "52804013820",
      additionalProducts: additionalProducts
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

  // Loading enquanto verifica status do pagamento
  if (isChecking && paymentId) {
    return <FullScreenLoading />
  }

  // Tela de sucesso quando pagamento aprovado
  if (isApproved) {
    return <PaymentSuccess paymentId={paymentId || undefined} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4 relative"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-white/80"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 border-4 border-gray-200 border-t-gray-400 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`transition-all ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
          {/* Header do Produto */}
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
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="space-y-5">
              {/* Email */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <Label htmlFor="email" className="text-xs font-normal text-gray-700">
                  Seu endereço de email
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Digite o email para receber sua compra"
                    {...register('email')}
                    className={`mt-1.5 transition-all placeholder:text-gray-500 placeholder:text-xs rounded-[8px] text-sm ${
                      errors.email ? "border-red-500 pr-10 focus-visible:ring-red-300" : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                <AnimatePresence>
                  {errors.email && touchedFields.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 flex items-center gap-2 text-xs font-medium text-red-600"
                    >
                      <CircleAlertIcon className="h-3.5 w-3.5" /> {errors.email?.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirmar Email */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                <Label htmlFor="confirmEmail" className="text-xs font-normal text-gray-700">
                  Confirme seu endereço de email
                </Label>
                <div className="relative">
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder="Digite novamente o email para confirmar"
                    {...register('confirmEmail')}
                    className={`mt-1.5 transition-all placeholder:text-gray-500 placeholder:text-xs rounded-[8px] text-sm ${
                      errors.confirmEmail ? "border-red-500 pr-10 focus-visible:ring-red-500" : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                <AnimatePresence>
                  {errors.confirmEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 flex items-center gap-2 text-xs font-medium text-red-600"
                    >
                      <CircleAlertIcon className="h-3.5 w-3.5" /> {errors.confirmEmail?.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Nome Completo */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <Label htmlFor="fullName" className="text-sm font-normal text-gray-700">
                  Seu nome completo
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    placeholder="Digite seu nome completo"
                    {...register('fullName')}
                    className={`mt-1.5 transition-all placeholder:text-gray-500 placeholder:text-xs rounded-[8px] text-sm ${
                      errors.fullName ? "border-red-500 pr-10 focus-visible:ring-red-500" : "border-gray-300"
                    }`}
                    disabled={isSubmitting}
                  />
                </div>
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 flex items-center gap-2 text-xs font-medium text-red-600"
                    >
                      <CircleAlertIcon className="h-3.5 w-3.5" />{errors.fullName?.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Telefone */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <Label htmlFor="phone" className="text-sm font-normal text-gray-700">
                  Número de telefone
                </Label>
                <div className="mt-1.5 flex gap-2">
                  <div className="flex h-9 w-20 items-center justify-start rounded-md border border-gray-300 bg-gray-50 px-3 text-sm">
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
                      className={`transition-all placeholder:text-gray-500 placeholder:text-xs ${
                        errors.phone
                          ? "border-red-500 pr-10 focus-visible:ring-red-500"
                          : "border-gray-300"
                      }`}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <AnimatePresence>
                  {errors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1.5 flex items-center gap-2 text-xs font-medium text-red-600"
                    >
                      <CircleAlertIcon className="h-3.5 w-3.5" /> {errors.phone?.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Informações PIX */}
              <PixPaymentInfo />
            </div>

            {/* Order Bump */}
            <OrderBump
              product={product}
              orderBumpProduct={orderBumpProduct}
              isSelected={orderBumpSelected}
              onToggle={toggleOrderBump}
              isDisabled={isSubmitting}
            />

            {/* Detalhes do Pedido */}
            <OrderDetails
              product={product}
              orderBumpProduct={orderBumpProduct}
              isOrderBumpSelected={orderBumpSelected}
              totalPrice={totalPrice}
            />

            {/* Botão de Submit */}
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

            {/* Footer */}
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
    </motion.div>
  )
}
