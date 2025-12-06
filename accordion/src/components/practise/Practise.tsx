import { useEffect, useRef, useState } from "react";
import styles from "./Practise.module.css";

interface ImageSliderProps {
  url: string;
  page?: number;
  limit?: number;
}

interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

export default function Practise({
  url,
  page = 1,
  limit = 5,
}: ImageSliderProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const sliderRef = useRef<HTMLDivElement>(null);

  const fetchImages = async (pageToFetch: number) => {
    try {
      const response = await fetch(`${url}?page=${pageToFetch}&limit=${limit}`);
      const data: ImageData[] = await response.json();
      setImages((prev) => [...prev, ...data]); //append new imagess
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchImages(currentPage).finally(() => setLoading(false));
  }, [currentPage, url, limit]);
  if (loading && images.length === 0) return <p>Loading images...</p>;
  //slide left
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current?.scrollBy({ left: -220, behavior: "smooth" });
    }
  };
  //slide right
  const handleNext = () => {
    const newIndex = currentIndex + 1;
    //if we reach end of current images, fetch next page
    if (newIndex + 5 > images.length) {
      setCurrentPage((prev) => prev + 1);
    }
    setCurrentIndex(newIndex);
    sliderRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };
  //dots is 5
  const totalDots = 5;
  const currentDot = Math.floor(currentIndex / 1) % totalDots;

  return (
    <div className={styles.container}>
      {/* Slider */}
      <div ref={sliderRef} className={styles.slideref}>
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt={img.author}
            className={styles.slide}
          />
        ))}
      </div>
      {/* left arrow */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className={`${styles.letarrow} ${
          currentIndex === 0 ? styles.notAllowed : styles.pointer
        }`}
      ></button>
      {/* Right arrow */}
      <button onClick={handleNext} className={styles.rightarrow}></button>
      {/* Dots */}
      <div className={styles.dots}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`${styles.spandot} ${
              i === currentDot ? styles.activeDot : styles.inactiveDot
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
