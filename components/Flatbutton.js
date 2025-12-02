import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';

function Flatbutton({children, onPress}){
    return(
        <Pressable style = {styles.button} onPress ={onPress}
        
        >
            <View>
                <Text style = {styles.buttonText}>{children}</Text>
            </View>

        </Pressable>

    );

}

export default Flatbutton;

const styles = StyleSheet.create({

    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: 'transparent',
        opacity: 0.7,
    },

    pressed: {
        opacity: 1,
    },
    buttonText: {
        textAlign: 'center',

    },


});
