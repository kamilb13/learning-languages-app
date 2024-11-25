import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LessonDetailScreen = ({ route }) => {
    console.log(route)
    const lessonId = route.params.lesson.id;
    const tasks = route.params.lesson.tasks;
    const name = route.params.lesson.name;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Numer lekcji: {lessonId}</Text>
            <Text style={styles.text}>Nazwa {name}</Text>
            {/*<Text style={styles.text}>Zadania: {tasks}</Text>*/}
            {tasks.map((task) =>
                <Text style={{fontSize: 18}}>{task}</Text>
            )}
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
