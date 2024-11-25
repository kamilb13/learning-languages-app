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
    const completeLesson = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons((prev) => [...prev, lessonId]);
        }
    };

    const completedCount = completedLessons.length;

    return (
        <LessonContext.Provider value={{ totalLessons, completedLessons, completeLesson, completedCount, lessonStatus, setLessonStatus }}>
            {children}
        </LessonContext.Provider>
    );
};

export const useLessonContext = () => {
    return useContext(LessonContext);
};
