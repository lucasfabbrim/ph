"use client";

import { Card } from "@/components/ui/card";
import { Crown, BadgeCheck, ShoppingCart, Files, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/assets/header.png";
import Whey from "@/assets/whey.png";
import Creatina from "@/assets/creatina.png";

import InstagramCarouselComponent from "@/components/instagram";

// Importando os ícones SVG diretamente
import InstagramIcon from "@/assets/icons/instagram.svg";
import WhatsAppIcon from "@/assets/icons/whatsapp.svg";
import TikTokIcon from "@/assets/icons/titkok.svg";
import SpotifyIcon from "@/assets/icons/spotify.svg";
import Copiando from "@/assets/icons/copiando.svg";

export default function Home() {
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
            <div className="absolute bottom-4 left-6 items-center">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                Phelipi Ordonhas{" "}
                <BadgeCheck className="fill-[#009CEF] text-black" size={28} />
              </h1>
              <p className="text-zinc-400 text-sm -mt-0.5">@oordonhas</p>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {[
              {
                src: InstagramIcon,
                alt: "Instagram Icon",
                href: "https://instagram.com/oordonhas",
              },
              {
                src: WhatsAppIcon,
                alt: "WhatsApp Icon",
                href: "https://whatsapp.com/oordonhas",
              },
              {
                src: TikTokIcon,
                alt: "TikTok Icon",
                href: "https://tiktok.com/oordonhas",
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
          <div className="space-y-3 border-b border-b-zinc-900 pb-8 mx-6 pt-6">
            <Card className="bg-neutral-900/60 border-zinc-900/40 transition-colors w-full flex justify-center items-center p-5 h-16 rounded-[25px]">
              <p className="text-sm font-medium text-white flex flex-row items-center gap-2 text-center">
                <Crown size={20} className="fill-yellow-500 text-yellow-500" />
                Excelência não é um ato, é um hábito.
              </p>
            </Card>
          </div>

          <div className="space-y-5 mx-6 pb-10 border-b border-b-zinc-900 pt-4">
            {[
              {
                id: 1,
                name: "Creatina",
                src: Creatina,
                link: "",
              },
              { id: 2, name: "Whey Protein", src: Whey, link: "" },
              {
                id: 3,
                name: "Pré-treino",
                src: Creatina,
                link: "",
              },
              { id: 4, name: "BCAA", src: Whey, link: "" },
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
                      <p className="font-bold text-sm text-white">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm pt-0.5 text-zinc-300">
                          Use Cupom:{" "}
                          <span className="font-semibold text-white">PH</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mr-3">
                    <Link key={product.id} href={product.link}>
                      <Copiando className="w-4 h-4" />
                    </Link>
                    <Link key={product.id + 1} href={product.link}>
                      <ShoppingCart className="w-5 h-5 text-white fill-white" />
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mx-6">
            <InstagramCarouselComponent />
          </div>
        </section>
      </main>
    </div>
  );
}
