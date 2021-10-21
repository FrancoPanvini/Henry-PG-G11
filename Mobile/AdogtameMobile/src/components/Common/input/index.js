import * as React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const CustomInput = ({placeholder, onChangeText, label, errors, value, style, secure,disabled}) => {
  const [text, setText] = React.useState('');

  return (
 

      <TextInput
      label={label}
      value={value ? value : null}
      placeholder={placeholder}
      disabled={disabled}
      onChangeText={text => onChangeText(text)}
      error={errors ? true : false}
      mode='flat'
      style={style}
      secureTextEntry={secure}
      selectionColor="white"
      underlineColor="black"
      />

  );
};

export default CustomInput;