import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, Chip } from 'react-native-paper';
import {useLessonContext} from "../../contexts/LessonContext";
import {useUserContext} from "../../contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Dashboard({ navigation }) {
    const { lessonsCount, setCompletedLessons, setLessonStatus } = useLessonContext();
    const { completedCount, setCompletedCount } = useLessonContext();
    const difficultyLevel = completedCount > 3 ? "Intermediate" : "Beginner";

    const {userInfo, setUserInfo} = useUserContext();


    useEffect(() => {
        setUserInfo((prev) => ({
            ...prev,
            userLevel: difficultyLevel
        }))
    }, [difficultyLevel]);

//     const clearAsyncStorage = async () => {
//         try {
//             await AsyncStorage.clear();
//             console.log("AsyncStorage został zresetowany");
//         } catch (error) {
//             console.error("Błąd podczas resetowania AsyncStorage", error);
//         }
//     };
//
//     clearAsyncStorage();


    useEffect(() => {
        const fetchData = async () => {
            try {
                //let value = await AsyncStorage.getItem('lessons');
                let status = await AsyncStorage.getItem('status');
                // TODO WYCZYSCIC ASYNC STORAGE I PO STATUSACH LICZYC SKONCZONE LEKCJE
                status = JSON.parse(status);
                console.log("odczytane status z as ",status)
                if (status !== null) {
                    //setCompletedLessons(value);
                    setLessonStatus(status);
                    // TODO NIE DZIALA LICZENIE I TE STATUSY
                    setCompletedCount(Object.values(status).filter(v => v === "completed").length)
                    //completedCount = ;
                    console.log("lekcje ukonczone ", completedCount)

                    // completedCount = status.forEach((v) => {
                    //     if(v === "completed"){
                    //         completedCount++;
                    //     }
                    // });
                    // TODO pobrane lekcje z asynstorage są nie oznaczone jako zrobione !
                    // setLessonStatus((prevStatus) => {
                    //     const updatedStatus = { ...prevStatus };
                    //     console.log(updatedStatus)
                    //     value.forEach((lessonId) => {
                    //         updatedStatus[lessonId] = "completed";
                    //     });
                    //
                    //     return updatedStatus;
                    // });
                }
            } catch (e) {
                console.log("Error fetching data from AsyncStorage:", e);
            }
        };

        fetchData();
    }, []);

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
