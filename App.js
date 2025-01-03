import {AuthProvider} from "./src/contexts/AuthContext";
import StackNav from "./src/navigation/stack/StackNav";
import {Provider as PaperProvider} from 'react-native-paper';
import {LessonProvider} from "./src/contexts/LessonContext";
import UserProvider from "./src/contexts/UserContext";

export default function App() {
    return (
        <PaperProvider>
            <AuthProvider>
                <LessonProvider>
                    <UserProvider>
                        <StackNav/>
                    </UserProvider>
                </LessonProvider>
            </AuthProvider>
        </PaperProvider>
    );
}
