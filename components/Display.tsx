import React from 'react';

interface DisplayProps {
  value: string; 
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div>
      {value}
    </div>
  );
};

export default Display;
