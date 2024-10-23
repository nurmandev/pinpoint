import React, { useRef, ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

type BottomSheetComponentProps = {
  content: (close: () => void) => ReactNode;
  snapPoints?: string[];
  button: ReactNode;
  actionButtonStyle?: object;
  contentContainerStyle?: object;
  onOpen?: () => void;
  onClose?: () => void;
};

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  content,
  snapPoints = ["60%"],
  button,
  actionButtonStyle,
  contentContainerStyle,
  onOpen,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.present();
      if (onOpen) {
        onOpen();
      }
    }
  };

  const close = () => {
    if (bottomSheetRef) {
      bottomSheetRef.current?.dismiss();
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <>
      <TouchableOpacity style={actionButtonStyle} onPress={openSheet}>
        {button}
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enableOverDrag={false}
        index={0}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView
          style={[styles.contentContainer, contentContainerStyle]}
        >
          {content(close)}
          {/* Call the content function with the close function */}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
    flex: 1,
  },
});

export default BottomSheetComponent;
