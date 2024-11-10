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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/assets/header.png";
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
            <Card className="bg-white/5 border-zinc-900/40 transition-colors">
              <Button
                variant="ghost"
                className="w-full justify-center p-5 h-16"
              >
                <p className="font-light text-base text-white flex flex-row items-center gap-2">
                  <Crown size={20} className="fill-white" />
                  Excelência não é um ato, é um hábito.
                </p>
              </Button>
            </Card>
          </div>

          <div className="space-y-3 mx-4 pb-6 border-b border-b-zinc-900">
            {[
              { name: "Creatina monohidratada", color: "bg-green-500" },
              { name: "Whey Protein concentrado", color: "bg-red-500" },
              { name: "Supertesto pro 120 cápsulas", color: "bg-blue-500" },
            ].map((product, index) => (
              <Card
                key={index}
                className="bg-white/5 border-zinc-900/40 transition-colors"
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between p-5 h-20"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">Phelipi</p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-2">
                    <Copy size={22} />
                    <ExternalLink size={22} />
                  </div>
                </Button>
              </Card>
            ))}
          </div>
          {/* Social Media Cards */}
          <div className="grid grid-cols-2 gap-4 px-4">
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
