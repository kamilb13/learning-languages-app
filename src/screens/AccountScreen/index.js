import {Button, Text, View} from 'react-native';
import {useContext} from "react";
import {AuthContext} from "../../AuthContext";

const AccountScreen = ({ navigation }) => {
    const { handleAuthentication } = useContext(AuthContext);
    const handleLogOut = () => {
        handleAuthentication();
        navigation.reset({
            index: 0,
            routes: [{name: 'AuthScreen'}],
        })
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>AccountScreen</Text>
            <Button title={"Wyloguj"} onPress={handleLogOut}/>
        </View>
    );
}

export default AccountScreen;