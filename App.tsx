import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/Components/loginscreen';
import DashboardScreen from './src/Components/dashboard'
import Signup from './src/Components/Signup';
import HomePage from './src/Components/Home';
import ProductPage from './src/Components/Product';
import CartPage from './src/Components/Cart';
import ProfilePage from './src/Components/Profile';
import SettingsPage from './src/Components/Settings';
//import LinearGradient from 'react-native-linear-gradient';
const Stack = createStackNavigator();

function App() {
  return (
    <View style={styles.container}>
      {/*<ProductPage></ProductPage>*/}
      {/*<HomePage></HomePage>*/}
      {/*<CartPage></CartPage>*/}
      {/*<ProfilePage></ProfilePage>*/}
      {/*<SettingsPage></SettingsPage>*/}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} 
          options={{
            headerShown: false,
            headerStyle: styles.hp,
            headerTintColor: '#fff',       
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
              textAlign:'center',
            },
            
            
          }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{headerShown: false,}} />
          <Stack.Screen name='Signup' component={Signup} options={{headerShown:false,}}/>
        </Stack.Navigator>

      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hp:{
    backgroundColor: "#5eccffff",
    borderBottomLeftRadius:35,
    borderBottomRightRadius:35,
    color:'white',
    fontWeight:'bold',
    overflow:'hidden',
    
  }
});

export default App;
