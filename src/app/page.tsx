"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Cupom from "@/assets/icons/cupom.svg";
import { getProfile } from "@/config/profiles";
import { PRODUCTS } from "@/lib/products";
import { useDynamicTitle } from "@/hooks/use-dynamic-title";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useDynamicTitle();
  
  const profileId = searchParams.get("profile");
  const profile = profileId ? getProfile(profileId) : null;

  useEffect(() => {
    if (!profileId) {
      router.push("/?profile=lucasmendes");
      return;
    }

    if (!profile) {
      router.push("/?profile=lucasmendes");
      return;
    }

    if (profile) {
      document.title = `${profile.name} (${profile.username})`;
    }
  }, [profileId, profile, router]);


  const handleLinkClick = (productName: string) => {
  };

  const getProductPrice = (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const productId = urlParams.get('product');
    
    if (productId) {
      const productKeyMap: Record<string, string> = {
        'np-001': 'note_private',
        'nf-001': 'note_finances'
      };
      
      const productKey = productKeyMap[productId];
      if (productKey && PRODUCTS[productKey]) {
        return PRODUCTS[productKey].price;
      }
    }
    
    return 0;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const getProductImage = (productTitle: string, fallbackIcon?: string) => {
    if (productTitle.includes('Note Private')) {
      return '/note-private.png';
    }
    if (productTitle.includes('Note Finances')) {
      return '/note-finances.png';
    }
    
    return fallbackIcon || '/note-private.png';
  };

  if (!profile) {
    return (
      <div className="bg-zinc-100 min-h-screen flex items-center justify-center">
        <div className="text-black text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#f4f4f5"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#e4e4e7"
            fillOpacity="0.4"
            d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
        <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#d4d4d8"
            fillOpacity="0.5"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,117.3C672,107,768,117,864,133.3C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4 py-8 max-w-2xl mx-auto">
        {/* Profile section */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-white/20">
            <Image
              src="/lucas-perfil.png"
              alt={`${profile.name} profile`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              quality={100}
              priority
              unoptimized
            />
          </div>
          <h1 className="text-black text-2xl font-semibold mb-2">{profile.name}</h1>
          <p className="text-zinc-600 text-sm mb-4">{profile.bio}</p>
          
          <div className="flex justify-center gap-3">
            {profile.socialLinks.map((social, index) => {
              const socialIconMap: Record<string, any> = {
                'TikTok': TikTokIcon,
                'YouTube': YoutubeIcon,
                'Spotify': SpotifyIcon,
              };
              
              const IconComponent = socialIconMap[social.name];
              
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  onClick={() => handleLinkClick(social.name)}
                  className="text-black hover:text-zinc-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {IconComponent && <IconComponent />}
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="w-full space-y-4 mb-8">
          <h2 className="text-black text-xl font-semibold text-center mb-6 font-inter">
            {profile.sectionTitle || "Templates"}
          </h2>
          {profile.links.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={product.url}
                onClick={() => handleLinkClick(product.title)}
                className="flex items-center gap-4 bg-zinc-100 hover:bg-zinc-200 transition-colors rounded-xl p-4 w-full group"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-white">
                  <Image
                    src={getProductImage(product.title, product.icon)}
                    alt={product.title}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover rounded-[10px]"
                    quality={100}
                    unoptimized
                  />
                </div>
                <div className="flex-1 text-left">
                  <span className="text-black text-sm font-medium leading-tight block">{product.title}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-zinc-500 text-xs">{formatPrice(getProductPrice(product.url))}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-zinc-400 group-hover:text-zinc-600 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 text-center text-zinc-500 text-sm">
          <p>Desenvolvido por Lucas Mendes</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="bg-zinc-100 min-h-screen flex items-center justify-center">
        <div className="text-black text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black mx-auto"></div>
          <p className="mt-4">Carregando...</p>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}