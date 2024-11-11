"use client";

import * as React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Photo from "@/assets/card-1.jpeg";
import Photo2 from "@/assets/card-2.jpeg";

export default function Carousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const images = [
    {
      src: Photo,
      alt: "Scenic mountain landscape",
    },
    {
      src: Photo2,
      alt: "Serene beach at sunset",
    },
  ];

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden border-none">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div className="flex-[0_0_100%] min-w-0 relative" key={index}>
                <div className="aspect-[2/2.5] relative overflow-hidden rounded-lg m-4">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-all duration-300 hover:scale-105 rounded-[10px]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 p-4">
        {scrollSnaps.map((_, index) => (
          <Button
            key={index}
            variant="outline"
            size="icon"
            className={`w-2 h-2 rounded-full p-0 transition-all duration-300 border-none ${
              index === selectedIndex
                ? "bg-white scale-125 hover:bg-white/80 w-4"
                : "bg-white/70 hover:bg-white/70"
            }`}
            onClick={() => scrollTo(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
