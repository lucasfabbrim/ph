"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
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
  Heart,
  MessageCircle,
  Bookmark,
  Send,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Import your assets
import Profile from "@/assets/header.png";
import Whey from "@/assets/whey.png";
import Creatina from "@/assets/creatina.png";
import Arginina from "@/assets/arginine.png";
import Glutamina from "@/assets/glutanima.png";
import BCAA from "@/assets/bcaa.png";
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Copiando from "@/assets/icons/copiando.svg";
import Cupom from "@/assets/icons/cupom.svg";
import NotePerfil from "@/assets/note-perfil.png";
import LucasProfile from "@/assets/lucas-perfil.png";
import RezendeProfile from "@/assets/rezende-profile.png";
import PHProfile from "@/assets/perfil-instagram.png";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";
import Photo3 from "@/assets/card-3.png";
import Photo4 from "@/assets/card-4.png";
import Photo5 from "@/assets/card-5.png";

const carouselImages = [Photo5, Photo, Photo2, Photo3, Photo4];

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

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = useCallback(
    (link: string) => {
      navigator.clipboard
        .writeText(link)
        .then(() => {
          toast({
            className: "bg-zinc-900 rounded-[10px] text-white border-none ",
            title: "Perfeito! Link copiado.",
            description: "Agora você pode colar o link onde desejar.",
            duration: 1000,
          });
        })
        .catch((err) => {
          console.error("Erro ao copiar o link:", err);
        });
    },
    [toast],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(true);
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isSwiping) return;
      touchEndX.current = e.touches[0].clientX;
      touchEndY.current = e.touches[0].clientY;
      const diffX = touchStartX.current - touchEndX.current;
      const diffY = Math.abs(touchStartY.current - touchEndY.current);

      if (Math.abs(diffX) > diffY) {
        e.preventDefault();
        if (
          (currentSlide === 0 && diffX < 0) ||
          (currentSlide === carouselImages.length - 1 && diffX > 0)
        ) {
          setSwipeOffset(diffX / 4);
        } else {
          setSwipeOffset(diffX);
        }
      }
    },
    [isSwiping, currentSlide],
  );

  const handleTouchEnd = useCallback(() => {
    setIsSwiping(false);
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < carouselImages.length - 1) {
        setCurrentSlide(currentSlide + 1);
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1);
      }
    }
    setSwipeOffset(0);
  }, [currentSlide]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("touchstart", handleTouchStart as any, {
        passive: false,
      });
      carousel.addEventListener("touchmove", handleTouchMove as any, {
        passive: false,
      });
      carousel.addEventListener("touchend", handleTouchEnd as any);

      return () => {
        carousel.removeEventListener("touchstart", handleTouchStart as any);
        carousel.removeEventListener("touchmove", handleTouchMove as any);
        carousel.removeEventListener("touchend", handleTouchEnd as any);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  if (!isClient) {
    return null;
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
            <FadeInWhenVisible>
              <div className="max-w-md mx-auto bg-black text-white border-b border-zinc-800 pb-4 -mt-5">
                <FadeInWhenVisible>
                  <div className="flex items-center p-4 border-zinc-600 border-b border-b-zinc-950">
                    <Avatar className="h-6 w-6 border border-zinc-600">
                      <AvatarImage src={PHProfile.src} alt="Profile picture" />
                    </Avatar>
                    <span className="ml-2 font-semibold text-sm">
                      oordonhas
                    </span>
                    <BadgeCheck
                      className="fill-[#009CEF] text-black ml-1"
                      size={16}
                    />
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                  <div
                    ref={carouselRef}
                    className="relative aspect-[3/4] bg-transparent overflow-hidden touch-none"
                  >
                    <motion.div
                      animate={{
                        x: `calc(${-currentSlide * 100}% - ${swipeOffset}px)`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="flex"
                    >
                      {carouselImages.map((image, index) => (
                        <motion.div
                          key={index}
                          className="flex-shrink-0 w-full h-full relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={image}
                            alt={`Post image ${index + 1}`}
                            width={900}
                            height={625}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                  <div className="flex justify-center gap-0.5 pt-4">
                    {carouselImages.map((_, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-1.5 h-1.5 rounded-full ${
                          index === currentSlide
                            ? "bg-[#009CEF]"
                            : "bg-zinc-600"
                        }`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      />
                    ))}
                  </div>
                </FadeInWhenVisible>

                <FadeInWhenVisible>
                  <div className="p-4">
                    <div className="flex justify-between mb-4">
                      <div className="flex gap-3">
                        <motion.button
                          onClick={() => setIsLiked(!isLiked)}
                          className="hover:text-zinc-300 transition-colors flex flex-row gap-1.5 items-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <motion.div
                            animate={{ scale: isLiked ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                isLiked ? "fill-red-600 stroke-red-600" : ""
                              }`}
                            />
                          </motion.div>
                          <span className="font-semibold text-sm">
                            12,6 mil
                          </span>
                        </motion.button>
                        <motion.button
                          className="hover:text-zinc-300 transition-colors flex flex-row items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span className="font-semibold text-sm">237</span>
                        </motion.button>
                        <motion.button
                          className="hover:text-zinc-300 transition-colors flex flex-row items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Send className="w-5 h-5" />
                          <span className="font-semibold text-sm">652</span>
                        </motion.button>
                      </div>
                      <motion.button
                        onClick={() => setIsSaved(!isSaved)}
                        className="hover:text-zinc-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Bookmark
                          className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`}
                        />
                      </motion.button>
                    </div>
                    <FadeInWhenVisible>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-2">
                          <Avatar className="w-6 h-6 border-2 border-black">
                            <AvatarImage
                              src={NotePerfil.src}
                              alt="@noteplanning"
                            />
                          </Avatar>
                          <Avatar className="w-6 h-6 border-2 border-black">
                            <AvatarImage
                              src={LucasProfile.src}
                              alt="@lucasmendesss_10"
                            />
                          </Avatar>
                          <Avatar className="w-6 h-6 border-2 border-black">
                            <AvatarImage
                              src={RezendeProfile.src}
                              alt="@gz.rzd"
                            />
                          </Avatar>
                        </div>
                        <span className="text-sm">
                          Curtido por <span className="font-semibold">PH</span>{" "}
                          e{" "}
                          <span className="font-semibold">outras pessoas</span>
                        </span>
                      </div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible>
                      <span className="text-sm font-semibold text-white flex items-center gap-1">
                        oordonhas
                        <span className="text-sm font-normal text-white">
                          Continue!
                        </span>
                      </span>
                    </FadeInWhenVisible>
                  </div>
                </FadeInWhenVisible>
              </div>
            </FadeInWhenVisible>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mx-8 justify-center flex flex-col pb-3 pt-1 items-center text-center"
          >
            <motion.a
              href="https://api.whatsapp.com/send?phone=5519993356780&text=Ol%C3%A1,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."
              className="text-xs text-zinc-500 pt-1"
              whileHover={{ scale: 1.05 }}
            >
              Desenvolvido por Lucas Mendes.
            </motion.a>
            <motion.a
              href="https://api.whatsapp.com/send?phone=5519993356780&text=Ol%C3%A1,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."
              className="text-xs text-zinc-500 pt-1"
              whileHover={{ scale: 1.05 }}
            >
              Clique para entrar em contato.
            </motion.a>
          </motion.div>
        </motion.section>
      </main>
    </motion.div>
  );
}
