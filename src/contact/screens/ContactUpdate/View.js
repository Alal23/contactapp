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
import {
  GET_CONTACT_DETAIL_SUCCESS,
  GET_CONTACT_DETAIL_FAILED,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAILED,
} from '../../contactConstants';
import {isNumber} from '../../../utils/helper';

const ContactUpdate = props => {
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
    updateContact,
    getContactDetail,
    contactAction,
    updateContactFetch,
    updateContactError,
    getContactDetailError,
    getContactDetailResponse,
    route: {
      params: {id},
    },
  } = props;
  const prevContactAction = usePrevious(contactAction);

  useEffect(() => {
    if (id) {
      getContactDetail({
        id: id,
      });
    }
  }, [getContactDetail, id]);

  useEffect(() => {
    if (prevContactAction && prevContactAction !== contactAction) {
      switch (contactAction) {
        case UPDATE_CONTACT_SUCCESS:
          navigation.pop();
          break;
        case UPDATE_CONTACT_FAILED:
          Alert.alert(
            'cannot update this contact',
            updateContactError?.message,
          );
          break;
        case GET_CONTACT_DETAIL_SUCCESS:
          onSuccessGetDetail();
          break;
        case GET_CONTACT_DETAIL_FAILED:
          Alert.alert(
            'cannot get this contact',
            getContactDetailError?.message,
          );
          break;
        default:
          break;
      }
    }
  }, [
    contactAction,
    getContactDetailError?.message,
    navigation,
    onSuccessGetDetail,
    prevContactAction,
    updateContactError,
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSuccessGetDetail = () => {
    console.log('getContactDetailResponse', getContactDetailResponse);
    setForm({
      ...getContactDetailResponse,
      age: getContactDetailResponse?.age?.toString(),
    });
  };
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
    updateContact({
      id: getContactDetailResponse?.id,
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
          {updateContactFetch ? (
            <ActivityIndicator color={Colors.main.grey} />
          ) : (
            <Text style={Styles.btnText}>Update Contact</Text>
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

export default ContactUpdate;
