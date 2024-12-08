import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import {Modal, Button, Portal, Dialog, Paragraph, Provider} from "react-native-paper";

const ExerciseDetailScreen = ({route, navigation}) => {
    const {name, tasks} = route.params;
    const [dialogVisible, setDialogVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState(20);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        //console.log(tasks)
        if (timeLeft <= 0) {
            setDialogVisible(true);
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleSelectAnswer = (id, answer) => {

        setAnswers((prev) => ({
            ...prev,
            [id]: answer,
        }));

        //console.log(answers[id])
        //console.log(id, answer)

    }

    const handleEndExercise = () => {
        setDialogVisible(true);
    };

    const handleCloseDialog = () => {
        setDialogVisible(false);
        navigation.goBack();
    };

    const calculateResult = () => {
        let correctAnswers = 0;
        tasks.forEach((task, index) => {
            if (answers[index] === task.correctAnswer) {
                correctAnswers++;
            }
        });
        return correctAnswers;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.timer}>Time Left: {timeLeft}s</Text>
            <ScrollView style={styles.tasksContainer}>
                {tasks.map((task, index) => (
                    <View key={index}>
                        <Text style={styles.task}>{task.question}</Text>
                        {task.options.map((option, optionIndex) => (
                            <TouchableOpacity key={optionIndex} onPress={() => handleSelectAnswer(index, option)}>
                                <Text style={{
                                    borderRadius: 10,
                                    margin: 5,
                                    padding: 10,
                                    backgroundColor: answers[index] === option ? '#fff' : '#ccc'
                                }}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <Button mode="outlined" onPress={handleEndExercise}>End Exercise</Button>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={handleCloseDialog}>
                    <Dialog.Title>Exercise Completed</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            You have completed the exercise: {name}. Well done!
                        </Paragraph>
                        <Paragraph>
                            Your score: {calculateResult()} / {tasks.length}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode="outlined" onPress={handleCloseDialog}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
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
