import React from "react";
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Common/input/index';
import CustomButton from "../../components/Common/button/index";
import Container from "../../components/Common/container"


import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";

/* import ImagePicker from '../common/ImagePicker'; */

const optionsPerPage = [2, 3, 4];


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginVertical: 10,
      borderRadius: 5
    },
  });



  const ScreenContainer = ({ children }) => (
    <ScrollView>
      <View>{children}</View>
      </ScrollView>
  );
  const LoginComponent = ({ onSubmit, onChange, form, errors, loading }) => {
    /* const { signIn } = React.useContext(AuthContext); */
    const {navigate} = useNavigation();
  
    return (    
        <ScreenContainer>
          <Text>Sign In Screen</Text>

          <Input
            label="Usuario" 
            placeholder="Ingrese Usuario/Mail"
            value={form.mail}
            onChangeText={(value) => {onChange({name:"mail",value})}}
            errors={errors?.username}
          />
          <Input
            label="Contraseña"
            placeholder="Ingrese Contraseña"
            value={form.password}
            onChangeText={(value) => {onChange({name:"password",value})}}
            errors={errors?.password}
          />

          <Text></Text>
          <CustomButton onPress={() => onSubmit()} loading={loading} disabled={loading} text="Iniciar Sesión"></CustomButton>
          <Text></Text>
          <CustomButton onPress={() => navigate("Register")} text="Registrate"></CustomButton>
        </ScreenContainer>

);
};

export default LoginComponent