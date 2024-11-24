import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from "./src/AuthContext";
import StackNav from "./src/navigation/bottom/StackNav";

export default function App() {
  return (
      <AuthProvider>
          <NavigationContainer>
            <StackNav/>
          </NavigationContainer>
      </AuthProvider>
  );
}
