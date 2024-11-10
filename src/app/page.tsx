import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Instagram,
  Music2,
  Youtube,
  ExternalLink,
  Copy,
  Facebook,
  BadgeCheck,
  Crown,
  TicketCheck,
  Tickets,
  Ticket,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/assets/header.png";
import Whey from "@/assets/whey.png";
import Creatina from "@/assets/creatina.png";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";

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
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-4 left-6 items-center">
              <h1 className="text-3xl font-bold flex items-center gap-3">
                Phelipi Ordonhas{" "}
                <BadgeCheck className="fill-[#009CEF] text-black" size={28} />
              </h1>
              <p className="text-zinc-500 font-light">@oordonhas</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {[
              {
                icon: Instagram,
                bg: "bg-white",
                href: "https://instagram.com/oordonhas",
              },
              {
                icon: Music2,
                bg: "bg-white",
                href: "https://music.example.com/oordonhas",
              },
              {
                icon: Music2,
                bg: "bg-white",
                href: "https://spotify.com/artist/oordonhas",
              },
              {
                icon: Youtube,
                bg: "bg-white",
                href: "https://youtube.com/@oordonhas",
              },
            ].map((social, index) => (
              <Link key={index} href={social.href} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${social.bg} hover:bg-white/90 transition-opacity`}
                  aria-label={`Visit ${social.icon.name} profile`}
                >
                  <social.icon className="h-5 w-5 text-black fill-black" />
                </Button>
              </Link>
            ))}
          </div>
          <div className="space-y-3 border-b border-b-zinc-900 pb-4 mx-4 pt-4">
            <Card className="bg-white/5 border-zinc-900/40 transition-colors w-full flex justify-center items-center p-5 h-16">
              <p className="font-light text-base text-white flex flex-row items-center gap-2 text-center">
                <Crown size={20} className="fill-white" />
                Excelência não é um ato, é um hábito.
              </p>
            </Card>
          </div>

          <div className="space-y-4 mx-4 pb-6 border-b border-b-zinc-900">
            {[
              { name: "Creatina monohidratada", src: Creatina },
              { name: "Whey Protein concentrado", src: Whey },
              { name: "Supertesto pro 120 cápsulas", src: Creatina },
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
                      <p className="font-medium text-base text-white">
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

          <div className="grid grid-cols-2 gap-4 mx-4 border-b border-b-zinc-900 pb-4">
            <Link
              href="https://youtube.com/@oordonhas"
              className="relative aspect-[2/3] overflow-hidden rounded-xl group"
            >
              <Image
                src={Photo}
                alt="YouTube content"
                width={400}
                height={300}
                className="object-cover w-full h-full brightness-75 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Youtube className="w-6 h-6" />
                <span className="text-lg font-semibold">Youtube</span>
              </div>
            </Link>

            <Link
              href="https://facebook.com/oordonhas"
              className="relative aspect-[2/3] overflow-hidden rounded-xl group"
            >
              <Image
                src={Photo2}
                alt="Facebook content"
                width={400}
                height={300}
                className="object-cover w-full h-full brightness-75 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Facebook className="w-6 h-6" />
                <span className="text-lg font-semibold">Facebook</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
