"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BadgeCheck, CircleCheck, ClipboardCheck, ShoppingCart, SquareMousePointer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Profile from "@/assets/header.png";
import Whey from "@/assets/whey.png";
import Creatina from "@/assets/creatina.png";
import Arginina from "@/assets/arginine.png";
import Glutamina from "@/assets/glutanima.png";
import BCAA from "@/assets/bcaa.png";
import InstagramCarouselComponent from "@/components/instagram";
import { useToast } from "@/hooks/use-toast";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Copiando from "@/assets/icons/copiando.svg";
import Cupom from "@/assets/icons/cupom.svg";
import NotePerfil from "@/assets/note-perfil.png";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/config/profiles";

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

    // Atualizar o título da página
    if (profile) {
      document.title = `${profile.name} (${profile.username})`;
    }
  }, [profileId, profile, router, toast]);

  const handleCopy = (link: string, productName: string) => {
    if (!isClient) return;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          console.log("Link copiado:", productName);

          toast({
            className: "bg-zinc-900 rounded-[10px] text-white border-none",
            title: "Perfeito! Link copiado.",
            description: "Agora você pode colar o link onde desejar.",
            duration: 1000,
          });
        })
        .catch((err) => {
          console.error("Erro ao copiar o link:", err);
        });
    }
  };

  const handleLinkClick = (productName: string) => {
    console.log('Link clicked:', productName);
  };

  if (!profile) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="bg-black min-h-screen text-white"
    >
      <main className="container w-full mx-auto md:max-w-lg md:items-center">
        <motion.section
          variants={staggerChildren}
          className="space-y-6 pt-[0.5px] lg:pt-3"
        >
          <motion.div variants={fadeInUp} className="relative overflow-hidden">
            <Image
              src={Profile}
              alt={`${profile.name} profile`}
              width={1200}
              height={600}
              className="w-full h-full lg:h-[550px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <motion.div
              variants={fadeInUp}
              className="absolute bottom-6 flex justify-center items-center w-full text-center"
            >
              <div>
                <h1 className="text-3xl font-bold justify-center">
                  {profile.name}
                </h1>
                <p className="text-zinc-400 text-sm -mt-0.5 flex items-center justify-center">
                  {profile.username}{" "}
                  <BadgeCheck
                    className="fill-[#009CEF] text-black ml-0.5 mt-0.5"
                    size={15}
                  />
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex justify-center gap-3 pb-10"
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
                  className="flex items-center justify-center rounded-xl text-white transition-colors"
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
            className="space-y-5 mx-8 pb-10 border-b border-b-zinc-900 pt-4"
          >
            <h1 className="items-center text-center text-xl pb-2 font-semibold">
              {profile.sectionTitle || "Suplementação"}
            </h1>
            {profile.links.map((product, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Card className="bg-neutral-900/60 border-none rounded-[25px]">
                  <div className="w-full justify-between p-4 h-auto flex items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden">
                        <Image
                          src={product.icon || Whey}
                          alt={product.title}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-base text-white flex items-center gap-2">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-white font-normal flex items-center gap-1.5 ml-0.5 pt-.5">
                            <Cupom className="w-4 h-4 " /> {profile.couponCode || "PH"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mr-3">
                      <motion.button
                        onClick={() => handleCopy(product.url, product.title)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copiando className="w-5 h-5" />
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          href={product.url}
                          onClick={() => handleLinkClick(product.title)}
                        >
                          <ShoppingCart className="w-6 h-6 text-white fill-white" />
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