import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const CONTAINER_SIZE = Dimensions.get('screen').width * 0.7
const SQUARE_SIZE = CONTAINER_SIZE / 3

function MovableSquare() {
    const xPosition = useSharedValue(0);
    const yPosition = useSharedValue(0);

    const touchPosition = useSharedValue({x: 0, y: 0})

    const squareGestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            touchPosition.value = {x: xPosition.value, y: yPosition.value}
        },
        onActive: (event) => {
            xPosition.value = touchPosition.value.x + event.translationX
            yPosition.value = touchPosition.value.y + event.translationY
        },
        onEnd: () => {
            let distanceToCenter = Math.sqrt(xPosition.value * xPosition.value + yPosition.value * yPosition.value)

            if(distanceToCenter > CONTAINER_SIZE / 2){
                xPosition.value = withSpring(0);
                yPosition.value = withSpring(0);
            }
        }
    })

    const squareAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: xPosition.value}, {translateY: yPosition.value}]
    }))

    return (
        <View style={styles.circleContainer}>
            <PanGestureHandler onGestureEvent={squareGestureHandler}>
                <Animated.View style={[styles.square, squareAnimatedStyle]} />
            </PanGestureHandler>            
        </View>)  
}

const styles = StyleSheet.create({
    circleContainer: {
        width: CONTAINER_SIZE,
        height: CONTAINER_SIZE,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgba(100, 120, 150, 0.5)',
        borderRadius: CONTAINER_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    square: {
        width: SQUARE_SIZE,
        height: SQUARE_SIZE,
        backgroundColor: 'rgb(100, 120, 150)',
        borderRadius: 10
    }
})

export default MovableSquare;