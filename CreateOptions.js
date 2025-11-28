import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function CreateOptions({navigation}){

    return(

        <View style = {styles.container}>
            <Text style = {styles.text}>Build Questions and Answers for Studying here</Text>
            <Button title = "Home" onPress = {() => {navigation.navigate("Home")}}></Button>

            <Button title = "Study Time!" onPress = {() => {navigation.navigate("GameScreen")}}></Button>
            
        </View>

    );


}









const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default CreateOptions;