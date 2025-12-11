import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Home({ navigation }) {


  return (

    <View style={styles.container}>
      <Image source={require("../assets/reading.png")} style={styles.image}/>
      
      <View style={styles.button}>
        <Button title = "Start Studying!" onPress = {() => {navigation.navigate("Create")}}></Button>
      </View>
     
      <View style={styles.button}>
        <Button title="Join Study" onPress={() => navigation.navigate("Join")} />
      </View>

     <View style={styles.button}>
      <Button title="Log Out" onPress={() => navigation.navigate("Login")} />
    </View>

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

  image: {
  width: 240,
  height: 240,
  marginBottom: 60,
  marginTop: -180,
  },
  
  button: {
  marginVertical: 10,   
  width: "70%",        
}
});

export default Home;