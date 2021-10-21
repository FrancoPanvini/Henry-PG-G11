import React, {useState} from "react";
import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import { RadioButton, Text as TextPaper } from 'react-native-paper';
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
    
    const CreatePetComponent = ({onChangeText, onSubmit, form, sheetRef, openSheet, closeSheet, onFileSelected}) => {
    const [photo, setPhoto] =useState({})
    const [especie, setEspecie] = React.useState('');
    const [tamaño, setTamaño] = React.useState('');
    const [sexo, setSexo] = React.useState('');
    return (
      <ScrollView>
      <ScreenContainer>
          <View>
          <Text>Postulá tu Mascota</Text>
          <Input
          label="Nombre"
          placeholder="Ingrese Nombre"
          value={form.name}
          onChangeText={(value)=>onChangeText({name: "name", value:value})}/>

          <Input
          label="Especie"
          value={especie}
          disabled={true}
          placeholder="Ingrese Tipo"/>


                  <RadioButton.Group
                    onValueChange={newValue => {
                      onChangeText({name: "PetsTypeid", value:newValue=='Perro' ? 'p' : 'g'})
                      setEspecie(newValue)}}
                    value={especie}
                  >
                    <RadioButton.Item
                      label="Perro"
                      value="Perro"
                      color="#1E6DAD"
                    />
                    <RadioButton.Item
                      label="Gato"
                      value="Gato"
                      color="#1E6DAD"
                    />
                  </RadioButton.Group>

          <Input
          label="Sexo"
          value={sexo}
          disabled={true}
          placeholder="Ingrese Tipo"/>
                  <RadioButton.Group
                    onValueChange={newValue => {
                      onChangeText({name: "sex", value:newValue === 'Macho' ? 'm' : 'h'})
                      setSexo(newValue)}}
                    value={sexo}
                  >
                    <RadioButton.Item
                      label="Macho"
                      value="Macho"
                      color="#1E6DAD"
                    />
                    <RadioButton.Item
                      label="Hembra"
                      value="Hembra"
                      color="#1E6DAD"
                    />
                  </RadioButton.Group>


          <Input
          label="Edad"
          placeholder="Ingrese En Años Cumplidos"
          value={form.age}
          onChangeText={(value)=>onChangeText({name: "age", value:value})}/>

          <Input
          label="Tamaño"
          value={tamaño}
          disabled={true}/>

                  <RadioButton.Group
                    onValueChange={newValue => {
                      onChangeText({name: "size", value:newValue==='Chico' ? 'c' : newValue==='Mediano' ? 'm' : 'g'})
                      setTamaño(newValue)}}
                    value={tamaño}
                  >
                    <RadioButton.Item
                      label="Chico"
                      value="Chico"
                      color="#1E6DAD"
                    />
                    <RadioButton.Item
                      label="Mediano"
                      value="Mediano"
                      color="#1E6DAD"
                    />
                    <RadioButton.Item
                      label="Grande"
                      value="Grande"
                      color="#1E6DAD"
                    />
                  </RadioButton.Group>

          <Input
          label="Descripción"
          placeholder="Ingrese Descripción"
          value={form.description}
          onChangeText={(value)=>onChangeText({name: "description", value:value})}/>

          
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
          <Text></Text>
          </View>
          
        </ScreenContainer>
        <PhotoPicker setPhoto={setPhoto} onFileSelected={onFileSelected} ref={sheetRef}/>
        </ScrollView>
    );
  };

export default CreatePetComponent