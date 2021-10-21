import React, {useState, useContext} from 'react';
import LoginComponent from '../../components/Login'
import {GlobalContext} from '../../context/Provider';

import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import login from '../../context/actions/auth/login';



 
  const SignIn = ({ navigation }) => {
    const [form, setForm] = useState({});
    const {
      authDispatch,
      authState: {error, loading},
    } = useContext(GlobalContext);
  
    const onSubmit = () => {

      if(form.mail && form.password) {
        login(form)(authDispatch)

      }
    }
    const onChange = ({name, value}) => {
      setForm({...form, [name]: value});}
    /* const { signIn } = React.useContext(AuthContext); */
  
    return (
      <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}/>
    );
  };

  export default SignIn
