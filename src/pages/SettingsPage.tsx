import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';

interface Props {}
export default class SettingsPage extends Component<Props> {
  static navigationOptions = {
    title: 'Einstellungen',
    tabBarIcon: <Ionicons name={'md-settings'} size={25} color={'gray'} />
  };
  render() {
    return (
      <View>
        <Text>Einstellungen</Text>
      </View>
    );
  }
}