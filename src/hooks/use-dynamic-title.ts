import { useLayoutEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getProfile } from '@/config/profiles'

export const useDynamicTitle = () => {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  
  useLayoutEffect(() => {
    setMounted(true)
  }, [])
  
  useLayoutEffect(() => {
    if (!mounted) return
    
    const profileId = searchParams.get('profile')
    
    if (profileId) {
      const profile = getProfile(profileId)
      if (profile) {
        document.title = `${profile.name} (${profile.username})`
        const metaTitle = document.querySelector('meta[property="og:title"]')
        if (metaTitle) {
          metaTitle.setAttribute('content', `${profile.name} (${profile.username})`)
        }
      } else {
        // Se o perfil não existir, usar lucasmendes como padrão
        const defaultProfile = getProfile('lucasmendes')
        if (defaultProfile) {
          document.title = `${defaultProfile.name} (${defaultProfile.username})`
          const metaTitle = document.querySelector('meta[property="og:title"]')
          if (metaTitle) {
            metaTitle.setAttribute('content', `${defaultProfile.name} (${defaultProfile.username})`)
          }
        }
      }
    } else {
      // Se não tiver parâmetro profile, usar lucasmendes como padrão
      const defaultProfile = getProfile('lucasmendes')
      if (defaultProfile) {
        document.title = `${defaultProfile.name} (${defaultProfile.username})`
        const metaTitle = document.querySelector('meta[property="og:title"]')
        if (metaTitle) {
          metaTitle.setAttribute('content', `${defaultProfile.name} (${defaultProfile.username})`)
        }
      }
    }
  }, [searchParams, mounted])
}
