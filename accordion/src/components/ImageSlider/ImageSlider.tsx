import { useEffect, useState, useRef } from "react";

interface ImageSliderProps {
  url: string;
  page?: number;
  limit?: number; // Number of images to fetch per API call
}

interface ImageData {
  id: string;
  author: string;
  download_url: string;
}

export default function ImageSlider({ url, page = 1, limit = 5 }: ImageSliderProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fetch images
  const fetchImages = async (pageToFetch: number) => {
    try {
      const response = await fetch(`${url}?page=${pageToFetch}&limit=${limit}`);
      const data: ImageData[] = await response.json();
      setImages((prev) => [...prev, ...data]); // append new images
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchImages(currentPage).finally(() => setLoading(false));
  }, [currentPage, url, limit]);

  if (loading && images.length === 0) return <p>Loading images...</p>;

  // Slide left
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      sliderRef.current?.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  // Slide right
  const handleNext = () => {
    const newIndex = currentIndex + 1;
    // If we reach end of current images, fetch next page
    if (newIndex + 5 > images.length) {
      setCurrentPage((prev) => prev + 1);
    }
    setCurrentIndex(newIndex);
    sliderRef.current?.scrollBy({ left: 220, behavior: "smooth" });
  };

  // Dots: always 5, highlight current group
  const totalDots = 5;
  const currentDot = Math.floor(currentIndex / 1) % totalDots; // slide group

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      {/* Slider */}
      <div
        ref={sliderRef}
        style={{
          display: "flex",
          overflowX: "hidden",
          gap: "10px",
          scrollBehavior: "smooth",
        }}
      >
        {images.map((img) => (
          <img
            key={img.id}
            src={img.download_url}
            alt={img.author}
            style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
          />
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          borderRadius: "0 5px 5px 0",
        }}
      >
        ◀
      </button>

      {/* Right arrow */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: "pointer",
          borderRadius: "5px 0 0 5px",
        }}
      >
        ▶
      </button>

      {/* Dots */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px", gap: "5px" }}>
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: i === currentDot ? "blue" : "lightgrey",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
}
