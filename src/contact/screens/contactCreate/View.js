/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Base as BaseContainer} from '../../../components/containers';
import {Input} from '../../../components/generics';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../configs/Colors';
import Styles from './styles';
import {usePrevious} from '../../../utils/helper';
import {ADD_CONTACT_SUCCESS, ADD_CONTACT_FAILED} from '../../contactConstants';
import {isNumber} from '../../../utils/helper';

const ContactCreate = props => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
  });
  const [error, setError] = useState({
    errorfirstName: '',
    errorlastName: '',
    errorage: '',
  });
  const {firstName, lastName, age} = form;
  const {errorfirstName, errorlastName, errorage} = error;
  const {
    navigation,
    addContact,
    contactAction,
    addContactFetch,
    addContactError,
  } = props;
  const prevContactAction = usePrevious(contactAction);

  useEffect(() => {
    if (prevContactAction && prevContactAction !== contactAction) {
      switch (contactAction) {
        case ADD_CONTACT_SUCCESS:
          navigation.pop();
          break;
        case ADD_CONTACT_FAILED:
          Alert.alert('cannot addd this contact', addContactError?.message);
          break;
        default:
          break;
      }
    }
  }, [contactAction, navigation, prevContactAction, addContactError]);

  const onChangeText = (label, value, validation = []) => {
    if (validation.length > 0) {
      for (let index = 0; index < validation.length; index++) {
        if (
          validation[index] === 'ONLYNUMBER' &&
          isNumber.test(value) === false
        ) {
          setForm({
            ...form,
            [`${label}`]: value.replace(/[^0-9]/g, ''),
          });
          setError({
            ...error,
            [`error${label}`]: '',
          });
          return;
        }
        if (validation[index] === 'ONLYSTRING') {
          setForm({
            ...form,
            [`${label}`]: value.replace(/[^a-zA-Z.,\s]/g, ''),
          });
          setError({
            ...error,
            [`error${label}`]: '',
          });
          return;
        }
        if (validation[index] === 'MANDATORY' && value.length === 0) {
          setForm({
            ...form,
            [`${label}`]: value,
          });
          setError({
            ...error,
            [`error${label}`]: 'Bagian ini harus diisi',
          });
          return;
        }
        if (validation[index] === 'MINLENGTH3' && value.length <= 3) {
          setForm({
            ...form,
            [`${label}`]: value,
          });
          setError({
            ...error,
            [`error${label}`]: 'Minimun 3 karakter',
          });
          return;
        }
        if (validation[index] === 'MINLENGTH2' && value.length < 2) {
          setForm({
            ...form,
            [`${label}`]: value,
          });
          setError({
            ...error,
            [`error${label}`]: 'Minimun 2 karakter',
          });
          return;
        }
      }
    }
    setForm({
      ...form,
      [`${label}`]: value,
    });
    setError({
      ...error,
      [`error${label}`]: '',
    });
    return;
  };

  const onSubmit = () => {
    addContact({
      firstName,
      lastName,
      age: Number(age),
    });
  };

  const renderButton = () => {
    const isEmpty = firstName === '' || lastName === '' || age === '';
    return (
      <View style={{...Styles.buttonContainer, opacity: isEmpty ? 0.5 : 1}}>
        <TouchableOpacity
          style={Styles.btnPrimary}
          disabled={isEmpty}
          onPress={onSubmit}>
          {addContactFetch ? (
            <ActivityIndicator color={Colors.main.grey} />
          ) : (
            <Text style={Styles.btnText}>Save Contact</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <BaseContainer
      title="Contact Detail"
      onBackPress={() => navigation.pop()}
      fullView>
      <View style={Styles.pictureContainer}>
        <Icon name="person-circle-outline" size={80} color={Colors.main.grey} />
      </View>
      <Input
        value={firstName}
        title="First Name"
        error={errorfirstName}
        onChangeText={text =>
          onChangeText('firstName', text, [
            'ONLYSTRING',
            'MANDATORY',
            'MINLENGTH3',
          ])
        }
      />
      <Input
        value={lastName}
        title="Last Name"
        error={errorlastName}
        onChangeText={text =>
          onChangeText('lastName', text, [
            'ONLYSTRING',
            'MANDATORY',
            'MINLENGTH3',
          ])
        }
      />
      <Input
        value={age}
        title="Age"
        error={errorage}
        onChangeText={text =>
          onChangeText('age', text, ['ONLYNUMBER', 'MANDATORY', 'MINLENGTH2'])
        }
        keyboardType="numeric"
      />
      {renderButton()}
    </BaseContainer>
  );
};

export default ContactCreate;
