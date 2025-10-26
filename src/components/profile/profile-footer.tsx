"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { SquareMousePointer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Profile } from "@/types/profile"
import { fadeInUp } from "@/lib/profile-constants"

interface ProfileFooterProps {
  profile: Profile
  onLinkClick: (name: string) => void
}

export function ProfileFooter({ profile, onLinkClick }: ProfileFooterProps) {
  return (
    <motion.footer
      variants={fadeInUp}
      className="text-center text-blue-100 mt-8"
    >
      <p className="text-xs">Desenvolvido por Lucas Mendes</p>
      <Link
        href={profile.contactLink || "https://api.whatsapp.com/send?phone=5519998521915&text=Olá,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."}
        passHref
        onClick={() => onLinkClick("Contato WhatsApp")}
      >
        <Button
          variant="link"
          className="text-blue-600 hover:text-white text-xs -mt-10 font-normal"
        >
          Entre em contato 
          <SquareMousePointer />
        </Button>
      </Link>
    </motion.footer>
  )
}
