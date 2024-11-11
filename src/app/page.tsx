"use client";

import { useEffect, useState } from "react"; // Importar useState para gerenciar o estado
import { Card } from "@/components/ui/card";
import {
  Crown,
  BadgeCheck,
  ShoppingCart,
  Files,
  Copy,
  ChevronRight,
  ChevronDown,
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

// Importando o Toast hook
import { useToast } from "@/hooks/use-toast"; // Seu hook customizado para toast
import YoutubeIcon from "@/assets/icons/youtube.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Copiando from "@/assets/icons/copiando.svg";
import Cupom from "@/assets/icons/cupom.svg";
import NotePerfil from "@/assets/note-perfil.png";

export default function Home() {
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCopy = (link: string) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          className:
            "bg-black lg:bg-zinc-900/60 rounded-[10px] text-white border-none ",
          title: "Perfeito! Copiado com sucesso!",
          description: "Agora você pode colar o link onde desejar.",
          duration: 1000,
        });
      })
      .catch((err) => {
        console.error("Erro ao copiar o link:", err);
      });
  };

  if (!isClient) {
    return null; // Retorna null no servidor, aguardando renderização no cliente
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <main className="container w-full mx-auto md:max-w-lg md:items-center">
        <section className="space-y-6 pt-[0.5px] lg:pt-3">
          <div className="relative overflow-hidden">
            <Image
              src={Profile}
              alt="Phelipi Ordonhas profile"
              width={1200}
              height={600}
              className="w-full h-full lg:h-[550px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-6 flex justify-center items-center w-full text-center">
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
            </div>
          </div>

          <div className="flex justify-center gap-3 pb-10">
            {[
              {
                src: TikTokIcon,
                alt: "TikTok Icon",
                href: "https://tiktok.com/oordonhas",
              },
              {
                src: YoutubeIcon,
                alt: "Instagram Icon",
                href: "https://instagram.com/oordonhas",
              },
              {
                src: SpotifyIcon,
                alt: "Spotify Icon",
                href: "https://spotify.com/oordonhas",
              },
            ].map((product, index) => (
              <a
                key={index}
                href={product.href}
                className="flex items-center justify-center rounded-xl text-white transition-colors "
              >
                <product.src />
              </a>
            ))}
          </div>

          {/* Excellence Card */}
          <div className="space-y-3 border-b border-b-zinc-900 pb-12 mx-6 pt-6 border-t border-t-zinc-900">
            <h1 className="items-center text-center text-xl pb-3 font-semibold pt-4 ">
              Organização
            </h1>
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
                  <button
                    onClick={() =>
                      handleCopy(
                        "https://www.gsuplementos.com.br/creatina-100g-creapure-growth-supplements-p985927",
                      )
                    }
                  >
                    <Copiando className="w-5 h-5" />
                  </button>
                  <Link href="#">
                    <ShoppingCart className="w-6 h-6 text-white fill-white" />
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Outros Produtos */}
          <div className="space-y-5 mx-6 pb-10 border-b border-b-zinc-900 pt-4">
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
                name: "Whey Protein",
                src: Whey,
                link: "https://www.gsuplementos.com.br/whey-protein-concentrado-1kg-growth-supplements-p985936",
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
              <Card
                key={index}
                className="bg-neutral-900/60 border-none rounded-[25px]"
              >
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
                    <button onClick={() => handleCopy(product.link)}>
                      <Copiando className="w-5 h-5" />
                    </button>
                    <Link href={product.link}>
                      <ShoppingCart className="w-6 h-6 text-white fill-white" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Instagram Carousel */}
          <div className="mx-6 ">
            <InstagramCarouselComponent />
          </div>

          {/* Mensagem de rodapé */}
          <div className="mx-6 justify-center flex flex-col pb-4 items-center text-center">
            <a
              href="https://api.whatsapp.com/send?phone=5519993356780&text=Ol%C3%A1,%20vim%20pelo%20PH%20e%20tenho%20interesse%20em%20criar%20um%20site."
              className="text-xs text-zinc-400 pt-1"
            >
              Desenvolvido por Lucas Mendes.
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
