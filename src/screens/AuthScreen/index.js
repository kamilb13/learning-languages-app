import React, {useState, useContext, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from "../../contexts/AuthContext";
import { TextInput, Button} from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';

const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { handleAuthentication, isLogin, setIsLogin, errorMessage } = useContext(AuthContext);
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if(user){
            navigation.navigate('Main');
        }
    }, [user]);

    const handleLogIn = async () => {
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        setLoading(true);
        await handleAuthentication(email, password, navigation);
        setLoading(false);
        setEmail('');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <Text style={styles.headerText}>{isLogin ? 'Logowanie' : 'Rejestracja'}</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                label="Hasło"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <Button mode="contained" onPress={handleLogIn} disabled={loading} loading={loading} style={styles.button}>
                {isLogin ? 'Zaloguj się' : 'Zarejestruj się'}
            </Button>


            <Button mode="text" onPress={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
                {isLogin ? "Nie masz konta? Zarejestruj się" : "Masz już konto? Zaloguj się"}
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        marginTop: 20,
    },
    toggleButton: {
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default AuthScreen;
