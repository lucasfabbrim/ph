"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Profile } from "@/types/profile"
import { fadeInUp } from "@/lib/profile-constants"

interface ProfileHeaderProps {
  profile: Profile
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <motion.div variants={fadeInUp} className="flex flex-col items-center py-8">
      <motion.div
        variants={fadeInUp}
        className="relative mb-6"
      >
        <Image
          src="/lucas-perfil.png"
          alt={`${profile.name} profile`}
          width={120}
          height={120}
          className="w-30 h-30 rounded-full object-cover border-4 border-zinc-200"
          priority
        />
      </motion.div>
      
      <motion.div
        variants={fadeInUp}
        className="text-center"
      >
        <h1 className="text-3xl font-bold mb-2 text-black">
          {profile.name}
        </h1>
        <p className="text-gray-600 text-sm">
          {profile.bio}
        </p>
      </motion.div>
    </motion.div>
  )
}
