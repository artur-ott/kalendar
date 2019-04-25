import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import styles from "styles";

interface Props {}
export default class AddCalendarPage extends Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.app}>
        <Input placeholder='Name' />
        <Button
        title={'Auth'}
        onPress={() => {
          navigation.navigate('AuthorizeCalendar');
        }} />
      </View>
    );
  }
}