import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function GameScreen({navigation}){

    return(

        <View style = {styles.container}>

            <Text style = {styles.text}>Answer questions here</Text>
            <Button title = "Results" onPress = {() => {navigation.navigate("LeaderBoard")}}></Button>
            
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

export default GameScreen;