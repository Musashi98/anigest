import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Switch, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const SWITCH_WIDTH = SCREEN_WIDTH / 7;
const SWITCH_HEIGHT = SCREEN_HEIGHT / 5;

const themes = [
    {
        name: 'light',
        backgroundColor: '#ddd',
        switchContainerColor: 'rgb(225, 225, 255)',
        switchTogglerColor: 'rgb(80, 130, 180)',
        switchExteriorColor: '#bbb'
    },
    {
        name: 'dark',
        backgroundColor: '#444',
        switchContainerColor: 'rgb(150, 200, 250)',
        switchTogglerColor: 'rgb(80, 130, 180)',
        switchExteriorColor: '#666'
    }
]

function ThemeSwitcher() {
    const activeTheme = useSharedValue(0)

    const [darkActivated, setDarkActivated] = useState(false)

    useEffect(() => {
        activeTheme.value = darkActivated ? 1 : 0
    }, [darkActivated])

    const globalContainerAnimatedStyle = useAnimatedStyle(() => {
        
        const backgroundColor = interpolateColor(activeTheme.value, [0, 1], [themes[0].backgroundColor, themes[1].backgroundColor])

        return {backgroundColor: withTiming(backgroundColor)} 
    })

    const switchContainerAnimatedStyle = useAnimatedStyle(() => {
        
        const backgroundColor = interpolateColor(activeTheme.value, [0, 1], [themes[0].switchContainerColor, themes[1].switchContainerColor])

        return {backgroundColor: withTiming(backgroundColor)} 
    })

    const switchTogglerAnimatedStyle = useAnimatedStyle(() => {

        const backgroundColor = interpolateColor(activeTheme.value, [0, 1], [themes[0].switchTogglerColor, themes[1].switchTogglerColor])

        return (
        {
            backgroundColor: withTiming(backgroundColor),
            top: (activeTheme.value === 0) ? withTiming(-SWITCH_HEIGHT / 4) : withTiming(SWITCH_HEIGHT / 4)
        })
    })

    const switchExteriorAnimatedStyle = useAnimatedStyle(() => {
        
        const backgroundColor = interpolateColor(activeTheme.value, [0, 1], [themes[0].switchExteriorColor, themes[1].switchExteriorColor])

        return {backgroundColor: withTiming(backgroundColor)} 
    })

    return ( 
    <Animated.View style={[styles.globalContainer, globalContainerAnimatedStyle]}>
        <Animated.View style={[styles.switchExterior, switchExteriorAnimatedStyle]}>
            <TouchableOpacity onPress={() => {setDarkActivated(!darkActivated)}}>
                <Animated.View style={[styles.switchContainer, switchContainerAnimatedStyle]}>
                    <Animated.View style={[styles.switchToggler, switchTogglerAnimatedStyle]} />
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    </Animated.View> );
}

const styles = StyleSheet.create({
    globalContainer: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchExterior: {
        width: SWITCH_WIDTH * 3,
        height: SWITCH_HEIGHT * 2,
        borderRadius: 20,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchContainer: {
        width: SWITCH_WIDTH,
        height: SWITCH_HEIGHT,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    switchToggler: {
        width: SWITCH_WIDTH,
        height: SWITCH_HEIGHT / 2,
        borderRadius: 40
    }
})

export default ThemeSwitcher;