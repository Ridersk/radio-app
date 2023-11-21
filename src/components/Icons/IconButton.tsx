import { useRef } from "react";
import { View } from "react-native";
import { Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconProps } from "react-native-vector-icons/Icon";

interface IconButtonProps extends IconProps {
  name: string;
  onPress: () => void;
}

const IconButton = ({ name, size, color, onPress, style }: IconButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.4,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    setTimeout(() => onPress(), 400);
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={style}>
      <Animated.View style={animatedStyle}>
        <Icon
          name={name}
          size={size}
          color={color}
          onPress={handlePress}
        />
      </Animated.View>
    </View>
  );
};

export default IconButton;
