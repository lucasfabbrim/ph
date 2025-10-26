"use client"

import { useEffect, useState } from 'react'
import { useDynamicTitle } from "@/hooks/use-dynamic-title"

export function DynamicTitleProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  useDynamicTitle()
  
  if (!mounted) {
    return <>{children}</>
  }
  
  return <>{children}</>
}
