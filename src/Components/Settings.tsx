import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet,Animated, TouchableOpacity} from 'react-native';

const SettingsPage = () => {
  const [isOn,setisOn]=useState(false);
  const animation=useRef(new Animated.Value(0)).current;
  const textopa=useRef(new Animated.Value(0)).current;
  const changer=()=>{
    setisOn(!isOn);
    Animated.parallel([
      Animated.timing(animation,{
      toValue:isOn?0:40,
      duration:300,
      useNativeDriver:true,
      }),
      Animated.sequence([
        Animated.timing(textopa,{
        toValue:1,
        duration:300,
        useNativeDriver:true,
        }),
        Animated.delay(500),
        Animated.timing(textopa,{
          toValue:0,
          duration:300,
          useNativeDriver:true,
        }),

      ]),
      
    

    ]).start();
    

  };
  return(
  <View style={styles.container}>
    <View style={{height:'100%',width:'100%'}}>
      <View style={styles.container1}>
      <Text style={styles.header}>Notification</Text>
      <TouchableOpacity
        onPress={changer}
        style={[styles.button, isOn && {backgroundColor:'#6e9267ff'}]}>
        <Animated.View 
        style={[styles.circle,
          {transform:[{translateX:animation},]},
        ]}>
          
        </Animated.View>
      </TouchableOpacity>
    </View>
    <View style={styles.container1}>
      <Text style={styles.header}>Permissions</Text>
    </View>
    <View style={styles.container1}>
      <Text style={styles.header}>Legal & About</Text>
    </View>

    </View>
    
    <View>
      <Animated.Text
      style={[styles.statusText,{opacity:textopa}]}
      >Notifications are {isOn ? 'On' : 'Off'}</Animated.Text>
    </View>
    
  </View>
);
};
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    marginTop:20,
  },
  container1:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'#daceceff',
    borderBottomWidth:1,
    height:70,
    alignItems:'center',
  },
  header:{
    fontSize:20,
    marginLeft:10,

  },
  button:{
    backgroundColor:'#919394ff',
    borderRadius:20,
    width:80,
    height:40,
    justifyContent:'center',
    marginRight:10,
    //overflow:'hidden',

  },
  circle:{
    backgroundColor:'white',
    borderRadius:30,
    height:30,
    width:30,
    marginLeft:5,

  },
  statusText: {
    fontSize: 20,
    color: '#ffffffff',
    marginTop: 20,
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    left:90,
    position:'absolute',
    backgroundColor:'#4ba172ff',
    bottom:10,
  },
});

export default SettingsPage;
