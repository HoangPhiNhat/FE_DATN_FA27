// "use client";
// import { formatPrice } from "@/systems/utils/formatPrice";
// import {
//   faAnglesRight,
//   faChevronLeft,
//   faChevronRight,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState, useEffect } from "react";

// const PreviewProduct = ({ product, onClose }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
//   const [selectedSize, setSelectedSize] = useState(null);
//   const [isClosing, setIsClosing] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   const allImages = product.variants[selectedVariantIndex].images;
//   const variant = product.variants[selectedVariantIndex];

//   useEffect(() => {
//     if (variant.sizes.length > 0) {
//       setSelectedSize(variant.sizes[0].size);
//     }
//   }, [selectedVariantIndex, variant.sizes]);

//   const handlePrev = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const handleVariantClick = (index) => {
//     if (selectedVariantIndex !== index) {
//       setSelectedVariantIndex(index);
//       setCurrentImageIndex(0);
//       setSelectedSize(null);
//     }
//   };

//   const handleSizeClick = (size) => {
//     if (selectedSize !== size) {
//       setSelectedSize(size);
//     }
//   };
//   console.log(selectedSize);

//   const handleClose = () => {
//     setIsClosing(true);
//     setTimeout(() => {
//       onClose();
//     }, 500);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[54] ">
//       <div
//         className={`absolute top-0 left-0 w-full h-full bg-black opacity-50 ${
//           isClosing ? "animate-jump-out animate-once" : ""
//         }`}
//         onClick={handleClose}
//       ></div>
//       <div
//         className={`relative bg-white px-6 pt-4 max-w-[800px] w-[800px] rounded-md ${
//           isClosing ? "animate-jump-out animate-once" : "animate-flip-down"
//         }`}
//       >
//         <button
//           className="absolute right-0 top-0 mt-2 mr-2"
//           onClick={handleClose}
//         >
//           <FontAwesomeIcon icon={faXmark} size="xl" />
//         </button>
//         <div className="flex gap-4">
//           <div className="relative">
//             <button
//               className="absolute top-1/2  p-2 text-xl  rounded-lg mr-2"
//               onClick={handlePrev}
//               disabled={allImages.length <= 1}
//             >
//               <FontAwesomeIcon icon={faChevronLeft} />
//             </button>
//             <div className=" rounded-lg overflow-hidden">
//               <Image
//                 src={allImages[currentImageIndex]}
//                 width={400}
//                 height={400}
//                 alt={`Hình ảnh ${currentImageIndex + 1}`}
//                 className="rounded"
//               />
//             </div>
//             <button
//               className="absolute right-0 top-1/2 p-2 text-xl  rounded-lg ml-2"
//               onClick={handleNext}
//               disabled={allImages.length <= 1}
//             >
//               <FontAwesomeIcon icon={faChevronRight} />
//             </button>
//           </div>
//           <div className="flex flex-col flex-1">
//             <h2 className="text-2xl mb-1">{product.name}</h2>
//             <span className="mb-2">
//               <strong>SKU</strong>: PHINHAT2712
//             </span>
//             <p className="text-primary font-semibold">
//               {formatPrice(product.price)}
//             </p>

//             <p className="mt-4">
//               <strong>Màu sắc:</strong> {variant.color}
//             </p>

//             <div className="flex space-x-2 mt-2">
//               {product.variants.map((variant, index) => (
//                 <button
//                   key={index}
//                   title={variant.color}
//                   onClick={() => handleVariantClick(index)}
//                   className={`relative aspect-square w-10 h-10 rounded-full overflow-hidden border-2 ${
//                     selectedVariantIndex === index
//                       ? "border-primary"
//                       : "border-gray-400"
//                   }`}
//                 >
//                   <Image
//                     src={variant.images[0]}
//                     layout="fill"
//                     objectFit="cover"
//                     alt={variant.color}
//                   />
//                 </button>
//               ))}
//             </div>

//             <p className="mb-2 mt-4">
//               <strong>Size: </strong> {selectedSize}
//             </p>
//             <div className="flex space-x-2">
//               {variant.sizes.map((sizeObj) => (
//                 <button
//                   key={sizeObj.size}
//                   onClick={() => handleSizeClick(sizeObj.size)}
//                   className={`border rounded-lg p-1 w-[40px] h-[40px] ${
//                     selectedSize === sizeObj.size
//                       ? "border-primary "
//                       : "border-gray-300"
//                   }`}
//                 >
//                   {sizeObj.size}
//                 </button>
//               ))}
//             </div>

//             {selectedSize && (
//               <p className="mt-2">
//                 <strong>Số lượng: </strong>
//                 {
//                   variant.sizes.find((sizeObj) => sizeObj.size === selectedSize)
//                     .quantity
//                 }
//               </p>
//             )}

//             <div className="flex items-center gap-3">
//               <div className="flex items-center">
//                 <button
//                   className="w-[45px] h-[45px] border"
//                   onClick={() =>
//                     setQuantity(quantity > 1 ? quantity - 1 : quantity)
//                   }
//                 >
//                   -
//                 </button>
//                 <input
//                   className="w-[45px] h-[45px] border text-center focus:outline-none"
//                   min={1}
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, Number(e.target.value)))
//                   }
//                 />

//                 <button
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="w-[45px] h-[45px] border"
//                 >
//                   +
//                 </button>
//               </div>
//               <button className=" text-primary border border-primary w-full h-full py-2 rounded-md hover:bg-primary hover:text-white transition-colors duration-300">
//                 Thêm vào giỏ hàng
//               </button>
//             </div>
//           </div>
//         </div>
//         <Link
//           href="product-details"
//           className="flex justify-center items-center underline my-3"
//         >
//           <p>Xem chi tiết</p>
//           <FontAwesomeIcon icon={faAnglesRight} className="text-xs" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PreviewProduct;
