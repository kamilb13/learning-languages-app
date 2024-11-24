import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider} from "./src/AuthContext";
import StackNav from "./src/navigation/stack/StackNav";

export default function App() {
  return (
      <AuthProvider>
          <StackNav/>
      </AuthProvider>
  );
}
