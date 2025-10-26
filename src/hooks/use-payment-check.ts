"use client"

import { useState, useEffect } from "react"
import { consultPixPayment } from "@/lib/api"

interface UsePaymentCheckProps {
  paymentId?: string | null
}

interface UsePaymentCheckReturn {
  isChecking: boolean
  isApproved: boolean
  error: string | null
}

export function usePaymentCheck({ paymentId }: UsePaymentCheckProps): UsePaymentCheckReturn {
  const [isChecking, setIsChecking] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!paymentId) return

      setIsChecking(true)
      setError(null)
      
      try {
        const response = await consultPixPayment(paymentId)
        
        if (response.success && response.data.status === "paid") {
          setIsApproved(true)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao verificar pagamento')
        console.error('Erro ao verificar status do pagamento:', err)
      }
      
      setIsChecking(false)
    }

    checkPaymentStatus()
  }, [paymentId])

  return {
    isChecking,
    isApproved,
    error
  }
}
