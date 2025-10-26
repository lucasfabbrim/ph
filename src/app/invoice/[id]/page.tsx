"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Copy, Check, Clock, Loader2, CheckCircle2, ArrowLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { consultPixPayment } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { PaymentSuccessModal, PaymentValidatingModal } from "@/components/modals/payment-success-modal"
import { fadeInUp, scaleIn, fadeIn } from "@/lib/animation-variants"
import { getProfile } from "@/config/profiles"
import { Profile } from "@/types/profile"

function InvoiceContent() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pixId = params.id as string

  const [pixData, setPixData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [checking, setChecking] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "paid" | "expired">("pending")
  const [validationCountdown, setValidationCountdown] = useState(0)
  const [showValidatingModal, setShowValidatingModal] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const profileId = searchParams.get("profile")
    if (profileId) {
      const profileData = getProfile(profileId)
      setProfile(profileData)
    } else {
      // Usar perfil padrão se não especificado
      const defaultProfile = getProfile("oordonhas")
      setProfile(defaultProfile)
    }
  }, [searchParams])

  useEffect(() => {
    const storedData = localStorage.getItem(`pix_${pixId}`)

    if (storedData) {
      const data = JSON.parse(storedData)
      setPixData(data)

      // Calculate time left
      const expirationTime = new Date(data.expirationDate).getTime()
      const now = Date.now()
      const diff = Math.max(0, Math.floor((expirationTime - now) / 1000))
      setTimeLeft(diff)
    } else {
      fetchPixData()
    }
    setLoading(false)
  }, [pixId])

  const fetchPixData = async () => {
    try {
      const response = await consultPixPayment(pixId)
      if (response.success && response.data) {
        const data = {
          id: response.data.id,
          qrCode: (response.data as any).pix_details?.qr_code || "",
          qrCodeBase64: (response.data as any).pix_details?.qr_code_base64 || "",
          value: Number.parseFloat(response.data.value) / 100,
          expirationDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        }
        setPixData(data)
        localStorage.setItem(`pix_${pixId}`, JSON.stringify(data))

        const expirationTime = new Date(data.expirationDate).getTime()
        const now = Date.now()
        const diff = Math.max(0, Math.floor((expirationTime - now) / 1000))
        setTimeLeft(diff)
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setPaymentStatus("expired")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    if (validationCountdown <= 0) return

    const timer = setInterval(() => {
      setValidationCountdown((prev) => Math.max(0, prev - 1))
    }, 1000)

    return () => clearInterval(timer)
  }, [validationCountdown])

  const handleValidatePayment = async () => {
    setShowValidatingModal(true)
    setChecking(true)

    try {
      const response = await consultPixPayment(pixId)
      setShowValidatingModal(false)
      setChecking(false)

      if (response.success && response.data.status === "paid") {
        setPaymentStatus("paid")
        setShowSuccessModal(true)
      } else {
        setValidationCountdown(30)
      }
    } catch (error) {
      setShowValidatingModal(false)
      setChecking(false)
      setValidationCountdown(30)
    }
  }

  const handleCopyCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRedirect = () => {
    window.location.href = "https://membros.essays.com.br"
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (loading) {
    return (
      <motion.div
        className="min-h-screen bg-white flex items-center justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div className="flex flex-col items-center gap-6" variants={fadeInUp}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="size-16 rounded-full border-4 border-green-200 border-t-green-600"
          />
          <p className="text-xl font-medium text-zinc-700">Preparando tudo para sua compra</p>
        </motion.div>
      </motion.div>
    )
  }

  if (!pixData) {
    return (
      <motion.div
        className="min-h-screen bg-white flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div variants={scaleIn} className="text-center max-w-md">
          <div className="size-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 mb-4">Pagamento não encontrado</h1>
          <p className="text-zinc-600 mb-8">Não foi possível encontrar as informações deste pagamento.</p>
          <Button
            onClick={() => router.push("/checkout")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 h-12"
          >
            Voltar ao Checkout
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  if (paymentStatus === "expired") {
    return (
      <motion.div
        className="min-h-screen bg-white flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div variants={scaleIn} className="text-center max-w-md">
          <div className="size-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="size-10 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 mb-4">Pagamento Expirado</h1>
          <p className="text-zinc-600 mb-8">
            O tempo para realizar o pagamento expirou. Por favor, faça um novo pedido.
          </p>
          <Button
            onClick={() => router.push("/checkout")}
            className="bg-green-500 hover:bg-green-600 text-white px-8 h-12"
          >
            Fazer Novo Pedido
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div className="min-h-screen bg-white" initial="hidden" animate="visible" variants={fadeIn}>
      <motion.div 
        className="py-4 px-4 sticky top-0 z-10 shadow-sm"
        style={{ backgroundColor: profile?.theme.primaryColor || "#FFD600" }}
        variants={fadeInUp}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push(`/?profile=${profile?.id || "oordonhas"}`)} 
            className="p-2 hover:bg-black/10 rounded-lg transition-colors"
          >
            <ArrowLeft className="size-6 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Image
              src={profile?.avatar || "/assets/rezende-profile.png"}
              alt={`${profile?.name || "Profile"} avatar`}
              width={32}
              height={32}
              quality={100}
              className="rounded-full"
            />
            <h1 className="text-xl font-semibold text-white">Instruções - {profile?.name || "Checkout"}</h1>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </motion.div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div className="text-center mb-8" variants={fadeInUp}>
          <div 
            className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-45"
            style={{ backgroundColor: profile?.theme.primaryColor || "#00DC82" }}
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

        <motion.div
          whileHover={{ scale: validationCountdown > 0 || checking || paymentStatus !== "pending" ? 1 : 1.02 }}
          whileTap={{ scale: validationCountdown > 0 || checking || paymentStatus !== "pending" ? 1 : 0.98 }}
        >
          <Button
            onClick={handleValidatePayment}
            disabled={validationCountdown > 0 || checking || paymentStatus !== "pending"}
            className="w-full text-white h-14 text-lg font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: profile?.theme.primaryColor || "#3B82F6",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = profile?.theme.secondaryColor || "#2563EB"
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = profile?.theme.primaryColor || "#3B82F6"
              }
            }}
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
      </div>

      <PaymentValidatingModal
        isOpen={showValidatingModal}
        onComplete={(status) => {
          setShowValidatingModal(false)
          if (status === "paid") {
            setPaymentStatus("paid")
            setShowSuccessModal(true)
          }
        }}
      />

      <PaymentSuccessModal isOpen={showSuccessModal} onRedirect={handleRedirect} />
    </motion.div>
  )
}

export default function InvoicePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  )
}
