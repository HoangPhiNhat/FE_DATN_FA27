// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faChevronLeft,
//   faChevronRight,
// } from "@fortawesome/free-solid-svg-icons";

// const ImageSlider = () => {
//   const images = [
//     "/images/banner1_dk.webp",
//     "/images/banner_web__desk_.webp",
//     "/images/banner1_dk.webp",
//     "/images/banner_web__desk_.webp",
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   const handleNext = () => {
//     setFadeIn(false);
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === images.length - 1 ? 0 : prevIndex + 1
//       );
//       setFadeIn(true);
//     }, 100);
//   };

//   const handlePrev = () => {
//     setFadeIn(false);
//     setTimeout(() => {
//       setCurrentIndex((prevIndex) =>
//         prevIndex === 0 ? images.length - 1 : prevIndex - 1
//       );
//       setFadeIn(true);
//     }, 100);
//   };

//   return (
//     <div className="relative w-full h-[712px]">
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`absolute  inset-0 transition-opacity duration-500 ${
//             index === currentIndex ? "opacity-100" : "opacity-0"
//           }`}
//         >
//           <Image
//             src={image}
//             alt={`Slide ${index + 1}`}
//             fill
//             className={`object-cover w-full h-full ${
//               fadeIn ? "fade-in" : "fade-out"
//             }`}
//           />
//         </div>
//       ))}

//       <button
//         onClick={handlePrev}
//         className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
//       >
//         <FontAwesomeIcon icon={faChevronLeft} />
//       </button>

//       <button
//         onClick={handleNext}
//         className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition"
//       >
//         <FontAwesomeIcon icon={faChevronRight} />
//       </button>
//     </div>
//   );
// };

// export default ImageSlider;
