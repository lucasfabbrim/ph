"use client"

import { motion } from "framer-motion"
import { Loader2, CheckCircle2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fadeInUp } from "@/lib/animation-variants"

interface ValidationSectionProps {
  checking: boolean
  paymentStatus: "pending" | "paid" | "expired"
  validationCountdown: number
  handleValidatePayment: () => void
  profile: any
}

export function ValidationSection({ 
  checking, 
  paymentStatus, 
  validationCountdown, 
  handleValidatePayment, 
  profile 
}: ValidationSectionProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: validationCountdown > 0 || checking || paymentStatus !== "pending" ? 1 : 1.02 }}
        whileTap={{ scale: validationCountdown > 0 || checking || paymentStatus !== "pending" ? 1 : 0.98 }}
      >
        <Button
          onClick={handleValidatePayment}
          disabled={validationCountdown > 0 || checking || paymentStatus !== "pending"}
          className="w-full text-white h-14 text-lg font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600"
        >
          {checking ? (
            <>
              <Loader2 className="size-5 animate-spin mr-2" />
              Verificando pagamento...
            </>
          ) : paymentStatus === "paid" ? (
            <>
              <CheckCircle2 className="size-5 mr-2" />
              Pagamento Confirmado!
            </>
          ) : validationCountdown > 0 ? (
            <>
              <Clock className="size-5 mr-2" />
              Aguarde {formatTime(validationCountdown)} para validar novamente
            </>
          ) : (
            "Validar Pagamento"
          )}
        </Button>
      </motion.div>

      {validationCountdown > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-center"
        >
          <p className="text-sm text-blue-800">
            Aguarde <span className="font-semibold">{formatTime(validationCountdown)}</span> para validar novamente
          </p>
        </motion.div>
      )}

      <motion.div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200" variants={fadeInUp}>
        <div className="flex gap-3">
          <div className="size-6 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">i</span>
          </div>
          <p className="text-sm text-blue-900">Confirmaremos a data de entrega quando o pagamento for aprovado.</p>
        </div>
      </motion.div>

      <div className="text-center mt-8">
        <button className="text-zinc-600 hover:text-zinc-800 text-sm font-medium transition-colors">
          Precisa de ajuda? Fale conosco
        </button>
      </div>
    </>
  )
}
