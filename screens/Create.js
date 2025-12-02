import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Create({navigation}){

    return(


        <View style = {styles.container}>
            <Text style = {styles.text}>Pick how you want to study</Text>
            <Button title = "Create New Study Guide" onPress = {() => {navigation.navigate("CreateOptions")}}></Button>
            <Button title = "Use Existing Study Guide" onPress = {() => {navigation.navigate("Study List")}}></Button>
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

export default Create;