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
import { Avatar } from 'react-native-paper';

/* import ImagePicker from '../common/ImagePicker'; */

const optionsPerPage = [2, 3, 4];

const ScreenContainer = ({children, style}) => (
  <ScrollView style={style}>
    <View >{children}</View>
  </ScrollView>
);
const LoginComponent = ({onSubmit, onChange, form, errors, loading}) => {
  /* const { signIn } = React.useContext(AuthContext); */
  const {navigate} = useNavigation();

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
      fontWeight: 'bold'

    },
    subtitle: {
      paddingHorizontal: 10,
      fontSize: 20,
      marginBottom: 10,
      color: 'white',
      textAlign: 'center'

    },
    button: {
      paddingHorizontal: 10,
      fontSize: 20,
      margin: 10,
      textAlign: 'center',
      backgroundColor: "#f5b461"
    },
    input: {
      paddingHorizontal: 20,
      marginBottom: 20,
      backgroundColor: 'white',
      borderColor: 'transparent'
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
      margin: 40,
      borderRadius: 100,
      alignItems: 'center',
    },
  });

  return (
    <ScreenContainer style={styles.container}>
      <Text style={styles.title}>ADOGTAME APP</Text>
      <Text style={styles.subtitle}>Gestiona tu refugio</Text>
      <View style={styles.imageContainer}>
      <Image  style={styles.avatar} source={require('../../assets/footprint.png')} />
      </View>
      <Input
        label="Usuario"
        placeholder="Ingrese Usuario/Mail"
        value={form.mail}
        onChangeText={value => {
          onChange({name: 'mail', value});
        }}
        errors={errors?.username}
        style={styles.input}
      />
      <Input
        label="Contraseña"
        placeholder="Ingrese Contraseña"
        value={form.password}
        onChangeText={value => {
          onChange({name: 'password', value});
        }}
        errors={errors?.password}
        style={styles.input}
        secure={true} 
      />

      <CustomButton
        onPress={() => onSubmit()}
        loading={loading}
        disabled={loading}
        text="Iniciar Sesión"
        style={styles.button} ></CustomButton>
      <CustomButton
        onPress={() => navigate('Register')}
        text="Registrate" style={styles.button}></CustomButton>
    </ScreenContainer>
  );
};

export default LoginComponent;
