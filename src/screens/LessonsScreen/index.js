import React, {useState} from "react";
import {View, StyleSheet} from "react-native";
import {List, Button, IconButton, Tooltip, Menu} from "react-native-paper";
import {useLessonContext} from "../../LessonContext";

const LessonsScreen = ({navigation}) => {
    const { lessonStatus, setLessonStatus, lessons } = useLessonContext(); // funkcja dodajaca lekcje do ukonczonych w context

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

    return (
        <View style={styles.container}>
            <List.Section>
                {lessons.map((lesson) => (
                    <List.Item
                        key={lesson.id}
                        title={lesson.name}
                        description={`Lesson ID: ${lesson.id}`}
                        left={() => (
                            <IconButton
                                icon={getStatusIcon(lessonStatus[lesson.id])}
                                iconColor={
                                    lessonStatus[lesson.id] === "completed"
                                        ? "green"
                                        : lessonStatus[lesson.id] === "in-progress"
                                            ? "orange"
                                            : "gray"
                                }
                            />
                        )}
                        right={() => (
                            <Button
                                mode="contained"
                                onPress={() => {
                                    navigation.navigate("LessonDetail", {lesson});
                                    setLessonStatus((prevStatus) => ({
                                        ...prevStatus,
                                        [lesson.id]: "in-progress"
                                    }))   // lesson.id + 1
                                }}
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
