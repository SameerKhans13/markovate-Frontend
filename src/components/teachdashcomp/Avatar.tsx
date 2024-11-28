import React from "react";
import Image from "next/image";
import "./Avatar.css";

interface AvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const Avatar = ({
  src,
  alt,
  fallback,
  size = "md",
  children,
}: AvatarProps) => {
  return (
    <div className={`avatar ${size}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          className="avatar-image"
          width={100}
          height={100}
        />
      ) : (
        <span className="avatar-fallback">{fallback}</span>
      )}
    </div>
  );
};

interface AvatarFallbackProps {
  children: React.ReactNode;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({ children }) => {
  return <span className="avatar-fallback-text">{children}</span>;
};

interface AvatarImageProps {
  src: string;
  alt: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} className="avatar-image" />;
};
