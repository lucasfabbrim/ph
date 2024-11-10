import { Button } from "@/components/ui/button";
import { Instagram, Music2, Youtube, Copy } from "lucide-react";
import Image from "next/image";

import Profile from "@/assets/header.png";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <main className="container flex flex-col">
        <section id="hero" className="bg-black mx-auto">
          <div className="dark min-h-screen bg-black text-white ">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="relative">
                <Image
                  src={Profile}
                  alt="Profile"
                  width={0}
                  height={0}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/70 rounded-lg" />
                <div className="absolute bottom-4 left-4">
                  <h1 className="text-3xl font-bold">Phelipi Ordonhas</h1>

                  <p className="text-gray-300">@oordonhas</p>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-pink-600 hover:bg-pink-700"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-black hover:bg-gray-900"
                >
                  <Music2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-green-600 hover:bg-green-700"
                >
                  <Music2 className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-red-600 hover:bg-red-700"
                >
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>

              {/* Product Links */}
              <div className="space-y-2">
                <Card className="bg-gray-900/50 border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium">Creatina monohidrat...</p>
                        <p className="text-sm text-gray-400">Zollim</p>
                      </div>
                    </div>
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-500 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium">Whey Protein conce...</p>
                        <p className="text-sm text-gray-400">Zollim</p>
                      </div>
                    </div>
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>

                <Card className="bg-gray-900/50 border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-between p-4 h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded"></div>
                      <div className="text-left">
                        <p className="font-medium">Supertesto pro 120 cá...</p>
                        <p className="text-sm text-gray-400">Zollim</p>
                      </div>
                    </div>
                    <Copy className="h-4 w-4" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
