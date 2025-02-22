import React from 'react';

interface SongSearchCardProps {
  title: string;
  artist: string;
  image: string | null;
}

const SongSearchCard: React.FC<SongSearchCardProps> = ({ title = 'Unknown Title', artist = 'Unknown Artist', image = null, onClick }) => {
  return (
    <div  className="song-search-card block flex my-2 p-4 border items-center shadow-sm rounded-sm cursor-pointer" onClick={onClick}  >
      
      {image ? (
        <img src={image} alt={`${title} cover`} className="w-12 h-12 object-cover rounded-sm mr-4 inline-block" />
      ) : (
        <div className="placeholder-image">No Image Available</div>
      )}
      <div className="inline-block  justify-center">
        <h3 className="text-sm text-gray-700 geist-400">{title}</h3>
        <p className="text-sm text-gray-700">{artist}</p>
  
      </div>
      <hr className=" border border-gray-100" />
    </div>
  );
};

export default SongSearchCard;
