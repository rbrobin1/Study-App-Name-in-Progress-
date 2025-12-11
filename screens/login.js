import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Flatbutton from '../components/Flatbutton';
import { useNavigation } from '@react-navigation/native';


function Login({navigation}){


    return(

        <View style = {styles.container}>

          <View>
            <Text style = {{fontSize: 32}}>
              The Fantastic Study App
            </Text>
          </View>


            <Text style = {styles.text}>Enter Username</Text>
            <TextInput style = {styles.inputView}/>




            <Text style = {styles.text}>Enter Password</Text>
            <TextInput style = {styles.inputView}/>

  

            <View style = {styles.flatContainer}>
              <Flatbutton onPress = {() => {navigation.navigate("Signup")}} children = "New User? Sign up Here"></Flatbutton>

            

            </View>

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
    fontSize: 16,


  },

  flatContainer:{
    justifyContext: 'flex-start',
    

  },

  image: {
    marginBottom: 40,


  },

  inputView: {
    backgroundColor: "grey",
    borderRadius: 100,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },



});

export default Login;