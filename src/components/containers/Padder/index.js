import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const Padder = props => {
  const {children, style} = props;
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Padder;
