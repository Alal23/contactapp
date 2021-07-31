/* eslint-disable space-infix-ops */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from '../../../components/containers';
import Colors from '../../../configs/Colors';
import {validURL, usePrevious} from '../../../utils/helper';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILED,
} from '../../contactConstants';
import {useIsFocused} from '@react-navigation/native';
import Styles from './styles';

const ContactDetail = props => {
  const {
    navigation,
    route: {
      params: {id},
    },
    getContactDetail,
    getContactDetailResponse,
    getContactDetailFetch,
    delContact,
    delContactFetch,
    contactAction,
    delContactError,
  } = props;
  const isValidUrl = validURL(getContactDetailResponse?.photo);
  const prevContactAction = usePrevious(contactAction);
  const isFocused = useIsFocused();
  useEffect(() => {
    getContactDetail({
      id: id,
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      getContactDetail({
        id: id,
      });
    }
  }, [isFocused]);

  useEffect(() => {
    if (prevContactAction && prevContactAction !== contactAction) {
      switch (contactAction) {
        case DELETE_CONTACT_SUCCESS:
          navigation.pop();
          break;
        case DELETE_CONTACT_FAILED:
          Alert.alert('cannot delete this contact', delContactError?.message);
          break;
        default:
      }
    }
  }, [contactAction, navigation, prevContactAction, delContactError]);

  const renderRow = (title, content) => {
    return (
      <View style={Styles.mb16}>
        <PadderContainer style={Styles.content}>
          <View style={Styles.leftContent}>
            <Text>{title}</Text>
          </View>
          <View style={Styles.rightContent}>
            <Text>{content}</Text>
          </View>
        </PadderContainer>
        <View style={Styles.horizontalLine} />
      </View>
    );
  };

  const showAlertDelete = () => {
    Alert.alert(
      `Are You Sure to Delete ${getContactDetailResponse?.firstName} ${getContactDetailResponse?.lastName} ?`,
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () =>
            delContact({
              id: getContactDetailResponse?.id,
            }),
        },
      ],
    );
  };

  const renderBottom = () => {
    return (
      <View style={Styles.bottomContent}>
        <TouchableOpacity
          style={Styles.btnEdit}
          onPress={() => {
            navigation.navigate('ContactUpdate', {
              id: getContactDetailResponse?.id,
            });
          }}>
          <Icon name="create-outline" size={30} color={Colors.main.baseWhite} />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <BaseContainer
      title="Contact Update"
      onBackPress={() => navigation.pop()}
      // eslint-disable-next-line prettier/prettier
      renderBottom={renderBottom()}
      onPressDelete={() =>
        !delContactFetch && !getContactDetailFetch ? showAlertDelete() : {}
      }>
      {delContactFetch || getContactDetailFetch ? (
        <View style={Styles.container}>
          <ActivityIndicator color={Colors.main.lightblue} />
        </View>
      ) : (
        <>
          <View style={Styles.container}>
            {isValidUrl === true ? (
              <Image
                source={{uri: getContactDetailResponse?.photo}}
                style={Styles.profilePicture}
              />
            ) : (
              <Icon
                name="person-circle-outline"
                size={80}
                color={Colors.main.grey}
              />
            )}
          </View>
          {renderRow(
            'Name',
            getContactDetailResponse?.firstName +
              ' ' +
              getContactDetailResponse?.lastName,
          )}
          {renderRow('Age', getContactDetailResponse?.age)}
        </>
      )}
    </BaseContainer>
  );
};

export default ContactDetail;
