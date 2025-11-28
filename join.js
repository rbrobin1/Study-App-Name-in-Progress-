import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Join({navigation}){

    return(

        <View style = {styles.container}>

            <Text style = {styles.text}>Study with other students here</Text>
            <Button title = "Home" onPress = {() => {navigation.navigate("Home")}}></Button>
            
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

export default Join;