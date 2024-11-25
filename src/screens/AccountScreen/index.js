import React, { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Switch, Menu, Divider } from "react-native-paper";
import { AuthContext } from "../../AuthContext";

const AccountScreen = ({ navigation }) => {
    const { handleAuthentication } = useContext(AuthContext);

    const [languagePreference, setLanguagePreference] = useState("English");

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
        console.log("Notifications:", notificationsEnabled ? "Disabled" : "Enabled");
    };

    const [menuVisible, setMenuVisible] = useState(false);
    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);
    const handleLanguageChange = (value) => {
        setLanguagePreference(value);
        closeMenu();
        console.log("Selected Language:", value);
    };

    const handleLogOut = () => {
        handleAuthentication();
        navigation.reset({
            index: 0,
            routes: [{ name: "AuthScreen" }],
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>

            <View style={styles.option}>
                <Text style={styles.optionLabel}>Notifications</Text>
                <Switch
                    value={notificationsEnabled}
                    onValueChange={toggleNotifications}
                    color="#6200EE"
                />
            </View>

            <Divider style={styles.divider} />

            <View style={styles.option}>
                <Text style={styles.optionLabel}>Language</Text>
                <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                        <Button
                            onPress={openMenu}
                            mode="outlined"
                        >
                            {languagePreference}
                        </Button>
                    }
                >
                    <Menu.Item
                        onPress={() => handleLanguageChange("English")}
                        title="English"
                    />
                    <Menu.Item
                        onPress={() => handleLanguageChange("Polish")}
                        title="Polish"
                    />
                    <Menu.Item
                        onPress={() => handleLanguageChange("Spanish")}
                        title="Spanish"
                    />
                </Menu>
            </View>

            <Divider style={styles.divider} />

            <Button mode="outlined" onPress={handleLogOut}>Log Out</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f8f9fa",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
    },
    option: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    optionLabel: {
        fontSize: 18,
        fontWeight: "600",
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 15,
    },
});

export default AccountScreen;
