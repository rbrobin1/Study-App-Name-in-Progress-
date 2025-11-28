import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function StudyMaterialList({navigation}){

    return(


        <View style = {styles.container}>
            <Text style = {styles.text} >Choose from an existing list of Questions and Answers you've created</Text>
            <Button title = "Home" onPress = {() => {navigation.navigate("Home")}}></Button>

            <Button title = "Study Time!" onPress = {() => {navigation.navigate("GameScreen")}}></Button>
            

            
        </View>

    );


}


export default StudyMaterialList;

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
  text: {
    fontSize: 20,
  },
});

