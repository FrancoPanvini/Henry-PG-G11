import React, { useEffect, useState } from "react";
import { BottomNavigation, Text, withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostPet from '../screens/CreatePet/index'

import {
  SignIn,
  CreatePet,
  Publications,
  Profile
} from "../components/screens";

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();










const HomeNavigator = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'publicados', title: 'Publicaciones', icon: 'dog' },
    { key: 'publicar', title: 'Publicar', icon: 'plus' },
    { key: 'perfil', title: 'Perfil', icon: 'account-circle' },
  ]);
  const [user, setUser] = useState({})
  const [publications, setPublications] = useState([])

  

  useEffect(() => {
    try{
      const getUser = async() => {
        const userId = await AsyncStorage.getItem('user');
        
        
        await axios.get(`http://adogtameapi.herokuapp.com/users/${userId}`)
          .then(res => setUser({...res.data}))
          .catch(err=>console.log(err))
        await axios.get(`http://adogtameapi.herokuapp.com/pets?owner=${userId}`)
          .then(res => setPublications(res.data.rows))
          .catch(err=>console.log(err))
      }

      let isMounted = true;
      getUser()
      
      
      return () => { isMounted = false };
    }
    catch(error){console.log(error)}
  }, [])


  const PublishedRoute = () => <Publications publications={publications}/>;
  
  const ProfileRoute = () => <Profile usuario={user}/>;
  
  const PublishRoute = () => <PostPet/>;



  
  const renderScene = BottomNavigation.SceneMap({
    publicados: PublishedRoute,
    perfil: ProfileRoute,
    publicar: PublishRoute,
  });




    return (
      <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
        
      
    );
};



export default HomeNavigator;