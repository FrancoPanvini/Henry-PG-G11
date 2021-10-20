import React, {useState, useContext} from 'react';
import RegisterComponent from '../../components/SignUp';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
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
import register from '../../context/actions/auth/register';
import {GlobalContext} from '../../context/Provider';

const Register = ({navigation}) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const {navigate} = useNavigation();
  const {
    authDispatch,
    authState: {error, loading, data},
  } = useContext(GlobalContext);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});

    if (value !== '') {
      if (name === 'contraseña' || name === 'contraseñaBis') {
        if (value.length < 8) {
          console.log('menor a 8');
          setErrors(prev => {
            return {...prev, [name]: 'Contraseña Mínima 8 Caracteres'};
          });
        } else {
          setErrors(prev => {
            return {...prev, [name]: null};
          });
        }
      } else {
        setErrors(prev => {
          return {...prev, [name]: null};
        });
      }
    } else {
      setErrors(prev => {
        return {...prev, [name]: 'Por Favor Complete El Campo'};
      });
    }
  };

  const onSubmit = async() => {
    if (!form.nombreCompleto || form.nombreCompleto === '') {
      setErrors(prev => {
        return {...prev, nombreCompleto: 'Por Favor Complete El Campo'};
      });
    }

    if (!form.email || form.email === '') {
      setErrors(prev => {
        return {...prev, email: 'Por Favor Complete El Campo'};
      });
    }

    if (!form.contraseña || form.contraseña === '') {
      setErrors(prev => {
        return {...prev, contraseña: 'Por Favor Complete El Campo'};
      });
    }

    if (!form.contraseñaBis || form.contraseñaBis === '') {
      setErrors(prev => {
        return {...prev, contraseñaBis: 'Por Favor Complete El Campo'};
      });
    }

    if (form.contraseña !== form.contraseñaBis) {
      setErrors(prev => {
        return {
          ...prev,
          contraseña: 'Las Contraseñas Deben Coincidir',
          contraseñaBis: 'Las Contraseñas Deben Coincidir',
        };
      });
    }

    if (!form.telefono || form.telefono === '') {
      setErrors(prev => {
        return {...prev, telefono: 'Por Favor Complete El Campo'};
      });
    }

    if (
      Object.values(form).length === 5 &&
      Object.values(form).every(item => item.trim().length > 0) &&
      Object.values(errors).every(item => !item)
    ) {
      const newUser = {
        name: form.nombreCompleto,
        mail: form.email,
        phone: form.telefono,
        password: form.contraseña,
        UsersTypeid: 'r',
      };
      console.log(newUser);
      await register(newUser)(authDispatch);
      navigate('Login');
    } else {
      console.log('hay errores');
    }
  };
  return (
    <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
  );
};

export default Register;
