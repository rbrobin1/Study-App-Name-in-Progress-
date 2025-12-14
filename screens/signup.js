import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {getAuth, onAuthStateChanged, createUserWithEmailAndPassword} from  'firebase/auth';
import auth from '../services/firebase';


function Signup({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signupHandler(){
    
    try{
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const credentials = user.credentials;

    } catch(error){
      console.error('login error', error)

    }
  }




    return(

        <View style = {styles.container}>

            <Text style = {styles.text}>Enter email</Text>
            <TextInput style = {styles.inputView}
            value = {email}
            onChangeText = {(text) => setEmail(text)}

            
            />
            <Text style = {styles.text}>Enter Password</Text>
            <TextInput style = {styles.inputView} 
            value = {password}
            onChangeText = {(text) => setPassword(text)}
            
            />

            <Button title = "Log In" onPress = {() => {navigation.navigate("Home"), signupHandler}}></Button>


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