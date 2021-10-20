import * as React from 'react';
import { Button } from 'react-native-paper';

const CustomButton = ({text, onPress, loading, disabled}) => (
  <Button loading={loading} disabled={disabled} mode="contained" onPress={() => onPress()}>
    {text}
  </Button>
);

export default CustomButton;