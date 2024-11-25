import React, { createContext, useState, useContext } from 'react';

const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
    const totalLessons = 20;
    const [completedLessons, setCompletedLessons] = useState([]);

    const completeLesson = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons((prev) => [...prev, lessonId]);
        }
    };

    const completedCount = completedLessons.length;

    return (
        <LessonContext.Provider value={{ totalLessons, completedLessons, completeLesson, completedCount }}>
            {children}
        </LessonContext.Provider>
    );
};

export const useLessonContext = () => {
    return useContext(LessonContext);
};
