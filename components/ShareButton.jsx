"use client"
import React, { useState } from 'react';
import { FaShareAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaRedditAlien } from 'react-icons/fa';

const ShareButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const shareOptions = [
    { icon: <FaFacebook />, url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { icon: <FaTwitter />, url: 'https://twitter.com/intent/tweet?url=' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
    { icon: <FaWhatsapp />, url: 'https://wa.me/?text=' },
    { icon: <FaRedditAlien />, url: 'https://reddit.com/submit?url=' },
  ];

  return (
    <div className="relative inline-block">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        onClick={handleShareClick}
      >
        <FaShareAlt />
      </button>
      {isOpen && (
        <div className="absolute left- mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {shareOptions.map((option, index) => (
              <a
                key={index}
                href={`${option.url}${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                role="menuitem"
              >
                {option.icon}
                <span className="ml-2">{option.url.split('/')[2]}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;