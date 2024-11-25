import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const ExercisesScreen = ({ navigation }) => {
    const exerciseTypes = [
        {
            id: "1",
            name: "Vocabulary",
            tasks: ["Translate 'dog' to Polish", "What does 'apple' mean?", "Find the synonym for 'happy'"]
        },
        {
            id: "2",
            name: "Grammar",
            tasks: ["Complete the sentence: I ___ (be) happy.", "Find the error: 'She go to school.'", "What is the past tense of 'run'?"]
        },
        {
            id: "3",
            name: "Speaking",
            tasks: ["Practice pronouncing 'thought'", "Say a sentence using 'because'", "Describe your day in English"]
        },
        {
            id: "4",
            name: "Listening",
            tasks: ["Listen to a short dialogue and answer: 'What did they buy?'", "Identify the word you hear: 'apple'", "What is the main idea of the audio?"]
        }
    ];

    const handlePress = (exercise) => {
        navigation.navigate("ExerciseDetail", { name: exercise.name, tasks: exercise.tasks });
    };

    return (
        <View style={styles.container}>
            {exerciseTypes.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.button}
                    onPress={() => handlePress(item)}
                >
                    <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginVertical: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ExercisesScreen;