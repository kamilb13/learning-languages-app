import React, { createContext, useState, useContext } from 'react';

const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
    const totalLessons = 20;
    const [completedLessons, setCompletedLessons] = useState([]);
    const [lessonStatus, setLessonStatus] = useState({
        "1": "not-started",
        "2": "not-started",
        "3": "not-started",
        "4": "not-started",
        "5": "not-started",
        "6": "not-started",
        "7": "not-started",
        "8": "not-started",
    });

    // TODO from backend in the future
    const lessons = [
        {
            id: "1",
            name: "Greetings",
            tasks: [
                "Introduce yourself in English.",
                "Say 'Hello' and 'Goodbye'.",
                "Learn the basic greetings like 'How are you?'"
            ]
        },
        {
            id: "2",
            name: "Numbers",
            tasks: [
                "Count from 1 to 20 in English.",
                "Practice numbers 21-50.",
                "Write the numbers from 1 to 10 in words."
            ]
        },
        {
            id: "3",
            name: "Colors",
            tasks: [
                "Learn the names of common colors.",
                "Match colors with their names.",
                "Describe your favorite color in English."
            ]
        },
        {
            id: "4",
            name: "Basic Phrases",
            tasks: [
                "Learn how to ask 'How are you?' and respond.",
                "Practice ordering food at a restaurant.",
                "Learn how to say 'Thank you' and 'You're welcome'."
            ]
        },
        {
            id: "5",
            name: "Food and Drink",
            tasks: [
                "Learn vocabulary related to food and drink.",
                "Describe what you like to eat and drink.",
                "Practice ordering food in a restaurant."
            ]
        },
        {
            id: "6",
            name: "Travel Vocabulary",
            tasks: [
                "Learn words related to travel (e.g. airport, hotel, passport).",
                "Learn how to ask for directions.",
                "Practice booking a hotel room in English."
            ]
        },
        {
            id: "7",
            name: "Common Phrasal Verbs",
            tasks: [
                "Learn 5 common phrasal verbs and use them in sentences.",
                "Practice using phrasal verbs in context.",
                "Match the phrasal verbs with their meanings."
            ]
        },
        {
            id: "8",
            name: "Shopping",
            tasks: [
                "Learn vocabulary related to shopping.",
                "Practice asking for prices in a store.",
                "Learn how to make a complaint in English."
            ]
        },
    ];

    const completeLesson = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons((prev) => [...prev, lessonId]);
        }
    };

    const completedCount = completedLessons.length;
    const lessonsCount = lessons.length;

    return (
        <LessonContext.Provider value={{ totalLessons, completedLessons, completeLesson, completedCount, lessonStatus, setLessonStatus, lessons, lessonsCount }}>
            {children}
        </LessonContext.Provider>
    );
};

export const useLessonContext = () => {
    return useContext(LessonContext);
};
