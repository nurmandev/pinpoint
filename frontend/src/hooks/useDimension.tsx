import { useWindowDimensions } from "react-native";

const useDimensions = () => {
  const { width, height } = useWindowDimensions();

  // Define a breakpoint for mobile devices (768px or lower)
  const isMobile = width <= 768;

  return { width, height, isMobile };
};

export default useDimensions;
