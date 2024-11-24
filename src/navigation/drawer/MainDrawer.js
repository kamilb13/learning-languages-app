import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Index from "../../screens/DashboardScreen";
import LessonsScreen from "../../screens/LessonsScreen";
import ExercisesScreen from "../../screens/ExercisesScreen";
import AccountScreen from "../../screens/AccountScreen";

const Drawer = createDrawerNavigator();


const MainDrawer = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={Index} />
            <Drawer.Screen name="Lessons" component={LessonsScreen} />
            <Drawer.Screen name="Exercises" component={ExercisesScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;