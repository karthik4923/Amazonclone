import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView,Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CartPage = () => {
   const [data,setdata]=useState([]);
   const [total,settotal]=useState(0);
   useEffect(()=>{
    const loaddata=async()=>{
      const email = await AsyncStorage.getItem('userEmail');
      const key = `cart_${email}`;
      const found=await AsyncStorage.getItem(key);
      if(found){
        const prased=JSON.parse(found);
        setdata(prased);
      }
      
    };loaddata();

   },[]);
   useEffect(()=>{
    const saveCart=async()=>{
      const email = await AsyncStorage.getItem('userEmail');
      const key = `cart_${email}`;
      await AsyncStorage.setItem(key,JSON.stringify(data));
      const newTotal = data.reduce(
        (sum, p) => sum + p.quantity * (p.price - (p.price * p.discount) / 100),0
    );
    settotal(Math.ceil(newTotal));

    };
    saveCart();
   },[data]);
   const deleter=(item)=>{
    const updated=data.filter(p=>p.name!==item.name);
    setdata(updated);
    
   };
   const decrease=(item)=>{
    const updated=data.map(p=>{
      if(p.name===item.name){
        const nquant=p.quantity-1;
        return nquant>0?{...p,quantity:nquant}:deleter(p);
      }
      return p;
    })
    setdata(updated);
   };
   const increase=(item)=>{
     const updated=data.map(p=>
      p.name===item.name?{...p, quantity:p.quantity+1}:p
      
     );
     setdata(updated);
   };
   const saveprofile=async()=>{
    const found=await AsyncStorage.getItem('userEmail');
    const key=`orders_${found}`;
    await AsyncStorage.setItem(key,JSON.stringify(data));
    setdata([])
   }
   
   return(

    <ScrollView scrollEnabled showsVerticalScrollIndicator={false} style={{width:'100%',}}>
      <View style={{justifyContent:'space-between',flexDirection:'row',}}>
         <Text style={{fontSize:20,marginVertical:10,marginHorizontal:10,}}>CART</Text>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginRight:20,}}>
          <Ionicons name="cart-outline" size={30} color="black" />
          <Text style={{fontWeight:'bold',fontSize:20,backgroundColor:'#27a50dff',padding:5,borderRadius:50,color:'white',}}>{data.length}</Text>
         </View>
         
      </View>
     
      <View style={styles.container}>
        {data.length===0?(
          <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',}}>Your Cart Is empty</Text>
        ):(
          data.map((product,i)=>(
            
            <View key={i} style={styles.cartbox}>
              <View style={styles.left}>
                <Image source={product.img} style={{height:150,width:150}}/>
                <View style={styles.changer}>
                  <TouchableOpacity
                    onPress={()=>decrease(product)}><Text style={{fontSize:20,fontWeight:'bold',}}>-</Text></TouchableOpacity>
                  <Text style={{fontSize:20,fontWeight:'bold',}}>{product.quantity}</Text>
                  <TouchableOpacity
                    onPress={()=>{increase(product)}}><Text style={{fontSize:20,fontWeight:'bold',}}>+</Text></TouchableOpacity>
                </View>
              </View>
              <View style={styles.right}>
                <Text style={styles.heade}>{product.name}</Text>
                <Text>{product.desc}</Text>
                <Text>{product.vol}</Text>
                <View style={styles.pricer}>
                  <Text style={{fontWeight:'bold',fontSize:20}}>{'\u20B9'}{product.price - (product.price * product.discount) / 100}</Text>
                  <Text style={{fontSize:17,}}>M.R.P :</Text>
                  <Text style={{textDecorationLine:'line-through',fontSize:17}}>{'\u20B9'}{product.price}</Text>
                </View>
                <Text>({product.discount} is off)</Text>
                <TouchableOpacity style={styles.deleter} onPress={()=>{deleter(product);}}>
                  <Text style={{fontWeight:'bold',fontSize:19,}}>Delete</Text>
                </TouchableOpacity>
               </View>
            </View>

            
          ))
        )}
      </View>
      <View style={{flexDirection:'row',width:'100%',gap:10,marginVertical:20,justifyContent:'space-between',paddingHorizontal:20,}}>
        <Text style={{fontSize:20,fontWeight:'bold',}}>Total Cost : </Text>
        <Text style={{fontSize:20,fontWeight:'bold',}}>{'\u20B9'}{total}</Text>
      </View>
      <TouchableOpacity 
        onPress={()=>{saveprofile()}}
        //disabled={total === 0}
        style={ total !== 0 ? styles.confirm : [styles.confirm, { opacity: 0.5 }] }>
        <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold',}}>Confirm to Buy</Text>
      </TouchableOpacity>
    </ScrollView>
   );
      
    
};
const styles=StyleSheet.create({
  contianer:{
    height:'100%',
    width:'100%',
   
  },
  cartbox:{
    flexDirection:'row',
    paddingHorizontal:10,
    borderBottomWidth:1,
    paddingVertical:20,
    borderBottomColor:'#ccc',
    paddingRight:25,
    borderTopWidth:1,
    borderTopColor:'#ccc',
    
    gap:20,
  },
   heade:{
        fontSize:17,
        fontWeight:'bold',
   },
   left: {
        width:150,
    },
    right: {
        marginRight:150,
    },
    pricer:{
        flexDirection:'row',
        gap:6,
        flexWrap:'wrap',
    },
    changer:{
      flexDirection:'row',
      justifyContent:'space-around',
      borderColor:'#fdcf00ff',
      borderWidth:2,
      borderRadius:20,
      marginTop:10,

    },
    deleter:{
      borderColor:'#fc4c4cff',
      borderWidth:2,
      borderRadius:20,
      width:100,
      justifyContent:'center',
      alignItems:'center',
      position:'absolute',
      top:160,
      backgroundColor:'#e4e4e4ff'
    },
    confirm:{
      paddingVertical:10,
          backgroundColor:'#fdcf00ff',
          borderColor:'#ccc',
          justifyContent:'center',
          marginHorizontal:20,
          alignItems:'center',
          borderRadius:20,
          marginVertical:20,
    },

})
export default CartPage