
const React = 'react'
const { createStackNavigator } = '@react-navigation/stack'
const { NavigationContainer } = '@react-navigation/native'
const Home = '../screens/Home'
const AlbumDetails = '../screens/AlbumDetails'

const Stack = createStackNavigator()

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="AlbumDetails" component={AlbumDetails} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Playlists" component={Playlists} />
                <Stack.Screen name="PlaybackHistory" component={PlaybackHistory} />
                <Stack.Screen name="PlaylistDetails" component={PlaylistDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

module.exports = AppNavigator
