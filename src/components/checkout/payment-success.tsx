"use client"

import { motion } from "framer-motion"
import { CheckCircle, Mail, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface PaymentSuccessProps {
  paymentId?: string
}

export function PaymentSuccess({ paymentId }: PaymentSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4"
    >
      <Card className="overflow-hidden border border-green-200 bg-white shadow-sm">
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-4 text-2xl font-bold text-gray-900"
          >
            Pagamento Aprovado! 🎉
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 text-gray-600"
          >
            Seu pagamento foi processado com sucesso!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-lg bg-blue-50 p-6 mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Acesso ao Produto</h3>
            </div>
            <p className="text-blue-800">
              Você receberá um e-mail com seu login e senha de acesso em até <strong>30 minutos</strong>.
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-blue-700">
              <Clock className="h-4 w-4" />
              <span>Verifique sua caixa de entrada e spam</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 text-sm text-gray-600"
          >
            <p>Se você não receber o e-mail em 30 minutos, entre em contato conosco.</p>
            <p className="text-xs text-gray-500">
              ID da transação: {paymentId || 'N/A'}
            </p>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}
