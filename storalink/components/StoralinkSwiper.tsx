import React, { useRef, useState } from 'react';
import { ScrollView, View, Dimensions, StyleProp, ViewStyle, Animated } from 'react-native';

type StoralinkSwiperProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onCardScolled?: (direction: string) => void;
};

const StoralinkSwiper: React.FC<StoralinkSwiperProps> = ({ children, style, onCardScolled }) => {
  const scrollViewRef = useRef(null);
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.78;
  const offset = (width - cardWidth) / 2;
  const [scrollX] = useState(new Animated.Value(0));
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [initialCardIndex, setInitialCardIndex] = useState(0); // New state

  const handleScrollBeginDrag = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(scrollPosition / cardWidth);
    setInitialCardIndex(cardIndex);
  };

  const handleScrollEndDrag = (event) => {
    const currentScrollPosition = event.nativeEvent.contentOffset.x;
    const cardIndex = Math.round(currentScrollPosition / (cardWidth + 10));
  const snapTo = (cardIndex * cardWidth) + (cardIndex * 10); // 10 is marginEnd value

    const totalCards = React.Children.count(children);
  
    if (cardIndex !== initialCardIndex) {
      const direction = currentScrollPosition > initialCardIndex * cardWidth ? 'right' : 'left';
      onCardScolled?.(direction);
    }
  
    // Check if the user is at the first or last card
    if (cardIndex >= 0 && cardIndex < totalCards) {
      scrollViewRef.current.scrollTo({ x: snapTo, animated: true });
    }
  };
  

  return (
    <Animated.ScrollView
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: offset }}
      snapToInterval={cardWidth}
      snapToAlignment="center"
      style={style}
      onScrollBeginDrag={handleScrollBeginDrag} // Added this line
      onScrollEndDrag={handleScrollEndDrag}
      scrollEventThrottle={16}
    >
      {React.Children.map(children, (child, index) => (
        <View style={{ width: cardWidth, marginEnd: 10 }}>
          {child}
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default StoralinkSwiper;
