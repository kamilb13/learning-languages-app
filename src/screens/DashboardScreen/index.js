import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, ProgressBar, Chip } from 'react-native-paper';
import {useLessonContext} from "../../contexts/LessonContext";

function Dashboard({ navigation }) {
    const difficultyLevel = "Intermediate";

    const { completedCount, lessonsCount } = useLessonContext();
    const progress = completedCount/lessonsCount;
    console.log(completedCount)

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
