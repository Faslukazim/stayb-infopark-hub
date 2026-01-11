export interface CompressionOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  aspectRatio: '1:1' | '4:5';
}

export const compressImage = (
  file: File,
  options: CompressionOptions
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    img.onload = () => {
      // Calculate target dimensions based on aspect ratio
      const targetRatio = options.aspectRatio === '1:1' ? 1 : 4 / 5;
      
      let sourceX = 0;
      let sourceY = 0;
      let sourceWidth = img.width;
      let sourceHeight = img.height;
      
      const imageRatio = img.width / img.height;
      
      // Crop to target aspect ratio (center crop)
      if (imageRatio > targetRatio) {
        // Image is wider than target
        sourceWidth = img.height * targetRatio;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        // Image is taller than target
        sourceHeight = img.width / targetRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }
      
      // Calculate output dimensions
      let outputWidth = options.maxWidth;
      let outputHeight = options.aspectRatio === '1:1' 
        ? options.maxWidth 
        : Math.round(options.maxWidth * (5 / 4));
      
      // Scale down if source is smaller
      if (sourceWidth < outputWidth) {
        outputWidth = sourceWidth;
        outputHeight = options.aspectRatio === '1:1' 
          ? outputWidth 
          : Math.round(outputWidth * (5 / 4));
      }
      
      canvas.width = outputWidth;
      canvas.height = outputHeight;
      
      // Draw with high quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      
      ctx.drawImage(
        img,
        sourceX, sourceY, sourceWidth, sourceHeight,
        0, 0, outputWidth, outputHeight
      );
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not compress image'));
          }
        },
        'image/jpeg',
        options.quality
      );
    };

    img.onerror = () => reject(new Error('Could not load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = URL.createObjectURL(file);
  });
};
