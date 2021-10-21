import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Switch,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Appbar, RadioButton, Text as TextPaper} from 'react-native-paper';
import Input from '../Common/input/index';
import CustomButton from '../Common/button/index';
import PhotoPicker from '../Common/photopicker';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5b461',
    margin: 25,
    color: 'white',
  },
  title: {
    fontSize: 20,
    color: 'white',
    margin: 2,
  },
  description: {
    fontSize: 15,
    color: 'white',
    margin: 2,
  },
  header: {
    width: '100%',
    textAlign: 'center',
    color: '#275568',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  input: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 10
  },
  radioButtonI: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: "#e1d2d2",
    borderColor: 'black',
    color: 'white',
    borderRadius: 10
  },
  buttonE: {
    marginBottom: 10,
    width: '40%',
    backgroundColor: 'green',
    borderColor: 'transparent',
    color: 'black',
    alignSelf: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

const CreatePetComponent = ({
  onChangeText,
  onSubmit,
  form,
  sheetRef,
  openSheet,
  closeSheet,
  onFileSelected,
}) => {
  const [photo, setPhoto] = useState({});
  const [especie, setEspecie] = React.useState('');
  const [tamaño, setTamaño] = React.useState('');
  const [sexo, setSexo] = React.useState('');
  const [disabled, setDisabled] = useState(true)
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Adogtame" />
      </Appbar.Header>

      <ScrollView style={{backgroundColor: '#E5E7EB'}}>
        <Text style={styles.header}>Postula una mascota</Text>
        <View>
          <Input
            label="Nombre"
            placeholder="Ingrese Nombre"
            value={form.name}
            onChangeText={value => onChangeText({name: 'name', value: value})}
            style={styles.input}
            disabled={true}
          />

          <Input
            label="Especie"
            value={especie}
            disabled={true}
            placeholder="Ingrese Tipo"
            style={styles.input}
          />

          <RadioButton.Group
            style={styles.radioButtonG}
            onValueChange={newValue => {
              onChangeText({
                name: 'PetsTypeid',
                value: newValue == 'Perro' ? 'p' : 'g',
              });
              setEspecie(newValue);
            }}
            value={especie}>
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Perro"
              value="Perro"
              color='white'
            />
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Gato"
              value="Gato"
              color="white"
            />
          </RadioButton.Group>

          <Input
            label="Sexo"
            value={sexo}
            disabled={true}
            placeholder="Ingrese Tipo"
            style={styles.input}
          />
          <RadioButton.Group
            onValueChange={newValue => {
              onChangeText({
                name: 'sex',
                value: newValue === 'Macho' ? 'm' : 'h',
              });
              setSexo(newValue);
            }}
            style={styles.radioButtonG}
            value={sexo}>
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Macho"
              value="Macho"
              color='white'
            />
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Hembra"
              value="Hembra"
              color='white'
            />
          </RadioButton.Group>

          <Input
            label="Edad"
            placeholder="Ingrese En Años Cumplidos"
            value={form.age}
            onChangeText={value => onChangeText({name: 'age', value: value})}
            style={styles.input}
          />

          <Input
            style={styles.input}
            label="Tamaño"
            value={tamaño}
            disabled={true}
          />

          <RadioButton.Group
            onValueChange={newValue => {
              onChangeText({
                name: 'size',
                value:
                  newValue === 'Chico'
                    ? 'c'
                    : newValue === 'Mediano'
                    ? 'm'
                    : 'g',
              });
              setTamaño(newValue);
            }}
            value={tamaño}
            style={styles.radioButtonG}>
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Chico"
              value="Chico"
              color='white'
            />
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Mediano"
              value="Mediano"
              color='white'
            />
            <RadioButton.Item
              style={styles.radioButtonI}
              label="Grande"
              value="Grande"
              color='white'
            />
          </RadioButton.Group>

          <Input
            label="Descripción"
            placeholder="Ingrese Descripción"
            value={form.description}
            onChangeText={value =>
              onChangeText({name: 'description', value: value})
            }
            style={styles.input}
          />

          <Image
            style={{
              alignSelf: 'center',
              borderWidth: 2,
              borderColor: 'gray',
              borderRadius: 10,
            }}
            width={150}
            height={150}
            source={{
              uri: photo.path
                ? photo.path
                : 'https://drpp-ny.org/wp-content/uploads/2014/07/sorry-image-not-available.png',
            }}
          />
          <TouchableOpacity onPress={openSheet}>
            <Text
              style={{
                margin: 15,
                textAlign: 'center',
                justifyContent: 'center',
                color: 'blue',
                fontWeight: 'bold',
              }}>
              Selecciona Imágenes
            </Text>
          </TouchableOpacity>

          <CustomButton
            onPress={() => onSubmit()}
            text="Postular"
            icon="plus-circle"
            style={styles.buttonE}
          />
          <Text></Text>
        </View>

        <PhotoPicker
          setPhoto={setPhoto}
          onFileSelected={onFileSelected}
          ref={sheetRef}
        />
      </ScrollView>
    </>
  );
};

export default CreatePetComponent;
