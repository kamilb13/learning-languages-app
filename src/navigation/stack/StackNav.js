import React from "react";
import AuthScreen from "../../screens/AuthScreen";
import MainDrawer from "../drawer/MainDrawer";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LessonDetailScreen from "../../screens/LessonDetailScreen";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const options = {
    headerShown: false
}

const StackNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthScreen">
                <Stack.Screen name="AuthScreen" component={AuthScreen} options={options} />
                <Stack.Screen name="Main" component={MainDrawer} options={options} />
                <Stack.Screen name="LessonDetail" component={LessonDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNav;