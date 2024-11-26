
const React, { useState } = 'react'
const {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Modal,
    TouchableOpacity,
} = 'react-native'
const api = '../../constants/api'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    const handleLogin = async () => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const user = response.data.user
            setCurrentUser(user)
            if (!user.is_subscriber) {
                setModalVisible(true)
            } else {
                Alert.alert('Login successful', `Welcome back, ${user.name}!`)
                navigation.replace('Home')
            }
        } catch (error) {
            Alert.alert('Login failed', error.response?.data?.error || 'Something went wrong')
        }
    }

    const handleSubscribe = async () => {
        try {
            await api.put('/auth/subscription', { userId: currentUser.id, isSubscriber: true })
            setModalVisible(false)
            Alert.alert('Subscription successful', 'You are now a subscriber!')
            navigation.replace('Home')
        } catch (error) {
            Alert.alert('Subscription failed', error.response?.data?.error || 'Something went wrong')
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
                color="gray"
            />
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Subscribe to Premium</Text>
                        <Text style={styles.modalText}>Unlock all features with a premium subscription!</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={handleSubscribe}>
                            <Text style={styles.modalButtonText}>Subscribe Now</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, { backgroundColor: 'red' }]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

module.exports = Login
