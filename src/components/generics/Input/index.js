/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TextInput, Text, View} from 'react-native';
import {Padder as PadderContainer} from '../../containers';
import Styles from './styles';

const Input = props => {
  const {title, value, onChangeText, error} = props;
  return (
    <View
      style={{
        marginBottom: 16,
      }}>
      <PadderContainer style={Styles.rowContainer}>
        <View style={Styles.flex1}>
          <Text>{title}</Text>
        </View>
        <TextInput
          {...props}
          value={value}
          style={Styles.inputContainer}
          placeholder={title}
          onChangeText={text => onChangeText(text)}
        />
      </PadderContainer>
      {error !== '' && (
        <View style={Styles.errorContainer}>
          <Text style={Styles.errorInput}>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
