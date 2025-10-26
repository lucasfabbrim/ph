"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { z } from "zod"

import { PRODUCTS } from "@/lib/products"
import { useForm } from "@/hooks/use-form"
import { CheckoutFormData, TrackingData } from "@/types/checkout"
import { validationSchema } from "@/lib/checkout-schemas"
import { formatPhone, formatCPFCNPJ } from "@/lib/formatters"
import { CheckoutHeader } from "@/components/checkout/checkout-header"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { OrderBump } from "@/components/checkout/order-bump"
import { ButtonSection } from "@/components/checkout/button-section"
import { CheckoutFooter } from "@/components/checkout/checkout-footer"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [orderBumpSelected, setOrderBumpSelected] = useState(false)
  const [trackingData, setTrackingData] = useState<TrackingData>({})
  
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const profile = searchParams.get('profile')
    const product = searchParams.get('product')
    
    const tracking = {
      profile: profile || 'default',
      product: product || 'np-001'
    }
    
    setTrackingData(tracking)
    
    localStorage.setItem('checkout_tracking', JSON.stringify(tracking))
  }, [searchParams])

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
  
  try {
    validationSchema.parse({ cpfCnpj: values.cpfCnpj })
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.cpfCnpj = error.issues[0]?.message || "CPF/CNPJ inválido"
    }
  }
  
  return errors
}

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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value)
    setValue("phone", formatted)
  }

  const handleDocumentChange = (value: string) => {
    const formatted = formatCPFCNPJ(value)
    setValue("cpfCnpj", formatted)
  }

  const onSubmit = async (data: CheckoutFormData) => {
    localStorage.setItem("checkoutData", JSON.stringify(data))
    setIsLoading(true)
    
    try {
      const { createPixPayment } = await import("@/lib/api")
      
      const selectedProduct = orderBumpSelected ? PRODUCTS.note_complete_bundle : PRODUCTS.note_private
      
      const pixPayload = {
        productId: selectedProduct.id,
        email: data.email,
        phone: data.phone.replace(/\D/g, ''),
        document: data.cpfCnpj.replace(/\D/g, '')
      }
      
      const pixResponse = await createPixPayment(pixPayload)
      
      if (pixResponse.success && pixResponse.data) {
        const pixData = {
          id: pixResponse.data.id,
          qrCode: pixResponse.data.qrCode,
          qrCodeBase64: pixResponse.data.qrCodeBase64,
          value: pixResponse.data.value,
          expirationDate: pixResponse.data.expirationDate,
          tracking: trackingData,
          product: selectedProduct,
          orderBump: orderBumpSelected
        }
        
        localStorage.setItem(`pix_${pixResponse.data.id}`, JSON.stringify(pixData))
        
        const invoiceUrl = `/invoice/${pixResponse.data.id}?profile=${trackingData.profile}&product=${selectedProduct.id}`
        router.push(invoiceUrl)
      } else {
        alert("Erro ao processar pagamento. Tente novamente.")
      }
    } catch (error) {
      alert("Erro ao processar pagamento. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

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
          <CheckoutHeader 
            totalPrice={totalPrice} 
            orderBumpSelected={orderBumpSelected} 
          />

          <CheckoutForm
            values={values}
            errors={errors}
            setValue={setValue}
            handlePhoneChange={handlePhoneChange}
            handleDocumentChange={handleDocumentChange}
          />
        </div>

        <OrderBump 
          orderBumpSelected={orderBumpSelected}
          setOrderBumpSelected={setOrderBumpSelected}
        />

        <ButtonSection 
          errors={errors}
          handleSubmit={handleSubmit}
        />

        <CheckoutFooter />
      </motion.div>
    </>
  )
}