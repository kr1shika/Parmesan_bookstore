import React, { useState, useRef, useEffect } from 'react';
import searchButtonIcon from '../parmasan_icons/search_button.svg';

// Props interface
interface ResponsiveSearchBarProps {
  alwaysExpanded?: boolean;
}

// Update the component to accept ResponsiveSearchBarProps
const ResponsiveSearchBar: React.FC<ResponsiveSearchBarProps> = ({ alwaysExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  const toggleSearchBar = () => setIsExpanded(!isExpanded);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center space-x-2 w-full" ref={searchBarRef}>
      {(isExpanded || alwaysExpanded) ? (
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 ease-out md:w-96 lg:w-128"
          autoFocus
        />

      ) : (
        <button
          onClick={toggleSearchBar}
          className="flex items-center justify-center p-2 rounded-full text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <img src={searchButtonIcon} alt="Search" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ResponsiveSearchBar;
