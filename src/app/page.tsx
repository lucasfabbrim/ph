"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BadgeCheck, ShoppingCart, SquareMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Cupom from "@/assets/icons/cupom.svg";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/config/profiles";
import { PRODUCTS } from "@/lib/products";
import { ProfileHeader } from "@/components/profile/profile-header";

const Whey = "/whey.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  
  const profileId = searchParams.get("profile");
  const profile = profileId ? getProfile(profileId) : null;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!profileId) {
      router.push("/?profile=oordonhas");
      return;
    }

    if (!profile) {
      toast({
        className: "bg-zinc-900 rounded-[10px] text-white border-none",
        title: "Perfil não encontrado",
        description: "Redirecionando para o perfil padrão...",
        duration: 2000,
      });
      setTimeout(() => {
        router.push("/?profile=oordonhas");
      }, 2000);
      return;
    }

    if (profile) {
      document.title = `${profile.name} (${profile.username})`;
    }
  }, [profileId, profile, router, toast]);


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
    const imageMap: Record<string, string> = {
      'Note Private': '/note-private.png',
      'Note Finances': '/note-finances.png',
    };
    
    return imageMap[productTitle] || fallbackIcon || Whey;
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
    <motion.div
      initial="initial"
      animate="animate"
      className="bg-zinc-100 min-h-screen text-black"
    >
      <main className="container w-full mx-auto md:max-w-lg md:items-center">
        <motion.section
          variants={staggerChildren}
          className="space-y-6 pt-[0.5px] lg:pt-3"
        >
          <ProfileHeader profile={profile} />

          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-3 pb-6"
          >
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
                  className="flex items-center justify-center rounded-xl text-black transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {IconComponent && <IconComponent />}
                </motion.a>
              );
            })}
          </motion.div>
          
          <motion.div
            variants={fadeInUp}
            className="space-y-5 mx-8 pb-10 border-b border-b-gray-300"
          >
            <h1 className="items-center text-center text-xl pb-2 font-semibold text-black">
              {profile.sectionTitle || "Templates"}
            </h1>
            {profile.links.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="bg-gray-100 border border-zinc-200 rounded-[25px]">
                  <div className="w-full justify-between p-6 h-auto flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden">
                        <Image
                          src={getProductImage(product.title, product.icon)}
                          alt={product.title}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-lg text-black flex items-center gap-2">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-lg text-black font-semibold flex items-center gap-1.5 ml-0.5 pt-.5">
                            <Cupom className="w-5 h-5" /> {formatPrice(getProductPrice(product.url))}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 mr-3">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          href={product.url}
                          onClick={() => handleLinkClick(product.title)}
                        >
                          <ShoppingCart className="w-7 h-7 text-black fill-black" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.footer
            variants={fadeInUp}
            className="text-center text-blue-100 mt-8"
          >
            <p className="text-xs">Desenvolvido por Lucas Mendes</p>
            <Link
              href={profile.contactLink || "https://api.whatsapp.com/send?phone=5519998521915&text=Olá,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."}
              passHref
              onClick={() => handleLinkClick("Contato WhatsApp")}
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
        </motion.section>
      </main>
    </motion.div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Carregando...</p>
        </div>
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
}