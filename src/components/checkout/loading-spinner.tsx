"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`border-4 border-gray-200 border-t-gray-400 rounded-full ${sizeClasses[size]} ${className}`}
    />
  )
}

export function FullScreenLoading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <LoadingSpinner size="md" />
    </div>
  )
}
