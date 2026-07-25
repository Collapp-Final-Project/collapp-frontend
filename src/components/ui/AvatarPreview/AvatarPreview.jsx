import { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import './AvatarPreview.scss';

export const AvatarPreview = ({ src }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showImage = src && !hasError;

  return (
    <div className="avatar-preview">
      {showImage ? (
        <img
          src={src}
          alt="Vista previa de tu foto de perfil"
          className="avatar-preview-image"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="avatar-preview-placeholder" aria-hidden="true">
          <ImageIcon size={28} />
        </div>
      )}
    </div>
  );
};