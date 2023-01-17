import React, { useRef, useEffect } from 'react';

function MetaDataImage({ attributes }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Draw the image here using the attributes and the canvas API
    // Example:
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(10, 10, 150, 100);
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText(`Trait Type: ${attributes[0].trait_type}`, 20, 50);
    ctx.fillText(`Value: ${attributes[0].value}`, 20, 80);
    ctx.fillText(`Max Value: ${attributes[0].max_value}`, 20, 110);
  }, [attributes]);

  return <canvas ref={canvasRef} width={200} height={200} />;
}

export default MetaDataImage;
