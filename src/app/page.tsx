"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Crown,
  BadgeCheck,
  ShoppingCart,
  Files,
  Copy,
  ChevronRight,
  ChevronDown,
  InstagramIcon,
  Phone,
  ExternalLink,
} from "lucide-react";
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

export default function Home() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = (link: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => {
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
              alt="Phelipi Ordonhas profile"
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
                  Phelipi Ordonhas{" "}
                </h1>
                <p className="text-zinc-400 text-sm -mt-0.5 flex items-center justify-center">
                  @oordonhas{" "}
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
            {[
              {
                src: TikTokIcon,
                alt: "TikTok Icon",
                href: "https://www.tiktok.com/@ph.ordonhas?_t=8rJWoCqgYum&_r=1",
              },
              {
                src: YoutubeIcon,
                alt: "Instagram Icon",
                href: "https://www.youtube.com/@phelipiordonhas",
              },
              {
                src: SpotifyIcon,
                alt: "Spotify Icon",
                href: "https://open.spotify.com/playlist/4dUc4S9Afj0odPGEBgg693?si=avgxReqnSyquckcD5XUkXw&pi=u-T97xyrc6TEy8&nd=1&dlsi=002771b6ab0a4c52",
              },
            ].map((product, index) => (
              <motion.a
                key={index}
                href={product.href}
                className="flex items-center justify-center rounded-xl text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <product.src />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="space-y-3 border-b border-b-zinc-900 pb-12 mx-8 pt-6 border-t border-t-zinc-900"
          >
            <h1 className="items-center text-center text-xl pb-3 font-semibold pt-4 ">
              Organização
            </h1>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Card className="bg-neutral-900/60 border-none rounded-[25px]">
                <div className="w-full justify-between p-4 h-auto flex items-center">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
                      <Image
                        src={NotePerfil}
                        alt="Note Private"
                        className="object-contain"
                        fill
                      />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-base text-white">
                        Note Planning
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-white font-normal flex items-center gap-1.5 ml-0.5 pt-.5">
                          <Cupom className="w-4 h-4 " /> PH
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mr-3">
                    <Link href="https://www.instagram.com/noteplanning">
                      <InstagramIcon className="text-black fill-white" />
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="space-y-5 mx-8 pb-10 border-b border-b-zinc-900 pt-4"
          >
            <h1 className="items-center text-center text-xl pb-2 font-semibold">
              Suplementação
            </h1>
            {[
              {
                id: 1,
                name: "Creatina",
                src: Creatina,
                link: "https://www.gsuplementos.com.br/creatina-100g-creapure-growth-supplements-p985927",
              },
              {
                id: 2,
                name: "Whey",
                src: Whey,
                link: "https://www.gsuplementos.com.br/bebida-lactea-uht-de-proteinas-growth-supplements",
              },
              {
                id: 3,
                name: "Glutamina",
                src: Glutamina,
                link: "https://www.gsuplementos.com.br/l-glutamina-250g-growth-supplements-p985843",
              },
              {
                id: 4,
                name: "Arginina",
                src: Arginina,
                link: "https://www.gsuplementos.com.br/arginina-powder-250gr-growth-supplements",
              },
              {
                id: 5,
                name: "BCAA",
                src: BCAA,
                link: "https://www.gsuplementos.com.br/bcaa-1011-120-comprimidos-growth-supplements",
              },
            ].map((product, index) => (
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
                          src={product.src}
                          alt={product.name}
                          className="object-contain"
                          fill
                        />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-base text-white flex items-center gap-2">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-white font-normal flex items-center gap-1.5 ml-0.5 pt-.5">
                            <Cupom className="w-4 h-4 " /> PH
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mr-3">
                      <motion.button
                        onClick={() => handleCopy(product.link)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Copiando className="w-5 h-5" />
                      </motion.button>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link href={product.link}>
                          <ShoppingCart className="w-6 h-6 text-white fill-white" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeInUp} className="mx-8 ">
            <InstagramCarouselComponent />
          </motion.div>

          <motion.footer
            variants={fadeInUp}
            className="text-center text-gray-400 mt-8"
          >
            <p className="text-xs">Desenvolvido por Lucas Mendes</p>
            <Link
              href="https://api.whatsapp.com/send?phone=5519993356780&text=Olá,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."
              passHref
            >
              <Button
                variant="link"
                className="text-gray-400 hover:text-white text-xs -mt-10 font-normal"
              >
                Entre em contato
              </Button>
            </Link>
          </motion.footer>
        </motion.section>
      </main>
    </motion.div>
  );
}
