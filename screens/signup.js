import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Signup({navigation}){


    return(

        <View style = {styles.container}>

            <Text style = {styles.text}>Enter Username</Text>
            <TextInput style = {styles.inputView}/>
            <Text style = {styles.text}>Enter Password</Text>
            <TextInput style = {styles.inputView} />

            <Button title = "Log In" onPress = {() => {navigation.navigate("Login")}}></Button>


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
    fontSize: 16,


  },

  image: {
    marginBottom: 40,


  },

  inputView: {
    backgroundColor: "grey",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: 'center',

  },



});
export default Signup;