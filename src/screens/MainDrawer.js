import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from "./DashboardScreen";
import LessonsScreen from "./LessonsScreen";
import ExercisesScreen from "./ExercisesScreen";
import AccountScreen from "./AccountScreen";

const Drawer = createDrawerNavigator();


function MainDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={DashboardScreen} />
            <Drawer.Screen name="Lessons" component={LessonsScreen} />
            <Drawer.Screen name="Exercises" component={ExercisesScreen} />
            <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;