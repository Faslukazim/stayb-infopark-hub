import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PhotoUploaderProps {
  onUpload: (file: File, aspectRatio: '1:1' | '4:5') => Promise<void>;
  disabled?: boolean;
  remainingSlots: number;
}

const PhotoUploader = ({ onUpload, disabled, remainingSlots }: PhotoUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '4:5'>('1:1');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      await onUpload(files[i], aspectRatio);
    }

    // Reset input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  if (disabled || remainingSlots <= 0) return null;

  return (
    <div className="space-y-4">
      {/* Aspect Ratio Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Aspect:</span>
        <div className="flex gap-2">
          <button
            onClick={() => setAspectRatio('1:1')}
            className={cn(
              "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
              aspectRatio === '1:1' 
                ? "bg-foreground text-background" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            1:1
          </button>
          <button
            onClick={() => setAspectRatio('4:5')}
            className={cn(
              "px-3 py-1.5 text-sm rounded-lg transition-all duration-300",
              aspectRatio === '4:5' 
                ? "bg-foreground text-background" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            4:5
          </button>
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={() => inputRef.current?.click()}
        className={cn(
          "w-full aspect-square md:aspect-[4/3] rounded-xl border-2 border-dashed border-border",
          "flex flex-col items-center justify-center gap-3",
          "text-muted-foreground hover:text-foreground hover:border-foreground/30",
          "transition-all duration-500 group"
        )}
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-foreground/10 transition-colors duration-300">
          <Plus className="w-5 h-5" />
        </div>
        <span className="text-sm">
          Add photo ({remainingSlots} remaining)
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default PhotoUploader;
