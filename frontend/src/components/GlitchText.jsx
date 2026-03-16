import React from 'react';

const GlitchText = ({ text, className = '', as: Component = 'span' }) => {
  return (
    <Component
      className={`glitch-text ${className}`}
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
