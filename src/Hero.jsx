import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const API = import.meta.env.VITE_APP_API_KEY;
const imagePerPage = 12;

const Hero = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [item, setItem] = useState("random");

  const inputRef = useRef(null);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${API}&query=${item}&page=${page}&per_page=${imagePerPage}`
      );
      setImages((prev) => [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [item, page]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;
      if (bottom && page < totalPages) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value === "") return;
    setImages([]);
    setPage(1);
    setItem(value);
  };

  return (
    <>
      <div className="relative overflow-hidden w-full">
        <div className="flex animate-infinite-scroll whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="inline-block">
              <img
                className="inline-block h-96 w-auto mx-4 object-cover object-center"
                src="https://unsplash.com/assets/api/api-photo-grid@2x-388d83e210e483af53295e6574d71e343557875502b68b56b3cf0e1c0040b440.jpg"
                alt="Scrolling content"
              />
            </div>
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="bg-black/40 text-white border border-white rounded-md w-[300px] md:w-[600px] px-4 py-2 focus:outline-none"
              placeholder="Type here..."
              ref={inputRef}
            />
            <CiSearch
              className="text-2xl text-white absolute top-2 right-5 hover:text-gray-300 cursor-pointer"
              onClick={handleSubmit}
            />
          </form>
        </div>

        <div className="bg-black/40 w-full h-full absolute top-0 left-0 z-10 pointer-events-none"></div>

        <style jsx global>{`
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-infinite-scroll {
            display: inline-block;
            animation: infinite-scroll 40s linear infinite;
            white-space: nowrap;
          }
        `}</style>
      </div>

      <div className="mt-20 px-8">
        <h1 className="text-3xl font-bold">
          Results for {item.charAt(0).toUpperCase() + item.slice(1)}
        </h1>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-8 max-w-[1600px] mx-auto mt-12 px-4">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description}
            className="w-full mb-4 rounded-xl break-inside-avoid transition-transform duration-300 hover:scale-105 cursor-pointer shadow-2xl"
          />
        ))}
      </div>
    </>
  );
};

export default Hero;
