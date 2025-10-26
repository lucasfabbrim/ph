"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { fadeInUp, scaleIn } from "@/lib/animation-variants"

interface PaymentInfoProps {
  pixData: {
    value: number
    expirationDate: string
  }
  timeLeft: number
  profile: any
}

export function PaymentInfo({ pixData, timeLeft, profile }: PaymentInfoProps) {
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
      <motion.div className="text-center mb-8" variants={fadeInUp}>
        <div 
          className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-45 bg-green-500"
        >
          <div className="-rotate-45 text-white text-2xl font-bold">PIX</div>
        </div>
        <h2 className="text-2xl font-bold text-zinc-800 mb-2">Pague via Pix para garantir sua compra</h2>
        <p className="text-sm text-zinc-500">Após o pagamento, clique em "Validar Pagamento" para confirmar</p>
      </motion.div>

      <motion.div className="bg-zinc-50 rounded-2xl p-6 mb-6" variants={scaleIn}>
        <h3 className="text-lg font-semibold text-zinc-800 mb-4">Use um código para pagar</h3>
        <ol className="space-y-3 text-zinc-700">
          <li className="flex gap-3">
            <span className="font-semibold">1.</span>
            <span>Acesse seu Internet Banking ou app de pagamentos.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold">2.</span>
            <span>Escolha pagar via Pix.</span>
          </li>
          <li className="flex gap-3">
            <span className="font-semibold">3.</span>
            <span>Copie e cole o código do pagamento ou escaneie o QR.</span>
          </li>
        </ol>

        <div className="flex items-center gap-2 mt-4 text-sm text-zinc-600">
          <Clock className="size-4" />
          <span>Pague e será creditado na hora</span>
        </div>
      </motion.div>

      <motion.div
        className="flex items-center justify-center gap-2 mb-6 p-4 bg-orange-50 rounded-xl border border-orange-200"
        animate={{
          scale: timeLeft <= 60 ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 1,
          repeat: timeLeft <= 60 ? Number.POSITIVE_INFINITY : 0,
        }}
      >
        <Clock className="size-5 text-orange-600" />
        <span className="text-lg font-semibold text-orange-600">Expira em: {formatTime(timeLeft)}</span>
      </motion.div>

      <motion.div className="text-center mb-6 p-6 bg-green-50 rounded-2xl border border-green-200" variants={scaleIn}>
        <p className="text-sm text-zinc-600 mb-1">Valor a pagar</p>
        <p className="text-4xl font-bold text-green-600">R$ {pixData.value?.toFixed(2) || "0.00"}</p>
      </motion.div>
    </>
  )
}
