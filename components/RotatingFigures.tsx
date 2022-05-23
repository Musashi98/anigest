import { Dimensions, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const { width, height } = Dimensions.get('screen');

const SHAPE_SIDE = Math.min(0.6 * width, 0.6 * height);

const shapeStates = [
    {
        backgroundColor: 'rgba(100, 255, 100, 0.8)',
        borderRadius: 20,
        border: 0,
        extraRotation: 0
    },
    {
        backgroundColor: 'rgba(255, 100, 100, 0.8)',
        borderRadius: SHAPE_SIDE / 2,
        border: 0,
        extraRotation: 0
    },
    {
        backgroundColor: 'rgba(255, 200, 50, 0.8)',
        borderRadius: 20,
        border: 0,
        extraRotation: 45
    },
    {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 0,
        border: SHAPE_SIDE / 2,
        extraRotation: 0
    },
]

function RotatingFigures() {
    const shapeIndex = useSharedValue(0)
    const shapeRadius = useSharedValue(20)
    const shapeRotation = useSharedValue(0)
    const shapeBorders = useSharedValue(0)

    const shapeAnimatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(shapeIndex.value, [0, 1, 2, 3], [shapeStates[0].backgroundColor, shapeStates[1].backgroundColor, shapeStates[2].backgroundColor, shapeStates[3].backgroundColor])
        const borderBottomColor = interpolateColor(shapeIndex.value, [0, 1, 2, 3], ['transparent', 'transparent', 'transparent', 'rgba(100, 100, 255, 0.8)'])

        return {
            backgroundColor: backgroundColor,
            borderRadius: shapeRadius.value,
            transform: [{rotate: `${shapeRotation.value + shapeStates[shapeIndex.value].extraRotation}deg`}],
            borderLeftWidth: shapeBorders.value,
            borderRightWidth: shapeBorders.value,
            borderBottomWidth: shapeBorders.value * 2,
            borderBottomColor
        }
    })

    const changeShapeHandler = () => {
        shapeIndex.value = (shapeIndex.value + 1) % shapeStates.length
        shapeRadius.value = withTiming(shapeStates[shapeIndex.value].borderRadius)
        shapeRotation.value = withTiming(shapeRotation.value + 180)
        shapeBorders.value = withTiming(shapeStates[shapeIndex.value].border)
    }

    return (
        <TouchableWithoutFeedback onPress={changeShapeHandler}>
            <Animated.View style={[styles.triangle, shapeAnimatedStyle]} />
        </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create({
    triangle: {
      width: SHAPE_SIDE,
      height: SHAPE_SIDE,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent'
    }
})

export default RotatingFigures;