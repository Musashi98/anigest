import { View } from "react-native";
import BallsMove from "./BallsMove";
import MovableSquare from "./MovableSquare";
import RotatingTriangle from "./RotatingTriangle";
import ThemeSwitcher from "./ThemeSwitcher";

function MainComponent() {
    return ( 
    <View>
        <RotatingTriangle />
    </View> );
}
 
export default MainComponent;