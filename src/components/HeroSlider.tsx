import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { getOptimizedDriveThumbnail } from "@/lib/utils";

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
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { data: sliderNews, isLoading } = useQuery({
    queryKey: ["heroSliderNews"],
    queryFn: getAllNews,
    staleTime: 1000 * 60 * 60 * 6,
    select: (data) => shuffleArray([...data]).slice(0, 5),
  });

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  const toggleAutoplay = () => {
    if (isPlaying) {
      plugin.current.stop();
    } else {
      plugin.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto animate-spin"></div>
            <p className="text-gray-500 text-lg font-medium">Memuat Berita Utama...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full group">
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => isPlaying && plugin.current.reset()}
        setApi={setCarouselApi}
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        <CarouselContent>
          {sliderNews?.map((news, index) => (
            <CarouselItem key={news.id}>
              <Link to={`/berita/${news.slug}`} className="block">
                <div className="relative w-full h-[600px] overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={getOptimizedDriveThumbnail(news.gambar)}
                      alt={news.judul}
                      className="w-full h-full object-cover transition-transform duration-[8s] ease-out hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-8 md:p-12 text-white">
                    <div className="max-w-4xl space-y-6">
                      {/* Category badge */}
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-full">
                          <span className="text-sm font-bold uppercase tracking-wide">
                            {news.kategori}
                          </span>
                        </div>
                        <div className="h-1 w-12 bg-white/30 rounded-full"></div>
                      </div>

                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl hover:text-blue-200 transition-colors duration-300">
                        {news.judul}
                      </h1>

                      <div className="flex items-center gap-4 text-base">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="font-semibold">By {news.penulis}</span>
                        </div>
                        <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                        <span className="text-gray-200">
                          {new Date(news.created_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg"
          onClick={() => carouselApi?.scrollPrev()}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-300 shadow-lg"
          onClick={() => carouselApi?.scrollNext()}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="flex gap-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current - 1 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => carouselApi?.scrollTo(index)}
              />
            ))}
          </div>
          
          {/* Slide counter */}
          <div className="text-white text-sm font-medium">
            {current} / {count}
          </div>
          
          {/* Play/Pause button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleAutoplay}
            className="w-8 h-8 text-white hover:bg-white/20 rounded-full"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-3 right-3 h-1 bg-white/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${((current - 1) / (count - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default HeroSlider;