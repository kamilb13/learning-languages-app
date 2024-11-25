import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { List, Button, IconButton, Tooltip, Menu } from "react-native-paper";
import {useLessonContext} from "../../LessonContext";

const LessonsScreen = ({ navigation }) => {
    const [lessonStatus, setLessonStatus] = useState({
        "1": "not-started",
        "2": "not-started",
        "3": "not-started",
        "4": "not-started",
    });

    const lessons = [
        {
            id: "1",
            name: "Greetings",
            tasks: [
                "Introduce yourself in English.",
                "Say 'Hello' and 'Goodbye'.",
                "Learn the basic greetings like 'How are you?'"
            ]
        },
        {
            id: "2",
            name: "Numbers",
            tasks: [
                "Count from 1 to 20 in English.",
                "Practice numbers 21-50.",
                "Write the numbers from 1 to 10 in words."
            ]
        },
        {
            id: "3",
            name: "Colors",
            tasks: [
                "Learn the names of common colors.",
                "Match colors with their names.",
                "Describe your favorite color in English."
            ]
        },
        {
            id: "4",
            name: "Basic Phrases",
            tasks: [
                "Learn how to ask 'How are you?' and respond.",
                "Practice ordering food at a restaurant.",
                "Learn how to say 'Thank you' and 'You're welcome'."
            ]
        },
        {
            id: "5",
            name: "Food and Drink",
            tasks: [
                "Learn vocabulary related to food and drink.",
                "Describe what you like to eat and drink.",
                "Practice ordering food in a restaurant."
            ]
        },
        {
            id: "6",
            name: "Travel Vocabulary",
            tasks: [
                "Learn words related to travel (e.g. airport, hotel, passport).",
                "Learn how to ask for directions.",
                "Practice booking a hotel room in English."
            ]
        },
        {
            id: "7",
            name: "Common Phrasal Verbs",
            tasks: [
                "Learn 5 common phrasal verbs and use them in sentences.",
                "Practice using phrasal verbs in context.",
                "Match the phrasal verbs with their meanings."
            ]
        },
        {
            id: "8",
            name: "Shopping",
            tasks: [
                "Learn vocabulary related to shopping.",
                "Practice asking for prices in a store.",
                "Learn how to make a complaint in English."
            ]
        },
    ];

    const { completeLesson } = useLessonContext();
    const statuses = ["not-started", "in-progress", "completed"];
    const [menuVisible, setMenuVisible] = useState({});

    const openMenu = (lessonId) => {
        setMenuVisible((prev) => ({ ...prev, [lessonId]: true }));
    };

    const closeMenu = (lessonId) => {
        setMenuVisible((prev) => ({ ...prev, [lessonId]: false }));
    };

    const handleStatusChange = (lessonId, newStatus) => {
        setLessonStatus((prevStatus) => ({
            ...prevStatus,
            [lessonId]: newStatus,
        }));
        if (newStatus === "completed") {
            completeLesson(lessonId);
        }

        closeMenu(lessonId);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return "check-circle";
            case "in-progress":
                return "progress-clock";
            case "not-started":
            default:
                return "circle-outline";
        }
    };
    // console.log(menuVisible);
    return (
        <View style={styles.container}>
            <List.Section>
                {lessons.map((lesson) => (
                    <List.Item
                        key={lesson.id}
                        title={lesson.name}
                        description={`Lesson ID: ${lesson.id}`}
                        left={() => (
                            <Menu
                                visible={menuVisible[lesson.id]}
                                onDismiss={() => closeMenu(lesson.id)}
                                anchor={
                                    // <Tooltip title={`Status: ${lessonStatus[lesson.id]}`}>
                                    <IconButton
                                        icon={getStatusIcon(lessonStatus[lesson.id])}
                                        iconColor={
                                        lessonStatus[lesson.id] === "completed"
                                            ? "green"
                                            : lessonStatus[lesson.id] === "in-progress"
                                                ? "orange"
                                                : "gray"
                                    }
                                        onPress={() => openMenu(lesson.id)}
                                    />
                                    // </Tooltip>
                                }
                            >
                                {statuses.map((status) => (
                                    <Menu.Item
                                        key={status}
                                        onPress={() => handleStatusChange(lesson.id, status)}
                                        title={status.replace("-", " ").toUpperCase()}
                                    />
                                ))}
                            </Menu>
                        )}
                        right={() => (
                            <Button
                                mode="contained"
                                onPress={() =>
                                    navigation.navigate("LessonDetail", { lesson })
                                }
                                style={styles.startButton}
                            >
                                Start
                            </Button>
                        )}
                    />
                ))}
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    startButton: {
        justifyContent: "center",
    },
});

export default LessonsScreen;
