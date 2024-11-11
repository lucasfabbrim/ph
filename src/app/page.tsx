"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Instagram,
  Music2,
  Crown,
  Copy,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/assets/header.png";
import Whey from "@/assets/whey.png";
import Creatina from "@/assets/creatina.png";

import InstagramPhoto from "@/assets/icons/instagram.png";
import TikTokPhoto from "@/assets/icons/tik-tok.png";
import WhatsAppPhoto from "@/assets/icons/social.png";
import SpotifyPhoto from "@/assets/icons/spotify.png";
import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <main className="container w-full mx-auto md:max-w-lg md:items-center">
        <section className="space-y-6 pt-[0.5px] lg:pt-3">
          {/* Profile Image */}
          <div className="relative overflow-hidden">
            <Image
              src={Profile}
              alt="Phelipi Ordonhas profile"
              width={1200}
              height={600}
              className="w-full h-full lg:h-[550px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6 items-center">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                Phelipi Ordonhas{" "}
                <BadgeCheck className="fill-[#009CEF] text-black" size={28} />
              </h1>
              <p className="text-zinc-500 font-light">@oordonhas</p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {[
              {
                src: InstagramPhoto,
                alt: "Instagram Photo",
                href: "https://instagram.com/oordonhas",
              },
              {
                src: WhatsAppPhoto,
                alt: "WhatsApp Photo",
                href: "https://instagram.com/oordonhas",
              },
              {
                src: TikTokPhoto,
                alt: "TikTok Photo",
                href: "https://instagram.com/oordonhas",
              },
              {
                src: SpotifyPhoto,
                alt: "Music Photo",
                href: "https://music.example.com/oordonhas",
              },
            ].map((social, index) => (
              <Link key={index} href={social.href} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full hover:bg-white/10 transition-opacity`}
                  aria-label={`Visit ${social.alt} profile`}
                >
                  <Image
                    src={social.src}
                    alt={social.alt}
                    width={50}
                    height={50}
                    className="object-contain w-full h-full"
                  />
                </Button>
              </Link>
            ))}
          </div>

          {/* Excellence Card */}
          <div className="space-y-3 border-b border-b-zinc-900 pb-4 mx-6 pt-4">
            <Card className="bg-white/5 border-zinc-900/40 transition-colors w-full flex justify-center items-center p-5 h-16">
              <p className="font-light text-base text-white flex flex-row items-center gap-2 text-center">
                <Crown size={20} className="fill-white" />
                Excelência não é um ato, é um hábito.
              </p>
            </Card>
          </div>

          {/* Product Cards */}
          <div className="space-y-4 mx-6 pb-6 border-b border-b-zinc-900">
            {[
              { name: "Creatina monohidratada", src: Creatina },
              { name: "Whey Protein concentrado", src: Whey },
              { name: "Creatina monohidratada", src: Creatina },
              { name: "Whey Protein concentrado", src: Whey },
            ].map((product, index) => (
              <Card
                key={index}
                className="bg-white/5 border-none hover:bg-zinc-800/90 transition-colors"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto hover:bg-transparent"
                >
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
                      <p className="font-medium text-sm text-white">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-zinc-400 font-light">
                          Utilize Cupom:{" "}
                          <span className="font-semibold">PH</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Copy className="w-10 h-10 text-white" />
                    <ArrowRight className="w-10 h-10 text-white" />
                  </div>
                </Button>
              </Card>
            ))}
          </div>
          <div className="mx-2">
            <Carousel />
          </div>
        </section>
      </main>
    </div>
  );
}
