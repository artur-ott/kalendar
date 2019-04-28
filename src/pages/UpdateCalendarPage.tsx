import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import styles from "styles";

interface Props {}
export default class UpdateCalendarPage extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.app}>
        <Input placeholder='Name' />
      </View>
    );
  }
}