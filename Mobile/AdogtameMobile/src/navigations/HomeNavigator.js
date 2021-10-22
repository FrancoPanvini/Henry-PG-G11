import React, { useEffect, useState, useContext } from "react";
import { BottomNavigation, Text, withTheme } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PostPet from '../screens/CreatePet/index'
import { GlobalContext } from "../context/Provider";
import getPets from '../context/actions/pets/getPets'

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
  const [loading, setLoading] = React.useState(false);
  const [petForms, setPetForms] = React.useState([]);
  const [routes] = React.useState([
    { key: 'publicados', title: 'Publicaciones', icon: 'dog' },
    { key: 'publicar', title: 'Publicar', icon: 'plus' },
    { key: 'perfil', title: 'Perfil', icon: 'account-circle' },
  ]);
  const [user, setUser] = useState({})
  const [publications, setPublications] = useState([])
  const {authDispatch} = useContext(GlobalContext);
  

  

  useEffect(() => {
    try{
      setLoading(true)
      const getUser = async() => {
        const userId = await AsyncStorage.getItem('user');
        
        
        await axios.get(`http://adogtameapi.herokuapp.com/users/mobile/${userId}`)
          .then(res => setUser({...res.data}))
          .catch(err=>console.log(err))
        let userPets = await axios.get(`http://adogtameapi.herokuapp.com/pets?owner=${userId}&adopted=false`)
          .catch(err=>console.log(err))
        
        
        userPets.data.rows.forEach(async (el) => {
          
          let forms = await axios.get(`http://adogtameapi.herokuapp.com/adoptions?pet=${el.id}`)
            .catch(err=>console.log(err))

             setPublications(prev => {
               return [...prev, {...el,forms: forms?.data}]
             })

        })
        setTimeout(() => {
          setLoading(false)
          
        }, 5000);
        
        
      }

      let isMounted = true;
      getUser()
      
      
      return () => { isMounted = false };
    }
    catch(error){console.log(error)}
  }, [])


  const PublishedRoute = () => <Publications loading={loading} publications={publications}/>;
  
  const ProfileRoute = () => <Profile authDispatch={authDispatch} usuario={user}/>;
  
  const PublishRoute = () => <PostPet usuario={user}/>;



  
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