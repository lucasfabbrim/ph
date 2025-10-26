"use client"

import { motion } from "framer-motion"
import YoutubeIcon from "@/assets/icons/youtube.svg"
import TikTokIcon from "@/assets/icons/titkok.svg"
import SpotifyIcon from "@/assets/icons/spotify.svg"
import { SocialLink } from "@/types/profile"
import { fadeInUp } from "@/lib/profile-constants"

interface SocialLinksProps {
  socialLinks: SocialLink[]
  onLinkClick: (name: string) => void
}

export function SocialLinks({ socialLinks, onLinkClick }: SocialLinksProps) {
  const socialIconMap: Record<string, any> = {
    'TikTok': TikTokIcon,
    'YouTube': YoutubeIcon,
    'Spotify': SpotifyIcon,
  }

  return (
    <motion.div
      variants={fadeInUp}
      className="flex justify-center gap-3 pb-6"
    >
      {socialLinks.map((social, index) => {
        const IconComponent = socialIconMap[social.name]
        
        return (
          <motion.a
            key={index}
            href={social.url}
            onClick={() => onLinkClick(social.name)}
            className="flex items-center justify-center rounded-xl text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {IconComponent && <IconComponent />}
          </motion.a>
        )
      })}
    </motion.div>
  )
}
