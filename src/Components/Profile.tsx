import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {users,countries} from './user'
import India from '../countryflags/India.png';
import SettingsPage from './Settings';
//import { useNavigation } from '@react-navigation/native';
//import { Image } from 'react-native/types_generated/index';
const ProfilePage = ({goTopage}) => {
  const [data, setdata] = useState([]);
  const [showdata, setshowdata] = useState([]); 
  const [name,setemail]=useState('');
  const [country,setcountry]=useState(India)
  const [show,setshow]=useState(false);
  const [Total,settotal]=useState(0);

 const {height} = Dimensions.get('window');

  useEffect(()=>{
    const loader=async()=>{
      const ema = await AsyncStorage.getItem('userEmail');
      const found=users.find(m=>(m.email===ema));
      if(found){
        setemail(found.name);
      }
    };loader();
  },[]);

  useEffect(() => {
    const loader = async () => {
      try {
        const email = await AsyncStorage.getItem('userEmail');
        if (!email) return;

        const key = `orders_${email}`;
        const found = await AsyncStorage.getItem(key);
       
        if (found) {
          const a = JSON.parse(found); 
          setdata(a);
          setshowdata(prev => [...prev, a]);
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };
    loader();
  }, []);
  const selecter=(flag)=>{
    setcountry(flag)
    setshow(false);

  };
  useEffect(() => {
    const calculateTotal = () => {
      const newTotal = showdata.reduce((sum, orderBatch) => {
        return sum + orderBatch.reduce((batchSum, product) => {
          const discountedPrice = product.price - (product.price * (product.discount || 0)) / 100;
          return batchSum + (product.quantity * discountedPrice);
        }, 0);
      }, 0);
      settotal(Math.ceil(newTotal)); 
    };calculateTotal();
  },[showdata]);
    
  
 

  return (
  <View 
    style={styles.container}>
    <ScrollView>
      <View style={styles.headd}>
        <View style={styles.left}>
          <Icon name='user-circle-o' size={25}></Icon>
          <Text style={{fontSize:20,}}>Hi! {name}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={()=>goTopage('settings')}>
            <Ionicons name='settings-outline' size={25}></Ionicons>
          </TouchableOpacity>
          
          <Icon name='bell-o' size={25}></Icon>
          <TouchableOpacity
              onPress={()=>{setshow(!show)}}>
             <Image source={country} style={styles.flager}></Image>
          </TouchableOpacity>
         
          
        </View>
        
      </View>
      <Text style={[styles.header,{borderBottomWidth:1,borderBottomColor:'#ccc'}]}>Your Orders</Text>

      {showdata.length === 0 ? (
        <Text style={styles.emptyText}>No Orders!</Text>
      ) : ( 
        showdata.map((orderBatch, index) => (
          <View key={index} style={styles.batch}>
            <Text style={styles.batchHeader}>Order Batch {index + 1}</Text>
            {orderBatch.map((product, i) => (
              <View key={i} style={styles.productCard}>
                <Text style={styles.productName}>{product.name}</Text>
                {product.quantity && (
                  <Text>Quantity: {product.quantity}</Text>
                )}
                {product.price && (
                  <Text>₹{product.price - (product.price * (product.discount || 0)) / 100}</Text>
                )}
              </View>
            ))}
            <View>
              <Text style={{fontSize:20,fontWeight:'bold'}}>Total : ₹{Total}</Text>
            </View>
          </View>
          
         
        ))
      )}
      <View style={{
        marginBottom: 20,
        borderBottomColor:'#ccc',
        paddingBottom:20,
        borderBottomWidth:1,}}>
        <Text style={styles.header}>Account</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.buttoner}>
            <Text style={{fontSize:16,}}>Your Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttoner}>
            <Text style={{fontSize:16,}}>Your Addresses</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttoner}>
            <Text style={{fontSize:16,}}>Amazon Pay UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttoner}>
            <Text style={{fontSize:16,}}>Subscribe & save</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.buttoner}>
            <Text style={{fontSize:16,}}>Add Gift Card</Text>
        </TouchableOpacity>
        </ScrollView>
        
      </View>
      <View style={{
        marginBottom: 20,
        borderBottomColor:'#ccc',
        paddingBottom:20,
        borderBottomWidth:1,

      }}>
        < Text style={styles.header}>Need More Help?</Text>
      <TouchableOpacity 
        style={styles.buttoner}>
        <Text style={{fontSize:16,}}>Visit customer service</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
      {
  show && (
    
      <View style={styles.shower} 
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}>
        <ScrollView>
        {countries.slice().sort((a,b)=>a.name.localeCompare(b.name)).map((data, i) => (
          <TouchableOpacity
            key={i}
            style={styles.adjuster}
            onPress={() => selecter(data.flag)}>
            <Image source={data.flag} style={styles.flager} />
            <Text style={{fontSize:16,}}>{data.name}</Text>
            <Text>({data.email})</Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </View>
  )
}

      
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    height:'100%',
    width:'100%',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingLeft:10,
    paddingBottom:10,
  },
  headd:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomWidth:2,
    paddingVertical:10,
    borderBottomColor:'#bbb7b7ff',
  },
  left:{
    flexDirection:'row',
    gap:10,
    paddingHorizontal:10,
  },
  right:{
    flexDirection:'row',
    paddingHorizontal:10,
    gap:10,
  },
  emptyText: {
    fontSize: 18,
    paddingLeft:10,
    color: '#777',
    borderBottomWidth:1,
    borderBottomColor:'#ccc',
    paddingBottom:20,
    alignItems:'center',
    justifyContent:'center',
  },
  batch: {
    marginBottom: 20,
    borderBottomColor:'#ccc',
    paddingBottom:20,
    borderBottomWidth:1,
    paddingHorizontal:10,

  },
  batchHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    
  },
  productCard: {
    backgroundColor: '#e6e6e6ff',
    padding: 10,
    marginBottom: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbb7b7ff',
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttoner:{
    marginLeft:20,
    paddingVertical:10,
    borderWidth:1,
    borderRadius:10,
    borderColor:'#ccc',
    width:200,     
    justifyContent:'center',
    alignItems:'center',
  },
  flager:{
    height:25,
    width:30,
  },
  flagstyler:{
    flexDirection:'row',
    gap:10,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
    paddingHorizontal:10,
    paddingVertical:10,
  },

  shower:{
    height:'100%',
    width:'100%',
    position:'absolute',
    backgroundColor:'#f1f1f1ff',
    zIndex:1000,
  },
  adjuster:{
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:10,
    gap:10,
    borderBottomColor:'#ccc',
    borderBottomWidth:1,
  },
  
});

export default ProfilePage;
