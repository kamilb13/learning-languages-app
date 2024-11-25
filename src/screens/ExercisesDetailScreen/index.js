import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal, Button,Portal, Dialog, Paragraph, Provider } from "react-native-paper";

const ExerciseDetailScreen = ({ route, navigation }) => {
    const { name, tasks } = route.params;
    const [dialogVisible, setDialogVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        if (timeLeft <= 0) {
            setDialogVisible(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleEndExercise = () => {
        setDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
        navigation.goBack();
    };

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
                <View style={styles.tasksContainer}>
                    {tasks.map((task, index) => (
                        <Text key={index} style={styles.task}>
                            - {task}
                        </Text>
                    ))}
                </View>
                <Button mode="outlined" onPress={handleEndExercise}>End Exercise</Button>
                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={handleCloseDialog}>
                        <Dialog.Title>Exercise Completed</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>
                                You have completed the exercise: {name}. Well done!
                            </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button mode="outlined" onPress={handleCloseDialog}>OK</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    timer: {
        fontSize: 18,
        color: "red",
        marginBottom: 20,
    },
    tasksContainer: {
        marginBottom: 20,
    },
    task: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default ExerciseDetailScreen;
