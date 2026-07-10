import React, { useState, useEffect,useRef} from 'react';
import { Text, View, StyleSheet, ScrollView,TextInput, TouchableOpacity, Image, Alert,Animated } from 'react-native';
import groceries from '../assets1/groceries icon.jpg';
import electronics from '../assets1/elec icon.jpg';
import fashion from '../assets1/dress icon.png';
import books from '../assets1/book icon.png';
import sports from '../assets1/sports icon.png';
import toys from '../assets1/Toys icon.png'; 
import { grocdata,elecdata,fashiondata,Toysdata,sportsdata,booksdata} from './user'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import CartPage from './Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Animated } from 'react-native/types_generated/index';

const ProductPage = () => {
    const [page, setPage] = useState(0); 
    const [Mdata, setMdata] = useState(grocdata); 
    const [sdata,setsdata]=useState('');
    const [filtered,setfiltered]=useState(Mdata);
    const [inp,setinp]=useState(false);
    const [Cart,setcart]=useState([]);
    const fadeanim=useRef(new Animated.Value(0)).current;
    const [showmsg,setshowmsg]=useState(false);
    useEffect(()=>{
        const loadcart=async()=>{
            
            try{
                const email=await AsyncStorage.getItem('userEmail');
                const key=`cart_${email}`;
                const storedcart=await AsyncStorage.getItem(key);
                if(storedcart){
                    setcart(JSON.parse(storedcart));
                }
            }catch(e){
                console.error('failed',e);
            }
        };
        loadcart();
    },[]);
    useEffect(()=>{
        if(sdata===''){
            setfiltered(Mdata);
        }else{
            const fill=Mdata.filter(item=>
                item.name.toLowerCase().includes(sdata.toLowerCase())||
                item.desc.toLowerCase().includes(sdata.toLowerCase())
            );
            setfiltered(fill);
        }
    },[sdata,Mdata]);
    const showaddedAnimation=()=>{
        setshowmsg(true);
        fadeanim.setValue(0);
        Animated.sequence([
            Animated.timing(fadeanim,{
                toValue:1,
                duration:300,
                useNativeDriver:true,
            }),
            Animated.delay(800),
            Animated.timing(fadeanim,{
                toValue:0,
                duration:300,
                useNativeDriver:true,
            }),
        ]).start(()=>setshowmsg(false));
    }
    const Rater=({rating})=>{
        const maxStar=5;
        const fullstars=Math.floor(rating);
        const halfstars=rating-fullstars>=0.5;
        const emptystars=maxStar-fullstars-(halfstars?1:0)
        return(
            <View style={{flexDirection:'row',alignItems:'center'}}>
                {[...Array(fullstars)].map((_,i)=>(
                    <Icon key={`full-${i}`} name='star' size={17} color="#fcbb42ff"/>
                ))}
                {halfstars &&
                    <Icon key={"half"} name='star-half-full' size={17} color="#fcbb42ff" />}
                {[...Array(emptystars)].map((_,i)=>(
                    <Icon key={`empty-${i}`} name='star-o' size={17} color="#fcbb42ff" />
                ))}
            </View>


        );

    };
    
    
    const addtocart=async(product)=>{
        try{
            const email = await AsyncStorage.getItem('userEmail');
            const key = `cart_${email}`;
            const existing=await AsyncStorage.getItem(key);
            const updatedcart=existing?JSON.parse(existing):[];
            const existin=updatedcart.findIndex(i=>i.name===product.name);
            if(existin!==-1){
                updatedcart[existin].quantity+=1;
            }
            else{
                updatedcart.push({...product,quantity:1});
            }
            await AsyncStorage.setItem(key,JSON.stringify(updatedcart));
            setcart(updatedcart);
            showaddedAnimation();

        }catch(error){
            console.log('error adding to cart:',error);
        }
    };
    useEffect(() => {
        switch (page) {
            case 0:
                setMdata(grocdata); 
                setsdata('');
                break;
            case 1:
                setMdata(elecdata);
                setsdata('');
                break;
            case 2:
                setMdata(fashiondata);
                setsdata('');
                break;
            case 3:
                setMdata(booksdata);
                setsdata('');
                break;
            case 4:
                setMdata(sportsdata);
                setsdata('');
                break;
            case 5:
                setMdata(Toysdata);
                setsdata('');
                break;
            default:
                setMdata(grocdata); 
                setsdata('');
        }
    }, [page]); 
    

    return (
        <View style={styles.containers}>
            <Text style={{ fontSize: 20,fontWeight:'bold',marginTop:10,marginLeft:10,marginBottom:10,}}>CATEGORIES</Text>
            <ScrollView
                style={styles.catcont}
                horizontal
                scrollEnabled={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity
                    onPress={() => { setPage(0); }}
                    style={[styles.categoryItem, page === 0 && styles.actpage]}
                >
                    <Image source={groceries} style={styles.images} />
                    <Text style={styles.namer}>Groceries</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setPage(1); }}
                    style={[styles.categoryItem, page === 1 && styles.actpage]}
                >
                    <Image source={electronics} style={styles.images} />
                    <Text style={styles.namer}>Electronics</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setPage(2); }}
                    style={[styles.categoryItem, page === 2 && styles.actpage]}
                >
                    <Image source={fashion} style={styles.images} />
                    <Text style={styles.namer}>Fashion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setPage(3); }}
                    style={[styles.categoryItem, page === 3 && styles.actpage]}
                >
                    <Image source={books} style={styles.images} />
                    <Text style={styles.namer}>Books</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setPage(4); }}
                    style={[styles.categoryItem, page === 4 && styles.actpage]}
                >
                    <Image source={sports} style={styles.images} />
                    <Text style={styles.namer}>Sports</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setPage(5); }}
                    style={[styles.categoryItem, page === 5 && styles.actpage]}
                >
                    <Image source={toys} style={styles.images} />
                    <Text style={styles.namer}>Toys</Text>
                </TouchableOpacity>
            </ScrollView>
            <LinearGradient
             colors={['#00e1ffff','#bce7d5ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                >
            
                
            <TouchableOpacity style={[styles.inputer,inp && {borderColor:'#0c0e0fff',}]}
                onPress={()=>{setinp(true)}}>
                <Icon name='search' size={30} color='#000' style={styles.iconer}></Icon>
                <TextInput value={sdata} onChangeText={setsdata} placeholder='Search' style={{marginLeft:5,padding:10,fontSize:18,width:"100%",}}></TextInput>
            </TouchableOpacity>
            
            </LinearGradient>
            
            <ScrollView style={{borderTopWidth:1,borderTopColor:'#d3d3d3',height:'100%'}}>
                {filtered.map((data, index) => {
                    return (
                        <View key={index} style={styles.outercont}>
                            <View style={styles.left}>
                                <Image source={data.img} style={styles.productImage} />
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.heade}>{data.name}</Text>
                                <Text>{data.desc}</Text>
                                <View style={{flexDirection:'row',paddingVertical:5,}}>
                                    <Text style={{fontWeight:'bold',}}>{data.rating} </Text>
                                    <Rater rating={data.rating}/>

                                </View>

                                <Text>{data.vol}</Text>
                                <View style={styles.pricer}>
                                    <Text style={{fontWeight:'bold',fontSize:20}}>{'\u20B9'}{data.price - (data.price * data.discount) / 100}</Text>
                                    <Text style={{fontSize:17,}}>M.R.P :</Text>
                                    <Text style={{textDecorationLine:'line-through',fontSize:17}}>{'\u20B9'}{data.price}</Text>
                                </View>
                                <Text>({data.discount} is off)</Text>
                                <TouchableOpacity style={styles.cartbtn}
                                    onPress={()=>{addtocart(data);}}>
                                    <Text style={{textAlign:'center',fontSize:18,color:'black',fontWeight:'bold',paddingVertical:5}}>Add to cart</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                })}
            </ScrollView>
            {showmsg && 
            <Animated.View
                style={{
                position: 'absolute',
                bottom: 20,
                alignSelf: 'center',
                backgroundColor: '#3d9423ff',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 20,
                opacity: fadeanim,
            }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Added to cart!</Text>
            </Animated.View>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    containers: {
        width:'100%',

        height:'100%',
    },
    catcont: {
        flexDirection: 'row',
        borderWidth: 1,
        height:100,
       
        borderColor: '#d3d3d3',
        backgroundColor: '#ffffff',
    },
    inputer:{
        borderWidth:1,
        marginBottom:10,
        borderColor:'#d3d3d3',
        marginHorizontal:10,
        marginTop:10,
        flexDirection:'row',
        borderRadius:20,
        alignItems:'center',
        backgroundColor:'white',
    },
    iconer:{
        paddingVertical:5,
        marginLeft:15,
    },
    images: {
        width: 30,
        height: 30,
        marginBottom: 5,
    },
   
    categoryItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRightWidth: 1,
        borderColor: '#d3d3d3',
        paddingVertical:10,
    },
    outercont:{
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical: 10,
        borderBottomWidth:1.5,
        borderBottomColor: '#d3d3d3',
        gap:10,
    },
    namer: {
        fontSize: 17,
        fontWeight: '500',
       
    },
    heade:{
        fontSize:17,
        fontWeight:'bold',

    },
    actpage: {
        backgroundColor: '#fcf5e6ff',
    },
    left: {
        width:150,
    },
    right: {
        flex:1,
        paddingRight:10,
        justifyContent:'center',
    },
    productImage: {
        width: 150,
        height: 210,
    },
    pricer:{
        flexDirection:'row',
        gap:6,
        flexWrap:'wrap'
,    },
    cartbtn:{
        marginTop:5,
        backgroundColor:'#ebbd29ff',
        borderRadius:20,

    }
});

export default ProductPage;
