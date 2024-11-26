
const React, { useEffect, useState } = 'react'
const {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} = 'react-native'
const api = '../../constants/api'

const Home = ({ navigation }) => {
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [recommendations, setRecommendations] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState(null)

    useEffect(() => {
        // Fetch initial data for recommendations, artists, and albums
        const fetchData = async () => {
            try {
                const [artistsRes, albumsRes, recommendationsRes] = await Promise.all([
                    api.get('/artists'),
                    api.get('/albums'),
                    api.get('/recommendations'),
                ])
                setArtists(artistsRes.data)
                setAlbums(albumsRes.data)
                setRecommendations(recommendationsRes.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSearchResults(null)
            return
        }

        try {
            const response = await api.get(`/search?q=${searchQuery}`)
            setSearchResults(response.data)
        } catch (error) {
            console.error('Error during search:', error)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for songs, albums, or artists..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
            />
            {searchResults ? (
                <View>
                    <Text style={styles.header}>Search Results</Text>
                    <Text style={styles.subHeader}>Songs</Text>
                    <FlatList
                        data={searchResults.songs}
                        keyExtractor={(item) => `song-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={styles.subHeader}>Albums</Text>
                    <FlatList
                        data={searchResults.albums}
                        keyExtractor={(item) => `album-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() =>
                                    navigation.navigate('AlbumDetails', { albumId: item.id })
                                }
                            >
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={styles.subHeader}>Artists</Text>
                    <FlatList
                        data={searchResults.artists}
                        keyExtractor={(item) => `artist-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <Text>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>Recommendations</Text>
                    <FlatList
                        data={recommendations}
                        keyExtractor={(item) => `rec-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={styles.header}>Artists</Text>
                    <FlatList
                        data={artists}
                        keyExtractor={(item) => `artist-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item}>
                                <Text>{item.nome}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={styles.header}>Albums</Text>
                    <FlatList
                        data={albums}
                        keyExtractor={(item) => `album-${item.id}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() =>
                                    navigation.navigate('AlbumDetails', { albumId: item.id })
                                }
                            >
                                <Text>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
})

module.exports = Home
