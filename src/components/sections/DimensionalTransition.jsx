import React from 'react';

const DimensionalTransition = ({ isActive, children }) => {
  return (
    <div className={`dimensional-transition ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default DimensionalTransition;