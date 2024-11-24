import React from "react";
import AuthScreen from "../../screens/AuthScreen";
import MainDrawer from "../drawer/MainDrawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const options = {
    headerShown: false
}

const StackNav = () => {
    return (
        <Stack.Navigator initialRouteName="AuthScreen">
            <Stack.Screen name="AuthScreen" component={AuthScreen} options={options} />
            <Stack.Screen name="Main" component={MainDrawer} options={options} />
        </Stack.Navigator>
    );
}

export default MainDrawer;