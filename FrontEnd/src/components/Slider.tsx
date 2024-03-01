import { useEffect, useRef, useState } from "react";

// Assuming the paths are correct and the images are imported successfully
import ducky from '../parmasan_icons/cane.jpg';
import MEOW from '../parmasan_icons/d.jpg';

const featuredProducts = [ducky, MEOW];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null); // Correctly typed for a div element
  const slideIntervalRef = useRef<number | null>(null); // For storing interval ID

  const removeAnimation = () => {
    slideRef.current?.classList.remove("fade-anim");
  };

  useEffect(() => {
    const startSlider = () => {
      slideIntervalRef.current = window.setInterval(() => { // window.setInterval to satisfy TypeScript
        handleOnNextClick();
      }, 5000); // Example: 5000ms for slower transition
    };

    const pauseSlider = () => {
      if (slideIntervalRef.current !== null) {
        clearInterval(slideIntervalRef.current);
      }
    };

    slideRef.current?.addEventListener("animationend", removeAnimation);
    slideRef.current?.addEventListener("mouseenter", pauseSlider);
    slideRef.current?.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProducts.length);
    slideRef.current?.classList.add("fade-anim");
  };

  const handleOnPrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + featuredProducts.length - 1) % featuredProducts.length);
    slideRef.current?.classList.add("fade-anim");
  };

  return (
    <div ref={slideRef} className="grid grid-cols-1 content-center w-44 select-none relative rounded-lg min-[780px]:grid min-[0px]:hidden">
      <img src={featuredProducts[currentIndex]} alt="Featured Product" className="rounded-2xl"/>
    </div>
  );
}
