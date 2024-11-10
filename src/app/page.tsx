import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Instagram, Music2, Youtube, ExternalLink, Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Profile from "@/assets/header.png";

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
            <div className="absolute bottom-4 left-4 space-y-1 items-center">
              <h1 className="text-3xl font-extrabold">Phelipi Ordonhas</h1>
              <p className="text-gray-400 font-medium">@oordonhas</p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {[
              {
                icon: Instagram,
                bg: "bg-pink-600",
                href: "https://instagram.com/oordonhas",
              },
              {
                icon: Music2,
                bg: "bg-black",
                href: "https://music.example.com/oordonhas",
              },
              {
                icon: Music2,
                bg: "bg-green-600",
                href: "https://spotify.com/artist/oordonhas",
              },
              {
                icon: Youtube,
                bg: "bg-red-600",
                href: "https://youtube.com/@oordonhas",
              },
            ].map((social, index) => (
              <Link key={index} href={social.href} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full ${social.bg} hover:opacity-80 transition-opacity`}
                  aria-label={`Visit ${social.icon.name} profile`}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}
          </div>
          <div className="space-y-3 border-b border-b-zinc-900 pb-4 mx-4 pt-4">
            <Card className="bg-white/5 border-zinc-900/40 transition-colors">
              <Button
                variant="ghost"
                className="w-full justify-center p-5 h-20"
              >
                <p className="font-medium text-base text-white">
                  Excelência não é um ato, é um hábito.
                </p>
              </Button>
            </Card>
          </div>

          <div className="space-y-3 px-4">
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
        </section>
      </main>
    </div>
  );
}
