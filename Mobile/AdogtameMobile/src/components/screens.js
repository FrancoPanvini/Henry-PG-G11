import React from "react";
import "intl";
import 'intl/locale-data/jsonp/en'
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator,Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';
import logoutUser from '../context/actions/auth/logout'
import Input from '../components/Common/input/index';

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





  export const Profile = ({usuario, authDispatch}) => {
    const onUserLogout = () => {
      Alert.alert("Cerrando Sesión!", "Está seguro que desea continuar?",[{
        text: "Cancelar",
        onPress: () => {},
      },
      {
        text: "OK",
        onPress: () =>{ logoutUser()(authDispatch)}
      }])
    }
    return(
    
    <ScreenContainer>
      <Input
            label="Nombre"
            placeholder="Ingrese Contraseña"
            value={usuario.name}
            onChangeText={(value) => {}}
            
          />
      <Input
            label="Mail"
            placeholder="Ingrese Contraseña"
            value={usuario.mail}
            onChangeText={(value) => {}}
            
          />
      <Input
            label="Teléfono"
            placeholder="Ingrese Contraseña"
            value={usuario.phone}
            onChangeText={(value) => {}}
           
          />
      <Input
            label="Dirección"
            placeholder="Ingrese Contraseña"
            value={usuario.direction}
            onChangeText={(value) => {}}
            
          />
      <Input
            label="Ciudad"
            placeholder="Ingrese Contraseña"
            value={usuario.city}
            onChangeText={(value) => {}}
            
          />
      <Input
            label="Provincia"
            placeholder="Ingrese Contraseña"
            value={usuario.province}
            onChangeText={(value) => {}}
            
          />
      <Input
            label="Pais"
            placeholder="Ingrese Contraseña"
            value={usuario.country}
            onChangeText={(value) => {}}
            
          />

      <Button title="Log Out" color="red" onPress={()=> onUserLogout()}></Button>
    </ScreenContainer>
  )};



  export const Publications = ({publications, data, loading}) => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <>
    {loading && <ActivityIndicator/>}
    {!loading && (

      <DataTable>
      <DataTable.Header>
        <DataTable.Title>Nombre</DataTable.Title>
        <DataTable.Title numeric>Solicitudes</DataTable.Title>
        <DataTable.Title numeric>Antigüedad</DataTable.Title>
        <DataTable.Title numeric></DataTable.Title>
      </DataTable.Header>
    {publications.map((pub,i) => {
      const diffDays = new Date().getTime() - new Date(pub.createdAt).getTime();
      const daysPassed = Math.floor(diffDays / (1000 * 60 * 60 * 24));
      return (
        <DataTable.Row key={i}>
        <DataTable.Cell>photo {pub.name}</DataTable.Cell>
        <DataTable.Cell numeric onPress={() => alert("Forms")}>5</DataTable.Cell>
        <DataTable.Cell numeric>{daysPassed} días</DataTable.Cell>
        <DataTable.Cell numeric>edit/del</DataTable.Cell>

      </DataTable.Row>
      
      )})}
      



      <DataTable.Pagination
        page={page}
        numberOfPages={2}
        onPageChange={(page) => setPage(page)}
        label=""
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
        />
    </DataTable>
      )}
      </>
    
      );
    };


  