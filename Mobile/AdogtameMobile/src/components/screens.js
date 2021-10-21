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
  const [disabled, setDisabled] = React.useState(true)
  const [edit, setEdit] = React.useState(true)
  const [editTitle, setEditTitle] = React.useState("EDITAR")
  const [editedUser, setEditedUser] = React.useState(usuario)
  const onUserChange = ({name,value}) => {
    setEditedUser({...editedUser, [name]: value})
  }

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
const handleEdit = () => {
  if(edit === true) {
    setDisabled(false)
    setEdit(false)
    setEditTitle("CONFIRMAR")
  }
  else{
    console.log(editedUser)
    //ACA SE AGREGA EL PUT
    setDisabled(true)
    setEdit(true)
    setEditTitle("EDITAR")
  }
}

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
          value={editedUser.name}
          onChangeText={value => onUserChange({name: 'name', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Mail"
          placeholder="Ingrese Contraseña"
          value={editedUser.mail}
          onChangeText={value => onUserChange({name: 'mail', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Teléfono"
          placeholder="Ingrese Contraseña"
          value={editedUser.phone}
          onChangeText={value => onUserChange({name: 'phone', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Link Web"
          placeholder="Ingrese Página Web del Refugio"
          value={editedUser.link_web}
          onChangeText={value => onUserChange({name: 'link_web', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Link Donaciones"
          placeholder="Ingrese Link p/ Recibir Donaciones"
          value={editedUser.link_donaciones}
          onChangeText={value => onUserChange({name: 'link_donaciones', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Responsable"
          placeholder="Ingrese Responsable del Refugio"
          value={editedUser.responsable}
          onChangeText={value => onUserChange({name: 'responsable', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Descripción"
          placeholder="Ingrese Descripción del Refugio"
          value={editedUser.description}
          onChangeText={value => onUserChange({name: 'description', value: value})}
          style={styles.input}
          disabled={disabled}
        />
        <Input
          label="Dirección"
          placeholder="Ingrese Contraseña"
          value={editedUser.direction}
          onChangeText={value => onUserChange({name: 'phone', value: value})}
          style={styles.input}
          disabled={true}
        />
        <Input
          label="Ciudad"
          placeholder="Ingrese Contraseña"
          value={editedUser.city}
          onChangeText={value => onUserChange({name: 'phone', value: value})}
          style={styles.input}
          disabled={true}
        />
        <Input
          label="Provincia"
          placeholder="Ingrese Contraseña"
          value={editedUser.province}
          onChangeText={value => onUserChange({name: 'province', value: value})}
          style={styles.input}
          disabled={true}
        />
        <Input
          label="Pais"
          placeholder="Ingrese Contraseña"
          value={editedUser.country}
          onChangeText={value => {}}
          style={styles.input}
          disabled={true}
        />

        <View style={styles.containerButtons}>
          <CustomButton
            text={editTitle}
            style={styles.buttonE}
            icon="pencil"
            onPress={() => handleEdit()}></CustomButton>
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
