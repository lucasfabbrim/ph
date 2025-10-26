"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Loader2, Clock } from "lucide-react"
import { fadeInUp, scaleIn } from "@/lib/animation-variants"

interface PaymentProcessingModalProps {
  isOpen: boolean
  onComplete: () => void
  isReady: boolean
}

export function PaymentProcessingModal({ isOpen, onComplete, isReady }: PaymentProcessingModalProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!isOpen) return

    const steps = [
      { delay: 1000, text: "Processando dados..." },
      { delay: 2000, text: "Gerando PIX..." },
      { delay: 3000, text: "Finalizando..." },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setStep(currentStep)
        currentStep++
      } else {
        clearInterval(interval)
        if (isReady) {
          onComplete()
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, isReady, onComplete])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          variants={scaleIn}
        >
          <motion.div
            className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={fadeInUp}
          >
            {isReady ? (
              <CheckCircle2 className="size-8 text-green-600" />
            ) : (
              <Loader2 className="size-8 text-green-600 animate-spin" />
            )}
          </motion.div>

          <motion.h2 className="text-2xl font-bold text-zinc-800 mb-4" variants={fadeInUp}>
            {isReady ? "Pagamento Gerado!" : "Processando Pagamento"}
          </motion.h2>

          <motion.p className="text-zinc-600 mb-6" variants={fadeInUp}>
            {isReady
              ? "Seu PIX foi gerado com sucesso. Redirecionando..."
              : "Aguarde enquanto processamos seu pagamento..."}
          </motion.p>

          {!isReady && (
            <motion.div className="space-y-2" variants={fadeInUp}>
              <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
                <Clock className="size-4" />
                <span>Isso pode levar alguns segundos</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
