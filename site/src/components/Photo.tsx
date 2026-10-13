import { useState } from "react";

// Foto com gradiente de fallback caso o arquivo não exista em public/img
export const Photo = ({
  name,
  alt,
  className = "",
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) => {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={`overflow-hidden bg-gradient-to-br from-terracota/70 via-espresso to-hoja/60 ${className}`}
      role="img"
      aria-label={alt}
    >
      {failed ? null : (
        <img
          src={`${import.meta.env.BASE_URL}img/${name}`}
          alt=""
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};
