import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {useLessonContext} from "../../LessonContext";
import {Button} from "react-native-paper";

const LessonDetailScreen = ({ route, navigation }) => {
    const lessonId = route.params.lesson.id;
    const tasks = route.params.lesson.tasks;
    const name = route.params.lesson.name;

    const {setLessonStatus} = useLessonContext();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Numer lekcji: {lessonId}</Text>
            <Text style={styles.text}>Nazwa lekcji {name}</Text>
            {tasks.map((task, index) =>
                <Text
                    key={index}
                    style={{fontSize: 18}}
                >
                    {task}
                </Text>
            )}
            <Button
                icon="check-circle"
                mode="contained"
                style={{padding: 8, marginTop: 40}}
                onPress={() => {
                    navigation.goBack();
                    setLessonStatus((prevStatus) => ({
                        ...prevStatus,
                        [lessonId]: "completed"
                    }))
                }}
            >
                End the lesson
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default LessonDetailScreen;
