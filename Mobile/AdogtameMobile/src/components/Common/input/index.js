import * as React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';

const CustomInput = ({placeholder, onChangeText, label, errors, value,disabled}) => {
  const [text, setText] = React.useState('');

  return (
    <View>

      <TextInput
      label={label}
      value={value ? value : null}
      placeholder={placeholder}
      disabled={disabled}
      onChangeText={text => onChangeText(text)}
      error={errors ? true : false}
      />
      </View>
  );
};

export default CustomInput;