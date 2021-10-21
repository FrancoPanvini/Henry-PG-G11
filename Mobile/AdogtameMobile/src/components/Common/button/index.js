import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const CustomButton = ({text, onPress, loading, disabled, style, icon}) => (
  <Button loading={loading} icon={icon} disabled={disabled} style={style} color={style?.color} dark={true} mode="contained" onPress={() => onPress()}>
    {text}
  </Button>
);

/* const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    fontSize: 20,
    margin: 10,
    color: 'white',
    textAlign: 'center'
  }, */
/* 
}); */

export default CustomButton;