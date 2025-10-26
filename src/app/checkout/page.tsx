"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import CheckoutForm from "@/components/checkout-components/checkout-form"
import { createPixPayment } from "@/lib/api"
import { CheckoutFormData } from "@/types/checkout"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const profile = searchParams.get('profile')
    const product = searchParams.get('product')
    
    const tracking = {
      profile: profile || 'lucasmendes',
      product: product || 'np-001'
    }
    
    localStorage.setItem('checkout_tracking', JSON.stringify(tracking))
  }, [searchParams])

  const handlePixGenerated = async (data: CheckoutFormData & { additionalProducts: string[] }) => {
    setIsLoading(true)
    
    try {
      const originalProductId = searchParams.get('product') || 'np-001'
      const profile = searchParams.get('profile') || 'lucasmendes'
      
      const productId = data.additionalProducts.includes('bundle-001') ? 'bundle-001' : originalProductId
      
      const pixPayload = {
        productId: productId,
        email: data.email,
        phone: data.phone,
        document: "52804013820"
      }

      const pixResponse = await createPixPayment(pixPayload)
      
      const pixData = {
        ...pixResponse.data,
        trackingData: {
          profile,
          product: productId
        },
        formData: data
      }
      
      localStorage.setItem('pix_data', JSON.stringify(pixData))
      
      router.push(`/invoice/${pixResponse.data.id}?profile=${profile}&product=${productId}`)
    } catch (error) {
      console.error('Erro ao gerar PIX:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-8">
      <CheckoutForm onPixGenerated={handlePixGenerated} />
    </div>
  )
}