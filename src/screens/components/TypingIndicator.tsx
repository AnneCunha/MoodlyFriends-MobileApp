import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

// Este componente agora usa a API Animated do React Native para criar os pontos piscando
const TypingIndicator: React.FC = () => {
  const animations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const animateDots = () => {
    const createAnimation = (dot: Animated.Value) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
        ])
      );
    };

    const staggeredAnimations = animations.map((dot, index) => {
      return Animated.sequence([
        Animated.delay(index * 150),
        createAnimation(dot)
      ]);
    });

    Animated.parallel(staggeredAnimations).start();
  };

  useEffect(() => {
    animateDots();
  }, []);

  const dotStyles = animations.map(animation => ({
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dotStyles[0]]} />
      <Animated.View style={[styles.dot, dotStyles[1]]} />
      <Animated.View style={[styles.dot, dotStyles[2]]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 3,
  },
});

export default TypingIndicator;