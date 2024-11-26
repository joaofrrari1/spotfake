
const React, { useEffect, useState } = 'react'
const { View, Text, FlatList, StyleSheet, TouchableOpacity } = 'react-native'
const api = '../../constants/api'
const { Audio } = 'expo-av'

const AlbumDetails = ({ route }) => {
    const { albumId } = route.params
    const [album, setAlbum] = useState(null)
    const [songs, setSongs] = useState([])
    const [audioPlayer, setAudioPlayer] = useState(null)
    const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

    useEffect(() => {
        const fetchAlbumDetails = async () => {
            try {
                const response = await api.get(`/albums/${albumId}`)
                setAlbum(response.data.album)
                setSongs(response.data.songs)
            } catch (error) {
                console.error('Error fetching album details:', error)
            }
        }
        fetchAlbumDetails()

        return () => {
            if (audioPlayer) {
                audioPlayer.unloadAsync()
            }
        }
    }, [albumId])

    const playSong = async (songId) => {
        try {
            if (audioPlayer) {
                await audioPlayer.unloadAsync()
            }
            const response = await api.get(`/songs/${songId}/play`)
            const { audio_url } = response.data

            const newAudioPlayer = new Audio.Sound()
            await newAudioPlayer.loadAsync({ uri: audio_url })
            await newAudioPlayer.playAsync()

            setAudioPlayer(newAudioPlayer)
            setCurrentlyPlaying(songId)
        } catch (error) {
            console.error('Error playing song:', error)
        }
    }

    if (!album) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{album.title}</Text>
            <Text style={styles.subHeader}>Songs</Text>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => playSong(item.id)}
                    >
                        <Text style={currentlyPlaying === item.id ? styles.playing : null}>
                            {item.title} - {item.duration} sec
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
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
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    playing: {
        fontWeight: 'bold',
        color: 'green',
    },
})

module.exports = AlbumDetails
