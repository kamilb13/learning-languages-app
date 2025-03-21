import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import DashboardScreen from "../../screens/DashboardScreen";
import LessonsScreen from "../../screens/LessonsScreen";
import ExercisesScreen from "../../screens/ExercisesScreen";
import AccountScreen from "../../screens/AccountScreen";
import {AuthContext, useAuthContext} from "../../contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useLessonContext} from "../../contexts/LessonContext";
import ExtraLessons from "../../screens/ExtraLessons";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
    const {handleAuthentication} = useAuthContext();

    const handleLogOut = async () => {

        await AsyncStorage.clear();
        handleAuthentication();
        props.navigation.reset({
            index: 0,
            routes: [{name: "AuthScreen"}],
        });
    };

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
            <DrawerItemList {...props} />
            <View style={styles.bottomDrawerSection}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => handleLogOut()}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const MainDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Dashboard" component={DashboardScreen}/>
            <Drawer.Screen name="Lessons" component={LessonsScreen}/>
            <Drawer.Screen name="Exercises" component={ExercisesScreen}/>
            <Drawer.Screen name="Account" component={AccountScreen}/>
            <Drawer.Screen name="ExtraLessons" component={ExtraLessons}/>
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginTop: 'auto',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    logoutButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        alignItems: 'center',
    },
    logoutText: {
        color: '#d9534f',
        fontWeight: 'bold',
    },
});

export default MainDrawer;
