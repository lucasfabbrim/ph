"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Timer } from "lucide-react"

export function PixPaymentInfo() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="border-t border-gray-200 pt-5"
    >
      <div className="mb-4">
        <div className="mt-2 flex flex-col items-center gap-3 rounded-[8px] border border-green-300 p-4 shadow-sm max-w-28 h-24">
          <div className="flex h-8 w-8 items-center justify-center rounded-full ">
            <svg className="h-5 w-5 text-green-600" viewBox="0 0 48 48" fill="currentColor">
              <path fill="#4db6ac" d="M11.9,12h-0.68l8.04-8.04c2.62-2.61,6.86-2.61,9.48,0L36.78,12H36.1c-1.6,0-3.11,0.62-4.24,1.76	l-6.8,6.77c-0.59,0.59-1.53,0.59-2.12,0l-6.8-6.77C15.01,12.62,13.5,12,11.9,12z"/>
              <path fill="#4db6ac" d="M36.1,36h0.68l-8.04,8.04c-2.62,2.61-6.86,2.61-9.48,0L11.22,36h0.68c1.6,0,3.11-0.62,4.24-1.76	l6.8-6.77c0.59-0.59,1.53-0.59,2.12,0l6.8,6.77C32.99,35.38,34.5,36,36.1,36z"/>
              <path fill="#4db6ac" d="M44.04,28.74L38.78,34H36.1c-1.07,0-2.07-0.42-2.83-1.17l-6.8-6.78c-1.36-1.36-3.58-1.36-4.94,0	l-6.8,6.78C13.97,33.58,12.97,34,11.9,34H9.22l-5.26-5.26c-2.61-2.62-2.61-6.86,0-9.48L9.22,14h2.68c1.07,0,2.07,0.42,2.83,1.17	l6.8,6.78c0.68,0.68,1.58,1.02,2.47,1.02s1.79-0.34,2.47-1.02l6.8-6.78C34.03,14.42,35.03,14,36.1,14h2.68l5.26,5.26	C46.65,21.88,46.65,26.12,44.04,28.74z"/>
            </svg>
          </div>
          <div>
            <span className="text-sm font-bold text-green-800 font-inter">Pix</span>
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200 mt-2" />
        <Card className="shadow-none mt-2 p-5 rounded-[5px]">
          <div className="flex flex-col gap-4">
            <Card className="flex flex-col p-5 shadow-none gap-2">
              <Timer className="size-5 text-green-600" />
              <h1 className="text-base font-bold text-gray-900 font-inter">Aprovação Imediata</h1>
              <p className="text-sm text-gray-600 font-inter">Seu pagamento será aprovado instantaneamente.</p>
            </Card>
            <Card className="flex flex-col p-5 shadow-none gap-2">
              <Timer className="size-5 text-green-600" />
              <h1 className="text-base font-bold text-gray-900 font-inter">Segurança</h1>
              <p className="text-sm text-gray-600 font-inter">Seu pagamento será aprovado instantaneamente.</p>
            </Card>
            <Card className="flex flex-col p-5 shadow-none gap-2">
              <Timer className="size-5 text-green-600" />
              <h1 className="text-base font-bold text-gray-900 font-inter">Aprovação Imediata</h1>
              <p className="text-sm text-gray-600 font-inter">Seu pagamento será aprovado instantaneamente.</p>
            </Card>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
