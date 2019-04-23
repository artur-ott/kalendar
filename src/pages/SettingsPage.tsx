import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import {Text, View} from 'react-native';

interface Props {}
export default class SettingsPage extends Component<Props> {
  static navigationOptions = {
    title: 'Einstellungen',
    tabBarIcon: <Icon type={'ionicon'} name={'md-settings'} size={25} color={'gray'} />
  };
  render() {
    return (
      <View>
        <Text>Einstellungen</Text>
      </View>
    );
  }
}