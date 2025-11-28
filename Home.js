import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home({navigation}){


    return(

        <View style = {styles.container}>
            <Text style = {styles.text}>Home Screen</Text>
            <Button title = "Start Studying!" onPress = {() => {navigation.navigate("Create")}}></Button>
            <Button title = "Joint Study" onPress = {() => {navigation.navigate("Join")}}></Button>
            <Button title = "Log Out" onPress = {() => {navigation.navigate("Login")}}></Button>


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

export default Home;