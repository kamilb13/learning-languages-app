import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from "./src/screens/AuthScreen";
import MainDrawer from "./src/screens/MainDrawer"
import {AuthProvider} from "./src/AuthContext";

const Stack = createNativeStackNavigator();

const options = {
    headerShown: false
}

export default function App() {
  return (
      <AuthProvider>
          <NavigationContainer>
                <Stack.Navigator initialRouteName="AuthScreen">
                <Stack.Screen name="AuthScreen" component={AuthScreen} options={options} />
                <Stack.Screen name="Main" component={MainDrawer} options={options} />
                </Stack.Navigator>
          </NavigationContainer>
      </AuthProvider>
  );
}
