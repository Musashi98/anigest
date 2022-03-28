import { StyleSheet, View } from "react-native";
import MainComponent from "./components/MainComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <MainComponent />
      </View>
    </GestureHandlerRootView>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  }
});
