import React, { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostImage = ({ image, handleLike, isLiked }) => {
  const heartRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleDBClick = () => {
    if (heartRef.current) {
      heartRef.current.classList.add("heart-animation");

      setTimeout(() => {
        heartRef.current.classList.remove("heart-animation");
      }, 1000);

      if (!isLiked) {
        handleLike();
      }
    }
  };

  return (
    <div onDoubleClick={handleDBClick} className="relative">
      {!isLoaded && !hasError && (
        <img src="/public/default/fallback-img.png" className="w-full object-cover max-h-[1000px]" />
      )}

      {!hasError && (
        <img
          src={image}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
          className="w-full object-cover max-h-[1000px]"
        />
      )}

      { hasError &&
        (<img
          src='/public/default/fallback-img.png'
          className="w-full object-cover max-h-[1000px]"
        />)
      }

      <div
        ref={heartRef}
        className="hidden absolute z-10 transform left-1/2 top-1/2  -translate-1/2"
      >
        <FaHeart className={`w-full h-full text-red-500`} />
      </div>
    </div>
  );
};

export default PostImage;
