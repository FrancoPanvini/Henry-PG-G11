import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Common/input/index';
import CustomButton from '../../components/Common/button/index';
import Container from '../../components/Common/container';

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

/* import ImagePicker from '../common/ImagePicker'; */

const optionsPerPage = [2, 3, 4];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#316B83',
    textAlign: 'center',
    height: '100%',
  },
  title: {
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 10,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 10,
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  input: {
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    flex: 1,
    width: 100,
    height: 100,
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
});

const ScreenContainer = ({children, style}) => (
  <ScrollView style={style}>
    <View>{children}</View>
  </ScrollView>
);
const RegisterComponent = ({
  onSubmit,
  onChange,
  form,
  errors,
  loading,
  error,
}) => {
  /* const { signIn } = React.useContext(AuthContext); */
  const {navigate} = useNavigation();

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>ADOGTAME</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.avatar}
          source={require('../../assets/footprint.png')}
        />
      </View>

      <Input
        label="Nombre y Apellido"
        placeholder="Ingrese Nombre y Apellido"
        value={form.nombreCompleto}
        onChangeText={value => {
          onChange({name: 'nombreCompleto', value});
        }}
        errors={errors.nombreCompleto}
        style={styles.input}
      />
      <Input
        label="E-mail"
        placeholder="Ingrese E-mail"
        value={form.email}
        onChangeText={value => {
          onChange({name: 'email', value});
        }}
        errors={errors.email}
        style={styles.input}
      />
      <Input
        label="Contraseña"
        placeholder="Ingrese Contraseña"
        value={form.contraseña}
        onChangeText={value => {
          onChange({name: 'contraseña', value});
        }}
        errors={errors.contraseña}
        style={styles.input}
        secure={true}
      />
      <Input
        label="Repetir Contraseña"
        placeholder="Ingrese Contraseña"
        value={form.contraseñaBis}
        onChangeText={value => {
          onChange({name: 'contraseñaBis', value});
        }}
        errors={errors.contraseñaBis}
        style={styles.input}
        secure={true}
      />
      <Input
        label="Teléfono"
        placeholder="Ingrese Teléfono"
        value={form.telefono}
        onChangeText={value => {
          onChange({name: 'telefono', value});
        }}
        errors={errors.telefono}
        style={styles.input}
      />

      <Text></Text>
      <CustomButton
        loading={loading}
        style={styles.button}
        disabled={loading}
        onPress={() => onSubmit()}
        text="Registrar"></CustomButton>
    </ScreenContainer>
  );
};

export default RegisterComponent;
