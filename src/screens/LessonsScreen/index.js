import {Button, Text, TouchableOpacity, View} from 'react-native';

const LessonsScreen = ({ navigation }) => {

    const lessons = [
        {
            id: "1",
            name: "Greetings"
        },
        {
            id: "2",
            name: "Numbers"
        },
        {
            id: "3",
            name: "Colors"
        },
        {
            id: "4",
            name: "Basic Phrases"
        }
    ]

    const handlePress = (lesson) => {
        navigation.navigate("LessonDetail", lesson.id)
        console.log(`${lesson.name} clicked`);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {lessons.map((item, index) =>
                <TouchableOpacity
                    key={index}
                    style={{padding: 10, margin: 5, backgroundColor: "#fff", borderRadius: 10}}
                    onPress={() => handlePress(item)}
                >
                    <Text>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default LessonsScreen;