import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import COLORS from "../constants/colors";

export default function SafeScreen({ children }) {
  let insets = useSafeAreaInsets();
  return (
    <View style={[style.container, { paddingTop: insets.top }]}>
      {children}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
