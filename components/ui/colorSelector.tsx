'use client'

import React, { useState } from 'react';
import '../../styles/colorSelector.css';

// Define the type for a color object
interface Color {
  id: number;
  name: string;
  hex: string;
}

// Define the props interface for the ColorSelector component
interface ColorSelectorProps {
  colors: Color[];
  initialColor?: Color;
  onColorSelect: (color: Color) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colors, initialColor, onColorSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(initialColor || colors[0]);

  const handleColorClick = (color: Color) => {
    setSelectedColor(color);
    onColorSelect(color);
    setIsExpanded(false);
  };

  return (
    <div className="color-selector">
      <div className="selected-color-container">
        <div 
          className="selected-color" 
          style={{ backgroundColor: selectedColor.hex }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`arrow ${isExpanded ? 'up' : 'down'}`}></div>
        </div>
        <div className="color-name">{selectedColor.name}</div>
      </div>
      
      {isExpanded && (
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color.id}
              className={`color-option ${color.id === selectedColor.id ? 'active' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorClick(color)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;