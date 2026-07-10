import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {users} from './user';
//@ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome';
//import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [border,setBorder]=useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin =async () => {
    // Replace with actual authentication logic
    const userfound=users.find(e=>(e.email===email));
    if(userfound && userfound.password===password){
      try{
        await AsyncStorage.setItem('userEmail',email);
      }catch(e){
        console.log('Failed to save the data to the storage',e);
      }
      navigation.replace('Dashboard');
      return;
    }
  if(!userfound || userfound.password!==password){
      Alert.alert('Invalid credentials');
    }
  };
  const move=()=>{
    navigation.navigate('Signup');
  }
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={[styles.input,{borderColor:border==='email'?'#007BFF':'#ccc'}]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize='words'
        onFocus={()=>setBorder('email')}
        onBlur={()=>setBorder(null)}
      />
      <TextInput
        style={[styles.input,{borderColor:border==='password'?'#007BFF':'#ccc'}]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        onFocus={()=>setBorder('password')}
        onBlur={()=>setBorder(null)}
      />
      <View style={{flexDirection:'row',alignItems:'center',marginVertical:10,marginBottom:20}}> 
      <TouchableOpacity 
        style={styles.checkboxContainer}
        onPress={() => setShowPassword(!showPassword)}>
        <View style={styles.checkbox}>
            {showPassword && (
              <Icon name="check" size={20} color="black" /> 
            )}
        </View>
        
      </TouchableOpacity>
      <Text style={{fontSize:17}}>Show Password</Text>
      </View>
      
     
    
      <TouchableOpacity onPress={handleLogin} style={styles.button} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <View style={styles.signn}>
        <Text style={styles.signn1}>Don't have an account? </Text>
        <TouchableOpacity
        onPress={move}>
          <Text style={styles.signn2}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#a0d3f5ff',
  },
  container1:{
    backgroundColor:'#ffffff',
    padding:20,
    borderRadius:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent:'center',
    height:400,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    outlineColor:'black',
    fontSize:20,
  },
  button:{
    backgroundColor:'#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 21,
  },
  signn:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:15,
  },
  signn1:{
    fontSize:20,
  },
  signn2:{
    fontSize:20,
    fontWeight:'bold',
    color:'#007BFF',
    textDecorationLine:'underline',
  },
  checkboxContainer: {
    
    
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1.5,
    borderColor: '#007BFF',
    marginRight: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});