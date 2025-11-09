import React from "react";
import { Image, StyleSheet } from "react-native";

type AvatarProps = {
  src?: string;
  alt?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <Image
    // Em React Native, imagens locais usam require(), e o caminho deve ser relativo ao App.tsx
    source={src ? { uri: src } : require("../../../assets/icon.png")}
    style={styles.avatar}
  />
);

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});