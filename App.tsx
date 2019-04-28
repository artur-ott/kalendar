import React, {Component} from 'react';
import { StatusBar } from 'react-native';
import { AddCalendar, AuthorizeCalendar, Calendar, Settings, UpdateCalendar } from 'pages';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { STATUSBAR_BACKGROUND } from 'styles/Colors';

const MainNavigator = createBottomTabNavigator({
  Calender: {screen: Calendar},
  Settings: {screen: Settings}
});

const AddNavigator = createStackNavigator({
  AddCalendar: AddCalendar,
  AuthorizeCalendar: AuthorizeCalendar,
},{
  headerLayoutPreset: 'center'
});

const UpdateNavigator = createStackNavigator({
  Update: UpdateCalendar,
},
{
  headerMode: 'none'
});

const Navigator = createAppContainer(createStackNavigator({
  Main: MainNavigator,
  Add: AddNavigator,
  Update: UpdateNavigator
},
{
  initialRouteName: 'Main',
  headerMode: 'none'
}));

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <>
        <StatusBar backgroundColor={STATUSBAR_BACKGROUND} />
        <Navigator />
      </>
    );
  }
}
