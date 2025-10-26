"use client"

import { useEffect, useState, Suspense } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { Clock } from "lucide-react"
import { motion } from "framer-motion"
import { consultPixPayment } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { PaymentSuccessModal, PaymentValidatingModal } from "@/components/modals/payment-success-modal"
import { fadeInUp, scaleIn, fadeIn } from "@/lib/animation-variants"
import { getProfile } from "@/config/profiles"
import { Profile } from "@/types/profile"
import { InvoiceHeader } from "@/components/invoice/invoice-header"
import { PaymentInfo } from "@/components/invoice/payment-info"
import { QRCodeSection } from "@/components/invoice/qr-code-section"
import { ValidationSection } from "@/components/invoice/validation-section"

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
  const [trackingData, setTrackingData] = useState<{
    profile?: string
    product?: string
  }>({})

  useEffect(() => {
    const profile = searchParams.get('profile')
    const product = searchParams.get('product')
    
    const tracking = {
      profile: profile || 'default',
      product: product || 'np-001'
    }
    
    setTrackingData(tracking)
    
    if (profile) {
      const profileData = getProfile(profile)
      setProfile(profileData)
    } else {
      const defaultProfile = getProfile("oordonhas")
      setProfile(defaultProfile)
    }
  }, [searchParams, pixId])

  useEffect(() => {
    const storedData = localStorage.getItem(`pix_${pixId}`)

    if (storedData) {
      const data = JSON.parse(storedData)
      setPixData(data)

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
      <InvoiceHeader profile={profile} />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <PaymentInfo 
          pixData={pixData} 
          timeLeft={timeLeft} 
          profile={profile} 
        />

        <QRCodeSection 
          pixData={pixData}
          copied={copied}
          handleCopyCode={handleCopyCode}
        />

        <ValidationSection
          checking={checking}
          paymentStatus={paymentStatus}
          validationCountdown={validationCountdown}
          handleValidatePayment={handleValidatePayment}
          profile={profile}
        />
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
