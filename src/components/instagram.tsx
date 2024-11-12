"use client";

import { Heart, MessageCircle, Bookmark, Send, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./instagram-carousel.css";
import LucasProfile from "@/assets/lucas-perfil.png";
import RezendeProfile from "@/assets/rezende-profile.png";
import NotePerfil from "@/assets/note-perfil.png";
import PHProfile from "@/assets/perfil-instagram.png";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";
import Photo3 from "@/assets/card-3.png";
import Photo4 from "@/assets/card-4.png";
import Photo5 from "@/assets/card-5.png";

const carouselImages = [Photo, Photo5, Photo2, Photo3, Photo4];

export default function InstagramCarouselComponent() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="max-w-md mx-auto bg-black text-white border-b border-zinc-800 pb-4 -mt-5">
      <div className="flex items-center p-4 border-zinc-600 border-b border-b-zinc-950">
        <Avatar className="h-6 w-6 border border-zinc-600">
          <AvatarImage src={PHProfile.src} alt="Profile picture" />
        </Avatar>
        <span className="ml-2 font-semibold text-sm">oordonhas</span>
        <BadgeCheck className="fill-[#009CEF] text-black ml-1" size={16} />
      </div>

      <Swiper
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' bg-[#009CEF]"></span>';
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {carouselImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="aspect-[3/4] relative">
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="hover:text-zinc-300 transition-colors flex flex-row gap-1.5 items-center"
            >
              <Heart
                className={`w-5 h-5 ${
                  isLiked ? "fill-red-600 stroke-red-600" : ""
                }`}
              />
              <span className="font-semibold text-sm">12,6 mil</span>
            </button>
            <button className="hover:text-zinc-300 transition-colors flex flex-row items-center gap-1">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">237</span>
            </button>
            <button className="hover:text-zinc-300 transition-colors flex flex-row items-center gap-1">
              <Send className="w-5 h-5" />
              <span className="font-semibold text-sm">652</span>
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="hover:text-zinc-300 transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={NotePerfil.src} alt="@noteplanning" />
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={LucasProfile.src} alt="@lucasmendesss_10" />
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={RezendeProfile.src} alt="@gz.rzd" />
            </Avatar>
          </div>
          <span className="text-sm">
            Curtido por <span className="font-semibold">PH</span> e{" "}
            <span className="font-semibold">outras pessoas</span>
          </span>
        </div>
        <span className="text-sm font-semibold text-white flex items-center gap-1">
          oordonhas
          <span className="text-sm font-normal text-white">Continue!</span>
        </span>
      </div>
    </div>
  );
}
