import React, {useContext, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, Chip } from 'react-native-paper';
import {useLessonContext} from "../../contexts/LessonContext";
import {useUserContext} from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import {AuthContext} from "../../contexts/AuthContext";

function Dashboard({ navigation }) {
    const { lessonsCount, setCompletedLessons, setLessonStatus, lessonStatus } = useLessonContext();
    const { completedCount, setCompletedCount } = useLessonContext();
    const difficultyLevel = completedCount > 3 ? "Intermediate" : "Beginner";

    const {userInfo, setUserInfo} = useUserContext();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        setUserInfo((prev) => ({
            ...prev,
            userLevel: difficultyLevel
        }))
    }, [difficultyLevel]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const status = await AsyncStorage.getItem('status');
                const parsedStatus = JSON.parse(status);
                if (status !== null) {
                    setLessonStatus(parsedStatus);
                    const newCompletedCount = Object.values(parsedStatus).filter(v => v === "completed").length;
                    setCompletedCount(newCompletedCount);
                    console.log("odczytane statusy\n", parsedStatus);
                    console.log("obliczony completed count - ", newCompletedCount);
                }
            } catch (e) {
                console.log("Error fetching data from AsyncStorage: ", e);
            }
        };

        fetchData();
    }, []);

    // const loadCredentialsFromSecureStore = async () => {
    //     try {
    //         const email = await SecureStore.getItemAsync('userEmail');
    //         const password = await SecureStore.getItemAsync('userPassword');
    //         console.log('Załadowane dane:', email, password);
    //     } catch (error) {
    //         console.error('Błąd podczas odczytu danych z SecureStore', error);
    //     }
    // };
    //
    // useEffect(() => {
    //     loadCredentialsFromSecureStore();
    // }, []);


    useEffect(()=>{
        console.log("UKONCZONE",completedCount)
    }, [completedCount])

    const progress = completedCount/lessonsCount;
    //console.log(completedCount)
    //console.log(userInfo)
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleLarge" style={styles.title}>
                        Your Progress
                    </Text>
                    <Text variant="bodyLarge">Lessons Completed: {completedCount}/{lessonsCount}</Text>
                    <ProgressBar progress={progress} color="#6200EE" style={styles.progressBar} />
                    <Text variant="bodySmall" style={styles.progressText}>
                        {progress * 100}% Completed
                    </Text>
                </Card.Content>
            </Card>

            <View style={styles.chipContainer}>
                <Chip icon="account-circle" style={styles.chip}>
                    {difficultyLevel}
                </Chip>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    card: {
        width: '100%',
        marginBottom: 20,
        padding: 10,
    },
    title: {
        marginBottom: 10,
    },
    progressBar: {
        marginTop: 10,
        height: 8,
        borderRadius: 5,
    },
    progressText: {
        marginTop: 5,
        color: '#6c757d',
    },
    chipContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chip: {
        backgroundColor: '#e3f2fd',
        marginTop: 10,
    },
});

export default Dashboard;
