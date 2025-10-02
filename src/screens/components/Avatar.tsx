import React from "react";

type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <img
    src={src || "/assets/avatar.png"}
    alt={alt || "Avatar"}
    style={{ width: 40, height: 40, borderRadius: "50%" }}
  />
);

export default Avatar;
