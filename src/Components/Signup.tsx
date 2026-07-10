import React,{useState} from "react";
import {users} from './user';
import { View, Text,StyleSheet, TouchableOpacity,Alert} from "react-native";
import { TextInput } from "react-native-gesture-handler";
//import AsyncStorage from "@react-native-async-storage/async-storage";
const Signup = ({navigation}) => {
    const [name,setname]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [border,setBorder]=useState(null);


    const register = () => {
        if(!email || !password || !repassword || !name){
            Alert.alert('Please fill all the fields');
            return;
        }
        if(password !== repassword){
            Alert.alert('Passwords do not match');
            return;
        }
        const found=users.find(e=>e.email===email);
        if(found){
            Alert.alert('User already exists');
            return;
        }
        const newUser={name,email,password};
        users.push(newUser);
        Alert.alert('Registration Successful');
        setname('');
        setEmail('');
        setPassword('');
        setRepassword('');
        navigation.replace('Login');
    };

    return(

        <View style={styles.container}>
            <View style={styles.container1}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                 placeholder="User-Name"
                 value={name}
                 onChangeText={setname}
                 style={[styles.input,{borderColor:border==='name'?'#007BFF':'#ccc'}]}
                 onFocus={()=>setBorder("name")}
                 onBlur={()=>setBorder(null)}
                />
                <TextInput
                 placeholder="Email"
                 value={email}
                 onChangeText={setEmail}
                 style={[styles.input,{borderColor:border==='email'?'#007BFF':'#ccc'}]}
                 onFocus={()=>setBorder('email')}
                 onBlur={()=>setBorder(null)}
                />

                <TextInput
                 placeholder="Password"
                 value={password}
                 onChangeText={setPassword}
                 style={[styles.input,{borderColor:border==='password'?'#007BFF':'#ccc'}]}
                 secureTextEntry={true}
                 onFocus={()=>setBorder('password')}
                 onBlur={()=>setBorder(null)}
                />
                <TextInput
                 placeholder="Re-enter Password"
                 value={repassword}
                 onChangeText={setRepassword}
                 style={[styles.input,{borderColor:border==='repassword'?'#007BFF':'#ccc'}]}
                 onFocus={()=>setBorder('repassword')}
                 onBlur={()=>setBorder(null)}
                />

                <TouchableOpacity
                style={styles.button}
                onPress={register}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default Signup;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#a0d3f5ff',
        flex:1,
        justifyContent:'center',
        paddingHorizontal:20,
    },
    container1:{
        backgroundColor:'#ffffff',
        padding:20,
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 2.25,
        shadowRadius: 5,
        elevation: 10,
        justifyContent:'center',
        height:500,
    },
    input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    outlineColor: '#007BFF',
    fontSize:20,
  },
    title:{
        fontSize:28,
        marginBottom:60,
        textAlign:'center',
        fontWeight:'bold',
    },
    button:{
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText:{
        fontSize:21,
        fontWeight:'bold',
        color:'#fff',
    }
})