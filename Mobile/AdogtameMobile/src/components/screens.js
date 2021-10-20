import React from "react";
import "intl";
import 'intl/locale-data/jsonp/en'
import { View, Text, StyleSheet, Button, Switch, Image, TouchableOpacity, ScrollView } from "react-native";
import { DataTable } from 'react-native-paper';

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
    <View style={styles.container}>{children}</View>
  );
  
  





  export const Profile = ({usuario}) => (
    <ScreenContainer>
      <Text>{usuario.name}</Text>
      <Text>{usuario.mail}</Text>
      <Text>{usuario.phone}</Text>
      <Text>{usuario.direction}</Text>
      <Text>{usuario.city}</Text>
      <Text>{usuario.province}</Text>
      <Text>{usuario.country}</Text>
      <Button title="Log Out" color="red" onPress={()=> console.log("Andate")}></Button>
    </ScreenContainer>
  );



  export const Publications = ({publications}) => {
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    
  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
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
    
  );
  };


  