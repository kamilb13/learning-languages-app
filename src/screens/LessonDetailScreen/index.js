import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {useLessonContext} from "../../contexts/LessonContext";
import {Button} from "react-native-paper";
import {useUserContext} from "../../contexts/UserContext";
import {Accelerometer} from 'expo-sensors';

const LessonDetailScreen = ({ route, navigation }) => {
    const lessonId = route.params.lesson.id;
    const tasks = route.params.lesson.tasks;
    const name = route.params.lesson.name;

    const { setLessonStatus, completeLesson } = useLessonContext();
    const { userInfo, setUserInfo } = useUserContext();

    const [lastActivityTime, setLastActivityTime] = useState(Date.now());
    const [subscription, setSubscription] = useState(null);
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        setUserInfo((prev) => ({
            ...prev,
            lessonHistory: [...prev.lessonHistory, lessonId],
        }));
    }, [completeLesson]);

    const startAccelerometer = () => {
        setSubscription(
            Accelerometer.addListener(({ x, y, z }) => {
                const mov = Math.sqrt(x * x + y * y + z * z);
                const bufor = 0.10;

                if (Math.abs(mov - 1) > bufor) {
                    setLastActivityTime(Date.now());
                }
            })
        );
        Accelerometer.setUpdateInterval(1000);
    };

    const stopAccelerometer = () => {
        if (subscription) {
            subscription.remove();
        }
        setSubscription(null);
    };

    useEffect(() => {
        startAccelerometer();

        const inactivityChecker = setInterval(() => {
            if (!isAlertVisible && Date.now() - lastActivityTime > 3000) {
                setIsAlertVisible(true);
                Alert.alert(
                    "Brak aktywności",
                    "Nie wykryto ruchu przez 3 sekund. Czy nadal tu jesteś?",
                    [{ text: "OK", onPress: () => setIsAlertVisible(false) }]
                );
            }
        }, 1000);

        return () => {
            clearInterval(inactivityChecker);
            stopAccelerometer();
        };
    }, [lastActivityTime, isAlertVisible]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Numer lekcji: {lessonId}</Text>
            <Text style={styles.text}>Nazwa lekcji: {name}</Text>
            {tasks.map((task, index) => (
                <Text key={index} style={{ fontSize: 18 }}>
                    {task}
                </Text>
            ))}
            <Button
                icon="check-circle"
                mode="contained"
                style={{ padding: 8, marginTop: 40 }}
                onPress={() => {
                    completeLesson(lessonId);
                    navigation.goBack();
                    setLessonStatus((prevStatus) => ({
                        ...prevStatus,
                        [lessonId]: "completed",
                    }));
                }}
            >
                Zakończ lekcję
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
