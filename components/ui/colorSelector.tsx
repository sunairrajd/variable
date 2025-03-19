import React, { useState } from 'react';
import '../../styles/colorSelector.css';




const ColorSelector = ({ colors, initialColor, onColorSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor || colors[0]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    onColorSelect(color);
    setIsExpanded(false);
  };

  return (
    <div className="color-selector">
      {isExpanded && (
        <div className="color-options color-options-up">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`color-option ${color.id === selectedColor.id ? 'active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorSelect(color)}
            />
          ))}
        </div>
      )}
      
      <div className="selected-color-container">
        <div 
          className="selected-color" 
          style={{ backgroundColor: selectedColor.hex }}
          onClick={toggleExpand}
        >
          <div className={`arrow ${isExpanded ? 'down' : 'up'}`}></div>
        </div>
        <span className="color-name">{selectedColor.name}</span>
      </div>
    </div>
  );
};

export default ColorSelector;