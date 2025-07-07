import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { NewsItem } from "@/types/news";
import { getAllNews } from "@/services/api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const shuffleArray = (array: NewsItem[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const HeroSlider = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  const { data: sliderNews, isLoading } = useQuery({
    queryKey: ["heroSliderNews"],
    queryFn: getAllNews,
    staleTime: 1000 * 60 * 60 * 6,
    select: (data) => shuffleArray([...data]).slice(0, 5),
  });

  if (isLoading) {
    return (
      <div className="w-full h-[550px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
        <p className="text-muted-foreground">Memuat Berita Utama...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setCarouselApi}
        className="rounded-lg"
      >
        <CarouselContent>
          {sliderNews?.map((news) => (
            <CarouselItem key={news.id}>
              <Link to={`/berita/${news.slug}`} className="block">
                <div className="relative w-full h-[550px]">
                  <img
                    src={`https://drive.google.com/thumbnail?id=${news.gambar}&sz=w1600`}
                    alt={news.judul}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
                    <div className="max-w-3xl">
                      
                      <h1 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg hover:text-primary-foreground/90 transition-colors">
                        {news.judul}
                      </h1>
                      <p className="mt-4 text-base text-gray-200 drop-shadow-md">
                        <span className="font-semibold">{news.kategori } •  
                          </span> Oleh <span className="font-semibold">{news.penulis}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Buttons */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/20 hover:bg-background/40 text-white"
          onClick={() => carouselApi?.scrollPrev()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-background/20 hover:bg-background/40 text-white"
          onClick={() => carouselApi?.scrollNext()}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSlider;
