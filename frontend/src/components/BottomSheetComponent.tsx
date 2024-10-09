import React, { useRef, ReactNode } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

type BottomSheetComponentProps = {
  content: ReactNode;
  snapPoints?: string[];
  button: ReactNode;
  actionButtonStyle?: object;
  contentContainerStyle?: object;
  onOpen?: () => void;
};

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  content,
  snapPoints = ["60%"],
  button,
  actionButtonStyle,
  contentContainerStyle,
  onOpen,
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
          {content}
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
