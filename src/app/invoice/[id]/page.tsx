"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Copy, ChevronDown, CheckCircle2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/lib/products"
import { getProfile } from "@/config/profiles"

interface PixData {
  id: string
  qrCode: string
  qrCodeBase64: string
  value: number
  expirationDate: string
  trackingData: {
    profile: string
    product: string
  }
  formData: {
    fullName: string
    email: string
    phone: string
    additionalProducts: string[]
  }
}

export default function InvoiceTestPage({ params }: { params: Promise<{ id: string }> }) {
  const [pixData, setPixData] = useState<PixData | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [showGuide, setShowGuide] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isCopying, setIsCopying] = useState(false)
  const [pixId, setPixId] = useState<string | null>(null)
  
  const searchParams = useSearchParams()

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setPixId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    const storedPixData = localStorage.getItem('pix_data')
    if (storedPixData) {
      const data = JSON.parse(storedPixData)
      setPixData(data)
      
      const profileId = searchParams.get('profile') || 'lucasmendes'
      const profileData = getProfile(profileId)
      setProfile(profileData)
    }
  }, [searchParams])

  const handleCopyPixCode = async () => {
    if (!pixData) return
    
    setIsCopying(true)

    try {
      await navigator.clipboard.writeText(pixData.qrCode)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (error) {
      console.error("Failed to copy:", error)
    } finally {
      setIsCopying(false)
    }
  }

  if (!pixData || !profile) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  const productId = pixData.trackingData.product
  const isBundle = productId === 'bundle-001'
  const product = productId === 'np-001' ? PRODUCTS.note_private : PRODUCTS.note_finances
  const hasOrderBump = pixData.formData.additionalProducts.includes('bundle-001')
  const totalPrice = hasOrderBump ? PRODUCTS.note_complete_bundle.price : product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl px-4 py-8"
    >
      <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="border-b border-gray-200 bg-[#eff6ff] p-6"
        >
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white"
            >
              <Clock className="h-7 w-7 text-[#2563eb]" />
            </motion.div>
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-[#2563eb]"
              >
                Pedido recebido!
              </motion.h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-b border-gray-200 p-6"
        >
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Pague com Pix para concluir a compra.</h2>
          <p className="text-sm leading-relaxed text-gray-700">
            Assim que o pagamento for aprovado, você receberá informações sobre seu(s) produto(s) em{" "}
            <span className="font-semibold text-gray-900">{pixData.formData.email}</span>. Não se esqueça de verificar sua pasta
            de spam.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-b border-gray-200 p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 text-center"
          >
            <div className="mb-2 text-sm font-medium text-gray-700">Código Pix</div>
            <div className="text-3xl font-bold text-gray-900">
              {(pixData.value).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-lg border-2 border-gray-200 bg-white p-3">
              <div className="h-[280px] w-[280px] bg-white">
                <img
                  src={pixData.qrCodeBase64}
                  alt="QR Code PIX"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4"
          >
            <p className="break-all text-center font-mono text-xs leading-relaxed text-gray-800">{pixData.qrCode}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Button
              onClick={handleCopyPixCode}
              disabled={isCopying || copied}
              className="w-full rounded-lg bg-[#2563eb] py-6 text-base font-semibold text-white hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-90"
            >
              {copied ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Copiado!</span>
                </motion.div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Copy className="h-5 w-5" />
                  <span>Copiar código Pix</span>
                </div>
              )}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-b border-gray-200"
        >
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50"
          >
            <span className="text-sm font-medium text-gray-900">Guia passo a passo para pagamentos Pix</span>
            <motion.div animate={{ rotate: showGuide ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-5 w-5 text-gray-600" />
            </motion.div>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-b border-gray-200 p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Resumo do pedido</h2>
            <span className="text-sm text-gray-600">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>

          <div className="mb-6 flex gap-4">
            {isBundle ? (
              <div className="w-full space-y-4">
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#ffd93d]">
                    <img
                      src="/note-private.png"
                      alt="Note Private"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-sm font-medium leading-tight text-gray-900">
                      {PRODUCTS.note_private.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {(PRODUCTS.note_private.price / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#ffd93d]">
                    <img
                      src="/note-finances.png"
                      alt="Note Finances"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-sm font-medium leading-tight text-gray-900">
                      {PRODUCTS.note_finances.name}
                    </h3>
                    <p className="text-lg font-bold text-gray-900">
                      {(PRODUCTS.note_finances.price / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Subtotal</span>
                    <span>{((PRODUCTS.note_private.price + PRODUCTS.note_finances.price) / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600 mb-1">
                    <span>Desconto</span>
                    <span>-{(((PRODUCTS.note_private.price + PRODUCTS.note_finances.price) - PRODUCTS.note_complete_bundle.price) / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span>{(pixData.value).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-[#ffd93d]">
                  <img
                    src={productId === 'np-001' ? '/note-private.png' : '/note-finances.png'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-sm font-medium leading-tight text-gray-900">
                    {product.name}
                  </h3>
                  <p className="text-lg font-bold text-gray-900">
                    {(pixData.value).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Código da transação:</span> {pixData.id}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="p-6">
          <h3 className="mb-3 text-base font-semibold text-gray-900">Precisa de ajuda?</h3>
          <p className="mb-2 text-sm leading-relaxed text-gray-700">
            Se precisar de ajuda com o produto que comprou, entre em contato com o criador do produto.
          </p>
          <p className="text-sm leading-relaxed text-gray-700">
            Se estiver tendo problemas para acessar o produto, você pode visualizar suas compras em{" "}
            <a href="https://pushinpay.com.br" className="font-medium text-blue-600 hover:underline">
              pushinpay.com.br
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="border-t border-gray-200 bg-gray-50 p-6 text-center"
        >
          <p className="text-xs text-gray-600">
            PushinPay © 2025 - Todos os direitos reservados
            <br />
            {new Date().toISOString()}
          </p>
        </motion.div>
      </Card>
    </motion.div>
  )
}
