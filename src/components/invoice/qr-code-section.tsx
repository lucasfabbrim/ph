"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Copy, Check, Loader2 } from "lucide-react"
import { fadeInUp, scaleIn } from "@/lib/animation-variants"

interface QRCodeSectionProps {
  pixData: {
    qrCode: string
    qrCodeBase64?: string
  }
  copied: boolean
  handleCopyCode: () => void
}

export function QRCodeSection({ pixData, copied, handleCopyCode }: QRCodeSectionProps) {
  return (
    <>
      <motion.div className="mb-6" variants={fadeInUp}>
        <div className="bg-white border-2 border-zinc-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-zinc-700">Código PIX</span>
            <motion.button
              onClick={handleCopyCode}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="copied"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="size-4" />
                    <span>Copiado</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Copy className="size-4" />
                    <span>Copiar</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="bg-zinc-50 rounded-lg p-3 break-all text-xs font-mono text-zinc-600">{pixData.qrCode}</div>
        </div>
      </motion.div>

      <motion.div className="hidden md:flex flex-col items-center mb-6" variants={scaleIn}>
        <div className="bg-white p-6 rounded-2xl border-2 border-zinc-200 shadow-sm">
          {pixData.qrCodeBase64 ? (
            <motion.img
              src={pixData.qrCodeBase64}
              alt="QR Code PIX"
              className="w-64 h-64"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center bg-zinc-100 rounded-lg">
              <Loader2 className="size-12 animate-spin text-zinc-400" />
            </div>
          )}
        </div>
        <p className="text-sm text-zinc-600 mt-4 text-center">Escaneie o QR Code com o app do seu banco</p>
      </motion.div>
    </>
  )
}
