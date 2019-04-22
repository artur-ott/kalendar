import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

interface Props {}
export default class CalendarPage extends Component<Props> {
  static navigationOptions = {
    title: 'Kalender',
    tabBarIcon: <Ionicons name={'md-calendar'} size={25} color={'gray'} />
  };
  render() {
    return (
      <View>
        <Card
          title='HELLO WORLD'>
          <Text style={{marginBottom: 10}}>
            The idea with React Native Elements is more about component structure than actual design.
          </Text>
          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor: '#03A9F4'}}
            title='VIEW NOW' />
        </Card>
      </View>
    );
  }
}