import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Appbar, Card} from 'react-native-paper';
import logoutUser from '../context/actions/auth/logout';
import Input from '../components/Common/input/index';
import CustomButton from './Common/button';

/* import ImagePicker from '../common/ImagePicker'; */

const optionsPerPage = [2, 3, 4];

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
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 10,
    width: '40%',
    backgroundColor: 'red',
    borderColor: 'transparent',
    color: 'black',
  },
  buttonE: {
    marginHorizontal: 20,
    marginBottom: 10,
    width: '40%',
    backgroundColor: 'green',
    borderColor: 'transparent',
    color: 'black',
  },
  containerButtons: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export const Profile = ({usuario, authDispatch}) => {
  const onUserLogout = () => {
    Alert.alert('Cerrando Sesión!', 'Está seguro que desea continuar?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };
  return (
    <>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Adogtame" />
      </Appbar.Header>

      <ScrollView style={{backgroundColor: '#E5E7EB'}}>
        <Text style={styles.header}>Mis datos</Text>
        <Input
          label="Nombre"
          placeholder="Ingrese Contraseña"
          value={usuario.name}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Mail"
          placeholder="Ingrese Contraseña"
          value={usuario.mail}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Teléfono"
          placeholder="Ingrese Contraseña"
          value={usuario.phone}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Dirección"
          placeholder="Ingrese Contraseña"
          value={usuario.direction}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Ciudad"
          placeholder="Ingrese Contraseña"
          value={usuario.city}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Provincia"
          placeholder="Ingrese Contraseña"
          value={usuario.province}
          onChangeText={value => {}}
          style={styles.input}
        />
        <Input
          label="Pais"
          placeholder="Ingrese Contraseña"
          value={usuario.country}
          onChangeText={value => {}}
          style={styles.input}
        />

        <View style={styles.containerButtons}>
          <CustomButton
            text="Editar"
            style={styles.buttonE}
            icon="pencil"
            onPress={() => onUserLogout()}></CustomButton>
          <CustomButton
            text="Salir"
            style={styles.button}
            icon="logout"
            onPress={() => onUserLogout()}></CustomButton>
        </View>
      </ScrollView>
    </>
  );
};

export const Publications = ({publications, data, loading}) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
      <Appbar.Header>
      <Appbar.BackAction onPress={() => {}} />
        <Appbar.Content title="Adogtame" />
      </Appbar.Header>

      <ScrollView style={{backgroundColor: '#E5E7EB'}}>
        <Text style={styles.header}>Mis mascotas</Text>
        {loading && <ActivityIndicator />}
        {publications.map((pub, index) => {
          const diffDays =
            new Date().getTime() - new Date(pub.createdAt).getTime();
          const daysPassed = Math.floor(diffDays / (1000 * 60 * 60 * 24));
          return (
            <Card style={styles.card} key={pub.id}>
              <Card.Cover source={{uri: pub.petPic}} />
              <Card.Content>
                <Text style={styles.title}>
                  {pub.name.trim().replace(/^\w/, c => c.toUpperCase())}
                </Text>
                <Text style={styles.description}>
                  En adopcion hace: {daysPassed} dias
                </Text>
                <Text
                  style={
                    styles.description
                  }>{`Ubicacion: ${pub.city}, ${pub.province}, ${pub.country}`}</Text>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </>
  );
};
