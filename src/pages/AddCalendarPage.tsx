import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from "styles";

interface Props {}
export default class AddCalendarPage extends Component<Props> {
  static navigationOptions = {
    title: 'Kalender',
    tabBarIcon: <Ionicons name={'md-calendar'} size={25} color={'gray'} />
  };
  render() {
    return (
      <View style={styles.app}>
        <Text>Foo</Text>
      </View>
    );
  }
}