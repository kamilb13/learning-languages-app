import React from 'react';
import { View, Text } from 'react-native';

const LessonDetailScreen = ({ route }) => {
    const lessonId = route.params;

    return (
        <View>
            <Text>Numer lekcji {lessonId}</Text>
        </View>
    );
};

export default LessonDetailScreen;
