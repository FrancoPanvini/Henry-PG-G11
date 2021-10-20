import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import Input from '../Common/input/index'
import CustomButton from '../Common/button/index'
import PhotoPicker from "../Common/photopicker";


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
    <View>{children}</View>
    );
    
    const CreatePetComponent = ({onChange, onSubmit, form, sheetRef, openSheet, closeSheet, onFileSelected}) => {
  const [photo, setPhoto] =useState({})
  return (
      <View>
      <ScreenContainer>
          <View>
          <Text>Postulá tu Mascota</Text>
          <Input
          label="Nombre"
          placeholder="Ingrese E-mail"/>
          <Input
          label="Tipo"
          placeholder="Ingrese E-mail"/>
          <Input
          label={photo.path}
          placeholder="Ingrese E-mail"/>
          <Input
          label="Descripción"
          placeholder="Ingrese E-mail"/>
          <Input
          label="Ubicación"

          placeholder="Ingrese E-mail"/>
          <Image
          style={{marginLeft:125}}
          width={150}
          height={150}
          source={{uri: photo.path}}
          />
          <TouchableOpacity onPress={openSheet}>
          <Text style={{margin:15,textAlign:"center",justifyContent:"center", color:"blue"}}>Selecciona Imágenes</Text>
          </TouchableOpacity>
          
          <CustomButton onPress={()=>onSubmit()} text="Postular"/>
          </View>
          
        </ScreenContainer>
        <PhotoPicker setPhoto={setPhoto} onFileSelected={onFileSelected} ref={sheetRef}/>
        </View>
    );
  };

export default CreatePetComponent