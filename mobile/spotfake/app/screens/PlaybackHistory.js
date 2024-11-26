
const React, { useEffect, useState } = 'react'
const { View, Text, FlatList, StyleSheet } = 'react-native'
const api = '../../constants/api'

const PlaybackHistory = ({ route }) => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/songs/history', { params: { userId: 1 } }) // Simulated user ID
                setHistory(response.data)
            } catch (error) {
                console.error('Error fetching playback history:', error)
            }
        }
        fetchHistory()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Playback History</Text>
            <FlatList
                data={history}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Text style={styles.timestamp}>Played at: {new Date(item.played_at).toLocaleString()}</Text>
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
        marginBottom: 20,
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    timestamp: {
        fontSize: 12,
        color: '#666',
    },
})

module.exports = PlaybackHistory
