import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer} from '@react-navigation/native';
import Login from './screens/login';
import Signup from './screens/signup';
import Home from './screens/Home';
import Create from './screens/Create';
import CreateOptions from './screens/CreateOptions';
import GameScreen from './screens/GameScreen';
import LeaderBoard from './screens/LeaderBoard';
import Join from './screens/join';
import StudyMaterialList from './screens/StudyMaterialList';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Login" component ={Login}/>
        <Stack.Screen name ="Signup" component ={Signup}/>
        <Stack.Screen name ="Home" component ={Home}/>
        <Stack.Screen name ="Create" component ={Create}/>
        <Stack.Screen name ="CreateOptions" component ={CreateOptions}/>
        <Stack.Screen name ="GameScreen" component ={GameScreen}/>
        <Stack.Screen name ="LeaderBoard" component ={LeaderBoard}/>
        <Stack.Screen name ="Join" component ={Join}/>
        <Stack.Screen name = "Study List" component = {StudyMaterialList}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
