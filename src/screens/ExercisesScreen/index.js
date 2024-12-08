import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const ExercisesScreen = ({ navigation }) => {
    const exerciseTypes = [
        {
            id: "1",
            name: "Vocabulary",
            tasks: [
                { question: "Translate 'dog' to Polish", options: ['pies', 'kot', 'królik', 'ptak'], correctAnswer: 'pies' },
                { question: "What does 'apple' mean?", options: ['jabłko', 'gruszka', 'pomarańcza', 'banan'], correctAnswer: 'jabłko' },
                { question: "Find the synonym for 'happy'", options: ['smiling', 'sad', 'joyful', 'angry'], correctAnswer: 'joyful' },
                { question: "What is the Polish word for 'cat'?", options: ['kot', 'pies', 'królik', 'koń'], correctAnswer: 'kot' },
                { question: "What is the synonym of 'quick'?", options: ['fast', 'slow', 'late', 'quiet'], correctAnswer: 'fast' }
            ]
        },
        {
            id: "2",
            name: "Grammar",
            tasks: [
                { question: "Complete the sentence: I ___ (be) happy.", options: ['am', 'is', 'are', 'be'], correctAnswer: 'am' },
                { question: "Find the error: 'She go to school.'", options: ['She', 'go', 'to', 'school'], correctAnswer: 'go' },
                { question: "What is the past tense of 'run'?", options: ['ran', 'runned', 'runed', 'raned'], correctAnswer: 'ran' },
                { question: "Choose the correct form: 'He ___ (have) a car.'", options: ['have', 'has', 'had', 'having'], correctAnswer: 'has' },
                { question: "What is the opposite of 'happy'?", options: ['sad', 'joyful', 'angry', 'excited'], correctAnswer: 'sad' }
            ]
        },
        {
            id: "3",
            name: "Listening",
            tasks: [
                { question: "Listen to a short dialogue and answer: 'What did they buy?'", options: ['a book', 'a car', 'food', 'clothes'], correctAnswer: 'food' },
                { question: "Identify the word you hear: 'apple'", options: ['apple', 'orange', 'banana', 'grape'], correctAnswer: 'apple' },
                { question: "What is the main idea of the audio?", options: ['It talks about the weather', 'It is about a trip to the beach', 'It talks about a cooking recipe', 'It talks about shopping'], correctAnswer: 'It talks about a cooking recipe' },
                { question: "What did the person say about their day?", options: ['It was busy', 'It was boring', 'It was exciting', 'It was tiring'], correctAnswer: 'It was exciting' },
                { question: "What did they mention about the meeting?", options: ['It was postponed', 'It was canceled', 'It went well', 'It was boring'], correctAnswer: 'It went well' }
            ]
        },
        {
            id: "4",
            name: "Speaking",
            tasks: [
                { question: "Practice pronouncing 'thought'", options: ['Thought', 'Taught', 'Caught', 'Brought'], correctAnswer: 'Thought' },
                { question: "Say a sentence using 'because'", options: ['I am happy because it is sunny.', 'I am tired because I sleep.', 'I like tea because coffee.', 'I am hungry because food.'], correctAnswer: 'I am happy because it is sunny.' },
                { question: "Describe your day in English", options: ['I woke up, went to work, and met friends.', 'I went to sleep early and did nothing.', 'I stayed in bed all day.', 'I read a book all day long.'], correctAnswer: 'I woke up, went to work, and met friends.' },
                { question: "Describe your favorite food.", options: ['I like pizza because it is delicious and cheesy.', 'I do not like food.', 'I eat vegetables every day.', 'My favorite food is water.'], correctAnswer: 'I like pizza because it is delicious and cheesy.' },
                { question: "Talk about your last vacation.", options: ['I went to the beach and enjoyed the sun.', 'I stayed at home and watched TV.', 'I worked during my vacation.', 'I did not have a vacation.'], correctAnswer: 'I went to the beach and enjoyed the sun.' }
            ]
        },
        {
            id: "5",
            name: "Reading Comprehension",
            tasks: [
                { question: "What is the main idea of the story?", options: ['It is about a dog', 'It is about a family', 'It is about a holiday', 'It is about a school project'], correctAnswer: 'It is about a family' },
                { question: "Who is the main character?", options: ['John', 'Emma', 'Alice', 'The dog'], correctAnswer: 'Emma' },
                { question: "Where does the story take place?", options: ['In the city', 'In the countryside', 'In the forest', 'In the school'], correctAnswer: 'In the city' },
                { question: "What is the problem in the story?", options: ['They lost their car', 'They have no food', 'They cannot find their house', 'They are stuck in the rain'], correctAnswer: 'They cannot find their house' },
                { question: "What happens at the end of the story?", options: ['They find their house', 'They meet new friends', 'They solve the problem', 'They get lost'], correctAnswer: 'They solve the problem' }
            ]
        },
        {
            id: "6",
            name: "Synonyms & Antonyms",
            tasks: [
                { question: "What is a synonym of 'big'?", options: ['large', 'small', 'tiny', 'huge'], correctAnswer: 'large' },
                { question: "What is an antonym of 'happy'?", options: ['sad', 'joyful', 'content', 'excited'], correctAnswer: 'sad' },
                { question: "What is a synonym of 'fast'?", options: ['quick', 'slow', 'delayed', 'late'], correctAnswer: 'quick' },
                { question: "What is an antonym of 'light'?", options: ['heavy', 'soft', 'bright', 'warm'], correctAnswer: 'heavy' },
                { question: "What is a synonym of 'angry'?", options: ['mad', 'happy', 'joyful', 'excited'], correctAnswer: 'mad' }
            ]
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