"use client"

import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp, scaleIn } from "@/lib/animation-variants"

interface PaymentSuccessModalProps {
  isOpen: boolean
  onRedirect: () => void
}

interface PaymentValidatingModalProps {
  isOpen: boolean
  onComplete: (status: "paid" | "pending") => void
}

export function PaymentSuccessModal({ isOpen, onRedirect }: PaymentSuccessModalProps) {
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
            className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={fadeInUp}
          >
            <CheckCircle2 className="size-10 text-green-600" />
          </motion.div>

          <motion.h2 className="text-3xl font-bold text-zinc-800 mb-4" variants={fadeInUp}>
            Pagamento Confirmado!
          </motion.h2>

          <motion.p className="text-zinc-600 mb-8" variants={fadeInUp}>
            Seu pagamento foi processado com sucesso. Você receberá um email de confirmação em breve.
          </motion.p>

          <motion.div variants={fadeInUp}>
            <Button
              onClick={onRedirect}
              className="bg-green-500 hover:bg-green-600 text-white px-8 h-12 text-lg font-semibold"
            >
              Acessar Conteúdo
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export function PaymentValidatingModal({ isOpen, onComplete }: PaymentValidatingModalProps) {
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
            className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
            variants={fadeInUp}
          >
            <CheckCircle2 className="size-8 text-blue-600 animate-pulse" />
          </motion.div>

          <motion.h2 className="text-2xl font-bold text-zinc-800 mb-4" variants={fadeInUp}>
            Validando Pagamento
          </motion.h2>

          <motion.p className="text-zinc-600 mb-6" variants={fadeInUp}>
            Aguarde enquanto verificamos seu pagamento...
          </motion.p>

          <motion.div className="w-full bg-gray-200 rounded-full h-2 mb-4" variants={fadeInUp}>
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
