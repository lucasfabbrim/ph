"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Profile } from "@/types/profile"

interface InvoiceHeaderProps {
  profile: Profile | null
}

export function InvoiceHeader({ profile }: InvoiceHeaderProps) {
  const router = useRouter()

  return (
    <motion.div 
      className="py-4 px-4 sticky top-0 z-10 shadow-sm"
      style={{ backgroundColor: profile?.theme.primaryColor || "#FFD600" }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
  )
}
