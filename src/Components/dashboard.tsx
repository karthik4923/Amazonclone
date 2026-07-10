import React, { useState,useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
//@ts-ignore
import HomePage from "./Home";
import ProfilePage from "./Profile";
import SettingsPage from "./Settings";
import CartPage from "./Cart";
import ProductPage  from "./Product"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import {users} from './user';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from "react-native-linear-gradient";


const Dashboard = ({ navigation }) => {
  const [page, setPage] = useState("home");
  const [name,setname]=useState('');
  const [show,setshow]=useState(true);
  useEffect(() => {
    const fetchName=async() =>{
      const fon=await AsyncStorage.getItem('userEmail');
      if(fon){
        const userfound=users.find(e=>(e.email===fon));
        if(userfound)setname(userfound.name);
      }
    }
    fetchName();
  }, []);
  const logoff = () => {
    navigation.replace("Login");
  };
  useEffect(()=>{
    if(page==='product'){
      setshow(false)
    }else{
      setshow(true);
    }
  },[page])
  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomePage />;
      case "profile":
        return <ProfilePage goTopage={setPage} />;
      case "settings":
        return <SettingsPage />;
      case 'cart':
        return <CartPage />;
      case 'product':
        return <ProductPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <View style={styles.container}>
      {show &&
       <LinearGradient
       colors={['#00e1ffff','#bce7d5ff']}
       start={{ x: 0, y: 0 }}
       end={{ x: 1, y: 0 }}>

      <View style={styles.header}>
        
        <Text style={styles.text}>Welcome !</Text>
        <TouchableOpacity onPress={logoff} style={styles.text1}>
          <MaterialIcons name="logout" size={23} color="red" />
        </TouchableOpacity>

      </View>
      <Text style={styles.namer1}>{name}</Text>
    </LinearGradient>
    }
    <View style={styles.middle}>{renderPage()}</View>
      <View style={styles.header1}>
        <TouchableOpacity onPress={() => setPage("home")} style={[styles.activeback,page==='home' && styles.actbutback]}>
            <Ionicons name={page==='home'?'home':'home-outline'} size={27} style={[styles.button,page==='home' && styles.actbutton,]}/>
            <Text style={[page==='home' && styles.actbutton,{fontSize:16,}]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("profile")} style={[styles.activeback,page==='profile' && styles.actbutback]}>
          <Ionicons name={page==='profile'?'person':'person-outline'} size={27} style={[styles.button,page==='profile' && styles.actbutton,]}/>
          <Text style={[page==='profile' && styles.actbutton,{fontSize:16,}]}>You</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("product")} style={[styles.activeback,page==='product' && styles.actbutback]}>
          <Ionicons name={page==='product'?'pricetag':'pricetag-outline'} size={27} style={[styles.button,page==='product' && styles.actbutton,]}/>
          <Text style={[page==='product' && styles.actbutton,{fontSize:16,}]}>Product</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPage("cart")} style={[styles.activeback,page==='cart' && styles.actbutback]}>
          <Ionicons name={page==='cart'?'cart':'cart-outline'} size={27} style={[styles.button,page==='cart' && styles.actbutton,]}/>
          <Text style={[page==='cart' && styles.actbutton,{fontSize:16,}]}>Cart</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => setPage("settings")} style={[styles.activeback,page==='settings' && styles.actbutback]}>
          <Ionicons name={page==='settings'?'settings':'settings-outline'} size={27} style={[styles.button,page==='settings' && styles.actbutton,]}/>
          <Text style={[page==='settings' && styles.actbutton,{fontSize:16,}]}>Settings</Text>
        </TouchableOpacity>
        
      </View>

      
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 30,
    alignItems: "center",
    height: 90,
    
  },
  namer1:{
    fontSize:17,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:16,
    color:"#353232ff",
    position:'absolute',
    top:70,
    left:20,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  text1: {
    fontSize: 20,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor:'#fcd9d9bd',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius:15,
    fontWeight: "bold",
    textAlign: "center",
  },
  header1: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: '#e5ebf1ff',
    marginTop: 10,
    justifyContent:'space-between',
  },
  button0:{
    color: "white",
    fontWeight: "bold",
    fontSize:17,
    
  },
  button: {
    //paddingHorizontal: 20,
    //paddingVertical: 10,
    gap:5,
    color: "black",
    fontWeight: "bold",
  },
  actbutton: {
    color:'#124377ff',
    
  },
  activeback:{
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:8,
    width:80,
    //paddingHorizontal: 20,
  },
  actbutback:{
    backgroundColor:'#c3d0eeff',
  },
  middle: {
    marginTop:1,
    borderTopColor: "#ff9100ff",
    borderTopWidth: 3,
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
});
