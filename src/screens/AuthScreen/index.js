import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {AuthContext} from "../../AuthContext";

const AuthScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {handleAuthentication, isLogin, setIsLogin, errorMessage} = useContext(AuthContext);

    const handleLogIn  = () => {
        console.log(navigation)
        handleAuthentication(email, password, navigation);
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <Text>{isLogin ? 'Logowanie' : 'Rejestracja'}</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, width: '80%', marginVertical: 10 }}
            />

            <TextInput
                placeholder="Hasło"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, width: '80%', marginVertical: 10 }}
            />


            <Button
                title={isLogin ? "Logowanie ": "Rejestracja"}
                onPress={handleLogIn} />
            <Button
                title={isLogin ? "Potrzebujesz sie zarejestrowac": "Potrzebujesz sie zalogowac "}
                onPress={() => setIsLogin(!isLogin)}/>

        </View>
    );
}

export default AuthScreen;