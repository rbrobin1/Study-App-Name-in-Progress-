import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import Flatbutton from '../components/Flatbutton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from  'firebase/auth';
import {auth} from '../services/firebase';




function Login({navigation}){
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   async function loginHandler(){
    
    try{
      const user = await signInWithEmailAndPassword(auth, email, password);
      const credentials = user.credentials;

    } catch(error){
      console.error('login error', error)

    }
  }


    return(

        <View style = {styles.container}>

          <View>
            <Text style = {{fontSize: 32}}>
              The Fantastic Study App
            </Text>
          </View>


            <Text style = {styles.text}>Enter Username</Text>
            <TextInput style = {styles.inputView}
            value = {email}
            onChangeText = {(text) => setEmail(text)}
            
            />




            <Text style = {styles.text}>Enter Password</Text>
            <TextInput style = {styles.inputView}
            value = {password}
            onChangeText = {(text) => setPassword(text)}
            
            />

  

            <View style = {styles.flatContainer}>
              <Flatbutton onPress = {() => {navigation.navigate("Signup")}} children = "New User? Sign up Here"></Flatbutton>

            

            </View>

            <Button title = "Home" onPress = {() => {navigation.navigate("Home"), loginHandler}}></Button>


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
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },



});

export default Login;