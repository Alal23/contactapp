import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import {Header} from '../../cards';
import styles from './styles';

const Base = props => {
  const {
    staticView,
    children,
    refreshControl,
    showsVerticalScrollIndicator,
    renderBottom,
    renderFloating,
    renderHeader,
    onBackPress,
    title,
    onPressDelete,
  } = props;
  const renderMain = () => {
    if (staticView) {
      return <View style={styles.container}>{children}</View>;
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        refreshControl={refreshControl}
        scrollEventThrottle={16}
        overScrollMode={'never'}>
        {children}
      </ScrollView>
    );
  };

  const renderDown = () => {
    if (!renderBottom) {
      return null;
    }
    return <View>{renderBottom}</View>;
  };

  const renderFloatingDown = () => {
    if (renderFloating) {
      return renderFloating;
    }
    return null;
  };

  const renderTopHeader = () => {
    if (renderHeader) {
      return renderHeader;
    }
    if (onBackPress || title || onPressDelete) {
      return (
        <Header
          title={title}
          onBackPress={onBackPress}
          onPressDelete={onPressDelete}
        />
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      {renderTopHeader()}
      <KeyboardAvoidingView style={styles.container}>
        {renderMain()}
        {renderDown()}
      </KeyboardAvoidingView>
      {renderFloatingDown()}
    </SafeAreaView>
  );
};

export default Base;
