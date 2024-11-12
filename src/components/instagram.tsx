"use client";

import { Heart, MessageCircle, Bookmark, Send, BadgeCheck } from "lucide-react";
import Image from "next/image";
import { useState, useRef, TouchEvent } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import LucasProfile from "@/assets/lucas-perfil.png";
import RezendeProfile from "@/assets/rezende-profile.png";
import NotePerfil from "@/assets/note-perfil.png";
import PHProfile from "@/assets/perfil-instagram.png";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";
import Photo3 from "@/assets/card-3.png";

const carouselImages = [Photo, Photo2, Photo3];

export default function InstagramCarouselComponent() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsSwiping(true);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping) return;
    touchEndX.current = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (
      (currentSlide === 0 && diff < 0) ||
      (currentSlide === carouselImages.length - 1 && diff > 0)
    ) {
      setSwipeOffset(0);
      return;
    }
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
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
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white border-b border-zinc-800 pb-4 -mt-5">
      <div className="flex items-center p-4 border-zinc-600 border-b border-b-zinc-950">
        <Avatar className="h-6 w-6 border border-zinc-600">
          <AvatarImage src={PHProfile.src} alt="Profile picture" />
        </Avatar>
        <span className="ml-2 font-semibold text-sm">oordonhas</span>
        <BadgeCheck className="fill-[#009CEF] text-black ml-1" size={16} />
      </div>

      <div
        className="relative aspect-[3/5.5] bg-transparent overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${-currentSlide * 100 + swipeOffset / 4}%)`,
          }}
        >
          {carouselImages.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative ">
              <Image
                src={image}
                alt={`Post image ${index + 1}`}
                width={900}
                height={625}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-0.5 pt-4">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-1.5 h-1.5 rounded-full ${
              index === currentSlide ? "bg-[#009CEF]" : "bg-zinc-600"
            }`}
          />
        ))}
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-3">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="hover:text-zinc-300 transition-colors flex flex-row gap-1.5 items-center"
            >
              <Heart
                className={`w-5 h-5 ${
                  !isLiked ? "fill-red-600 stroke-red-600" : ""
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
            <Bookmark className={`w-5 h-5 ${!isSaved ? "fill-current" : ""}`} />
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
