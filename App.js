import {AuthProvider} from "./src/AuthContext";
import StackNav from "./src/navigation/stack/StackNav";
import {Provider as PaperProvider} from 'react-native-paper';
import {LessonProvider} from "./src/LessonContext";

export default function App() {
    return (
        <PaperProvider>
            <LessonProvider>
                <AuthProvider>
                    <StackNav/>
                </AuthProvider>
            </LessonProvider>
        </PaperProvider>
    );
}
