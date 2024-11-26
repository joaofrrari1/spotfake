
const React, { useEffect, useState } = 'react'
const {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Button,
} = 'react-native'
const api = '../../constants/api'

const PlaylistDetails = ({ route }) => {
    const { playlistId } = route.params
    const [playlist, setPlaylist] = useState(null)
    const [songs, setSongs] = useState([])
    const [allSongs, setAllSongs] = useState([])

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const playlistRes = await api.get(`/playlists/${playlistId}`)
                const allSongsRes = await api.get('/songs') // Fetch all available songs
                setPlaylist(playlistRes.data.playlist)
                setSongs(playlistRes.data.songs)
                setAllSongs(allSongsRes.data)
            } catch (error) {
                console.error('Error fetching playlist details:', error)
            }
        }
        fetchPlaylistDetails()
    }, [playlistId])

    const modifyPlaylist = async (songId, action) => {
        try {
            await api.put(`/playlists/${playlistId}?action=${action}`, { songId })
            if (action === 'add') {
                setSongs([...songs, allSongs.find((song) => song.id === songId)])
            } else {
                setSongs(songs.filter((song) => song.id !== songId))
            }
        } catch (error) {
            console.error(`Error ${action === 'add' ? 'adding to' : 'removing ='} playlist:`, error)
        }
    }

    if (!playlist) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{playlist.name}</Text>
            <Text style={styles.subHeader}>Songs in Playlist</Text>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Button
                            title="Remove"
                            onPress={() => modifyPlaylist(item.id, 'remove')}
                        />
                    </View>
                )}
            />
            <Text style={styles.subHeader}>Add Songs</Text>
            <FlatList
                data={allSongs.filter(
                    (song) => !songs.some((s) => s.id === song.id)
                )}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Button
                            title="Add"
                            onPress={() => modifyPlaylist(item.id, 'add')}
                        />
                    </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

module.exports = PlaylistDetails
