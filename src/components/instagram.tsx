"use client";

import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useState, useRef, TouchEvent } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Profile from "@/assets/header.png";
import LucasProfile from "@/assets/lucas-perfil.png";
import RezendeProfile from "@/assets/rezende-profile.png";
import NotePerfil from "@/assets/note-perfil.png";
import PHProfile from "@/assets/perfil-instagram.png";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";

const carouselImages = [Photo, Photo2];

export default function InstagramCarouselComponent() {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      nextSlide();
    }
    if (touchEndX.current - touchStartX.current > 75) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white border-t border-b border-zinc-800 pb-4">
      <div className="flex items-center p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={PHProfile.src} alt="Profile picture" />
          <AvatarFallback>OO</AvatarFallback>
        </Avatar>
        <span className="ml-3 font-semibold">oordonhas</span>
        <span className="ml-2 text-zinc-400">• Seguindo</span>
      </div>

      <div
        className="relative aspect-[4/5] bg-zinc-800"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={carouselImages[currentSlide]}
          alt={`Post image ${currentSlide + 1}`}
          fill
          className="object-cover"
        />
        {carouselImages.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1"
              onClick={nextSlide}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-zinc-500/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="hover:text-zinc-300 transition-colors"
            >
              <Heart
                className={`w-6 h-6 ${
                  isLiked ? "fill-red-500 stroke-red-500" : ""
                }`}
              />
            </button>
            <button className="hover:text-zinc-300 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="hover:text-zinc-300 transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="hover:text-zinc-300 transition-colors"
          >
            <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex -space-x-2">
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={NotePerfil.src} alt="@lari_briski" />
              <AvatarFallback>LB</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={LucasProfile.src} alt="@user2" />
              <AvatarFallback>U2</AvatarFallback>
            </Avatar>
            <Avatar className="w-6 h-6 border-2 border-black">
              <AvatarImage src={RezendeProfile.src} alt="@user3" />
              <AvatarFallback>U3</AvatarFallback>
            </Avatar>
          </div>
          <span className="text-sm">
            Curtido por <span className="font-semibold">lucasmendes</span> e{" "}
            <span className="font-semibold">outras 123.671 pessoas</span>
          </span>
        </div>
        <div className="text-xs text-zinc-400 mt-1 font-light">
          28 de janeiro
        </div>
      </div>
    </div>
  );
}
