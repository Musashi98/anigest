import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { interpolate, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const BALL_SIZE = Dimensions.get('screen').width / 5

function BallsMove() {
    const redBallPosition = useSharedValue({x: 0, y: 0})
    const greenBallPosition = useSharedValue({x: 0, y: 0})
    const blueBallPosition = useSharedValue({x: 0, y: 0})
    const previousPosition = useSharedValue({x: 0, y: 0})

    const ballsGestureHandler = useAnimatedGestureHandler({
        onStart: () => {
            previousPosition.value = {x: redBallPosition.value.x, y: redBallPosition.value.y}
        },
        onActive: (event) => {
            redBallPosition.value = {
                x: previousPosition.value.x + event.translationX,
                y: previousPosition.value.y + event.translationY
            }
        },
        onEnd: () => {
            redBallPosition.value = {
                x: 0,
                y: 0
            }
        }
    })

    const redBallAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{translateX: withSpring(redBallPosition.value.x)}, {translateY: withSpring(redBallPosition.value.y)}]
    }))

    const greenBallAnimatedStyle = useAnimatedStyle(() => {
        greenBallPosition.value = {x: redBallPosition.value.x, y: redBallPosition.value.y}
        return {
            transform: [{translateX: withSpring(greenBallPosition.value.x, {mass: 1.5})}, {translateY: withSpring(greenBallPosition.value.y, {mass: 1.5})}]
        }
    })

    const blueBallAnimatedStyle = useAnimatedStyle(() => {
        blueBallPosition.value = {x: greenBallPosition.value.x, y: greenBallPosition.value.y}
        return {
            transform: [{translateX: withSpring(blueBallPosition.value.x, {mass: 2})}, {translateY: withSpring(blueBallPosition.value.y, {mass: 2})}]
        }
    })

    const yellowBallAnimatedStyle = useAnimatedStyle(() => {
        const yellowBallPosition = {x: greenBallPosition.value.x, y: greenBallPosition.value.y}
        return {
            transform: [{translateX: withSpring(yellowBallPosition.x, {mass: 2.5})}, {translateY: withSpring(yellowBallPosition.y, {mass: 2.5})}]
        }
    })

    return (
        <View>
            <Animated.View style={[styles.ball, styles.yellowBall, yellowBallAnimatedStyle]} />
            <Animated.View style={[styles.ball, styles.blueBall, blueBallAnimatedStyle]} />
            <Animated.View style={[styles.ball, styles.greenBall, greenBallAnimatedStyle]} />
            <PanGestureHandler onGestureEvent={ballsGestureHandler}>
                <Animated.View style={[styles.ball, styles.redBall, redBallAnimatedStyle]} />
            </PanGestureHandler>
        </View>
     );
}

const styles = StyleSheet.create({
    ball: {
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2
    },
    redBall: {
        position: 'absolute',
        backgroundColor: 'rgb(255, 100, 100)',
    },
    greenBall: {
        position: 'absolute',
        backgroundColor: 'rgb(100, 255, 100)',
    },
    blueBall: {
        position: 'absolute',
        backgroundColor: 'rgb(100, 100, 255)',
    },
    yellowBall: {
        backgroundColor: 'rgb(255, 255, 100)',
    }
})

export default BallsMove;