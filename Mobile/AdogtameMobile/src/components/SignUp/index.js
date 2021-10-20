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
  const RegisterComponent = ({ onSubmit, onChange, form, errors, loading, error }) => {
    /* const { signIn } = React.useContext(AuthContext); */
    const {navigate} = useNavigation();
  
    return (    
        <ScreenContainer>
          <Text>Register Screen</Text>

          <Input
            label="Nombre y Apellido" 
            placeholder="Ingrese Nombre y Apellido"
            value={form.nombreCompleto} 
            onChangeText={(value) => {onChange({name:"nombreCompleto",value})}}
            errors={errors.nombreCompleto}
          />
          <Input
            label="E-mail"
            placeholder="Ingrese E-mail"
            value={form.email} 
            onChangeText={(value) => {onChange({name:"email",value})}}
            errors={errors.email}
          />
          <Input
            label="Contraseña" 
            placeholder="Ingrese Contraseña"
            value={form.contraseña} 
            onChangeText={(value) => {onChange({name:"contraseña",value})}}
            errors={errors.contraseña}
          />
          <Input
            label="Repetir Contraseña" 
            placeholder="Ingrese Contraseña"
            value={form.contraseñaBis} 
            onChangeText={(value) => {onChange({name:"contraseñaBis",value})}}
            errors={errors.contraseñaBis}
          />
          <Input
            label="Teléfono"
            placeholder="Ingrese Teléfono"
            value={form.telefono} 
            onChangeText={(value) => {onChange({name:"telefono",value})}}
            errors={errors.telefono}
          />

          <Text></Text>
          <CustomButton loading={loading} disabled={loading} onPress={()=>onSubmit()} text="Registrar"></CustomButton>
        </ScreenContainer>

);
};

export default RegisterComponent
