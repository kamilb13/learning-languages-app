import {doc, setDoc, getDoc} from '@firebase/firestore';

export const fetchUserData = async (db, user) => {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }

    return null;
};

export const saveUserData = async (db, user, lessonStatus) => {
    // await setDoc(doc(db, 'users', userId), data, { merge: true });

    try {
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            lessonStatus: lessonStatus
        }, {
            merge: true
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};
