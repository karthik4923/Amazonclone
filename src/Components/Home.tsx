import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet,Text ,TextInput, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesginIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import prime from '../assets1/prime.jpg';
import prime1 from '../assets1/prime1.jpg';
import scimg1 from '../assets1/scimg1.jpg';
import scimg2 from '../assets1/scimg2.jpg';
import scimg3 from '../assets1/scimg3.jpg';
import scimg4 from '../assets1/scimg4.jpg';
import scimg5 from '../assets1/scimg5.jpg';
import scimg6 from '../assets1/scimg6.jpg';
import scimg7 from '../assets1/scimg7.jpg';
import bazaar from '../assets1/bazaar.jpg';
import fresh from '../assets1/fresh.jpg';
import mxplayer from '../assets1/mxplauer.png';
import pay from '../assets1/pay.png';
import pharmacy from '../assets1/pharmacy.jpg';

import LinearGradient from 'react-native-linear-gradient';


const images = [scimg1, scimg2, scimg3, scimg4, scimg5, scimg6, scimg7];
const { width } = Dimensions.get('window');
const loopimages=[images[images.length-1],...images,images[0]];

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [curIndex, setCurIndex] = useState(0);
  const scrollRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll; 
  }, [curIndex]);

  const startAutoScroll = () => {
  stopAutoScroll();
  intervalRef.current = setInterval(() => {
    const nextIndex = curIndex + 1;
    scrollRef.current?.scrollTo({ x: (nextIndex + 1) * width, animated: true }); 
  }, 4000);
};

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleScrollEnd = (event:any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);

  if (index === 0) {
    // Scrolled to clone of last image
    scrollRef.current?.scrollTo({ x: images.length * width, animated: false });
    setCurIndex(images.length - 1);
  } else if (index === loopimages.length - 1) {
    // Scrolled to clone of first image
    scrollRef.current?.scrollTo({ x: width, animated: false });
    setCurIndex(0);
  } else {
    setCurIndex(index - 1); // Adjust for offset
  }
};

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
      <View style={styles.container1}>
       
        <View style={styles.container2}>
          <View style={styles.inputbox}>
            <Icon name='search' size={30} color='#000' style={styles.icon} />
            <TextInput
              placeholder='Search here'
              value={search}
              onChangeText={setSearch}
              style={styles.inpute}
            />
            <Ionicons name='camera-outline' size={35} color='#000' style={styles.icon} />
            <Icon name='microphone' size={30} color='#000' style={[styles.icon, { marginLeft: 10 }]} />
          </View>
          <MaterialDesginIcons name='qrcode-scan' size={40} color='#000' style={[styles.icon, { marginRight: 5 }]} />
        </View>

       
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onMomentumScrollEnd={handleScrollEnd}
          onScrollBeginDrag={stopAutoScroll}
          onScrollEndDrag={startAutoScroll}
        >
          {loopimages.map((img, index) => (
            <Image
              key={index}
              source={img}
              style={{ width, height: 200, marginTop: 20 }}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        <View style={styles.dotscontainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === curIndex ? '#000' : '#fff' },
              ]}
            />
          ))}
        </View>
      </View>
      
        <LinearGradient 
          colors={['#00e1ffff','#bce7d5ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{width:'100%',flexDirection:'row',paddingHorizontal:30,paddingVertical:20,alignItems:'center',marginBottom:20,
                borderWidth:2,borderColor:'grey',}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{width:'100%',flexDirection:'row',}}>
                <View style={{gap:30,flexDirection:'row',}}>
                  <TouchableOpacity
              style={[styles.headtouch,{backgroundColor:'#f7f5b4ff'}]}>
              <Image source={pay} style={styles.headicons}/>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Pay</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headtouch,{backgroundColor:'#b5f8dcff'}]}>
              <Image source={fresh} style={styles.headicons}/>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Fresh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headtouch,{backgroundColor:'#fcceceff'}]}>
              <Image source={bazaar} style={styles.headicons}/>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Bazaar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headtouch,{backgroundColor:'#cbebfdff'}]}>
              <Image source={mxplayer} style={styles.headicons}/>
              <Text style={{fontSize:16,fontWeight:'bold'}}>MXPlayer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.headtouch,{backgroundColor:'#c8f7c4ff'}]}>
              <Image source={pharmacy} style={styles.headicons}/>
              <Text style={{fontSize:16,fontWeight:'bold'}}>Pharmacy</Text>
            </TouchableOpacity>
                </View>
            
            </ScrollView>
        </LinearGradient>


      
      <Image source={prime1} style={{width:'100%',marginBottom:10,marginTop:20,height:200,}}></Image>
      <Text style={styles.txt}>Book Now!</Text>
      <LinearGradient
         colors={['#85e5f7ff', '#638fecff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={{fontWeight:'bold',fontSize:20,textAlign:'center',marginBottom:5,}}>Watch only on Prime!</Text>
        <Image source={prime} style={{width:'100%',marginBottom:28,}}></Image>
      </LinearGradient>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: '100%',
    width: '100%',
  },
  container1: {
    
    width: '100%',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  inputbox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 5,
  },
  inpute: {
    width: '60%',
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  dotscontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    marginVertical:10,
  },
  headtouch:{
    paddingHorizontal:10,
    paddingVertical:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
    width:100,
    borderWidth:1,
    borderColor:'#969696ff',
  },
  headicons:{
    height:40,
    width:40,
    borderRadius:20,
  },
  txt:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
    backgroundColor:'#38b6ccff',
    paddingVertical:10,
    textAlign:'center',
    marginHorizontal:10,
    borderRadius:20,
    marginBottom:10,
  },
});

export default HomePage;
