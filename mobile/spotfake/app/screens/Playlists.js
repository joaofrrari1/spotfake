
const React, { useEffect, useState } = 'react'
const {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
} = 'react-native'
const Icon = 'react-native-vector-icons/MaterialIcons'
const api = '../../constants/api'

const Playlists = ({ navigation }) => {
    const [playlists, setPlaylists] = useState([])
    const [newPlaylistName, setNewPlaylistName] = useState('')
    const fadeAnim = new Animated.Value(0) // Animation for fade-in effect

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const response = await api.get('/playlists')
                setPlaylists(response.data)
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start()
            } catch (error) {
                console.error('Error fetching playlists:', error)
            }
        }
        fetchPlaylists()
    }, [])

    const createPlaylist = async () => {
        if (!newPlaylistName) return

        try {
            const response = await api.post('/playlists', {
                name: newPlaylistName,
                ownerId: 1, // Simulated user ID for simplicity
            })
            setPlaylists([...playlists, response.data])
            setNewPlaylistName('')
        } catch (error) {
            console.error('Error creating playlist:', error)
        }
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.header}>
                <Icon name="playlist-play" size={24} /> Playlists
            </Text>
            <FlatList
                data={playlists}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PlaylistDetails', { playlistId: item.id })}
                        >
                            <Icon name="arrow-forward" size={24} color="#007bff" />
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="New Playlist Name"
                    value={newPlaylistName}
                    onChangeText={setNewPlaylistName}
                />
                <TouchableOpacity style={styles.addButton} onPress={createPlaylist}>
                    <Icon name="add-circle" size={40} color="#007bff" />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    addButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
})

module.exports = Playlists
