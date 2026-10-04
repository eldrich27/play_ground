import { useState } from "react";
import styles from "./Avatar.module.css";

interface AvatarProps {
  name: string;
  src?: string;
  // Diameter in rem
  size?: number;
}

// "Jack Smith" -> "JS"
function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

// Shows the user's picture, or their initials if there's none or it fails to load
function Avatar({ name, src, size = 4 }: AvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | undefined>();
  const style = { width: `${size}rem`, height: `${size}rem`, fontSize: `${size * 0.35}rem` };

  if (src && failedSrc !== src) {
    return (
      <img
        className={styles.avatar}
        style={style}
        src={src}
        alt={name}
        onError={() => setFailedSrc(src)}
      />
    );
  }

  return (
    <span className={`${styles.avatar} ${styles.initials}`} style={style} role="img" aria-label={name}>
      {getInitials(name)}
    </span>
  );
}

export default Avatar;
