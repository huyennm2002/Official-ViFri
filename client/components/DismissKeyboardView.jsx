import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DismissKeyboardHOC = (Comp) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};
const DismissKeyboardView = DismissKeyboardHOC(SafeAreaView)
export default DismissKeyboardView;