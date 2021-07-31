/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Base as BaseContainer,
  Padder as PadderContainer,
} from '../../../components/containers';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../configs/Colors';
import Styles from './styles';
const ContactMain = props => {
  const {
    navigation,
    getContact,
    getContactResponse,
    getContactFetch,
    resetContact,
  } = props;
  const contact =
    getContactResponse.length > 0 &&
    getContactResponse
      .sort((a, b) => {
        if (a.firstName > b.firstName) {
          return 1;
        } else if (a.firstName < b.firstName) {
          return -1;
        } else if (a.lastName > b.lastName) {
          return 1;
        } else if (a.lastName < b.lastName) {
          return -1;
        } else {
          return 0;
        }
      })
      .map(item => {
        return {
          ...item,
        };
      });
  const isFocused = useIsFocused();
  useEffect(() => {
    getContact();
  }, []);

  useEffect(() => {
    if (isFocused) {
      resetContact();
      getContact();
    }
  }, [isFocused]);

  const renderHeader = () => {
    return (
      <PadderContainer style={Styles.header.container}>
        <Text style={Styles.header.title}>Contacts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ContactCreate')}>
          <Icon name="add-outline" size={30} color={Colors.main.bloodRed} />
        </TouchableOpacity>
      </PadderContainer>
    );
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ContactDetail', {
            id: item.id,
          })
        }>
        <PadderContainer>
          <View style={Styles.card.container}>
            <Icon
              name="person-circle-outline"
              size={30}
              color={Colors.main.grey}
            />
            <Text style={Styles.card.ml10}>
              {item.firstName + ' ' + item.lastName}
            </Text>
          </View>
          <View style={Styles.card.horizontalLine} />
        </PadderContainer>
      </TouchableOpacity>
    );
  };

  const renderEmpty = () => {
    if (getContactFetch) {
      return (
        <View style={Styles.card.loading}>
          <ActivityIndicator color={Colors.main.lightblue} />
        </View>
      );
    }
    return null;
  };
  return (
    <BaseContainer renderHeader={renderHeader()} staticView>
      <FlatList
        data={contact}
        renderItem={({item}) => renderItem(item)}
        ListEmptyComponent={renderEmpty()}
        contentContainerStyle={{flexGrow: 1}}
        keyExtractor={item => item.id}
      />
    </BaseContainer>
  );
};

export default ContactMain;
