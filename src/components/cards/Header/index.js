import * as React from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import {Padder as PadderContainer} from '../../containers';

export default function Header(props) {
  const {children, title, onBackPress, onPressDelete, rightContent} = props;
  function renderLeft() {
    if (onBackPress) {
      return (
        <PadderContainer style={Styles.leftContainer}>
          <TouchableNativeFeedback onPress={onBackPress}>
            <View style={Styles.leftContent}>
              <Icon name="chevron-back-outline" size={30} />
            </View>
          </TouchableNativeFeedback>
        </PadderContainer>
      );
    }
    return null;
  }

  function renderRight() {
    if (onPressDelete) {
      return (
        <PadderContainer style={Styles.rightContainer}>
          <TouchableNativeFeedback onPress={onPressDelete}>
            <View style={Styles.leftContent}>
              <Icon name="trash-outline" size={30} />
            </View>
          </TouchableNativeFeedback>
        </PadderContainer>
      );
    }

    if (rightContent) {
      return rightContent;
    }
    return null;
  }

  if (children) {
    return children;
  }
  return (
    <View style={Styles.container}>
      {title ? (
        <Text style={Styles.title} numberOfLines={1}>
          {title}
        </Text>
      ) : null}
      {renderLeft()}
      {renderRight()}
    </View>
  );
}

Header.defaultProps = {
  children: undefined,
  title: '',
  onBackPress: undefined,
  onClosePress: undefined,
};

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  onBackPress: PropTypes.func,
  onClosePress: PropTypes.func,
};

const Styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60,
    fontSize: 17,
    fontWeight: 'bold',
  },
  container: {
    height: 56,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftContainer: {
    position: 'absolute',
    left: 0,
  },
  rightContainer: {
    position: 'absolute',
    right: 0,
  },
  leftContent: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
