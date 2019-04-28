import React, { Component } from "react";
import { ScrollView, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { Drive } from 'communication';
import styles from "styles";

interface Navigation {
  navigate: Function
}
interface Props {
  navigation: Navigation
}

interface Calendar {
  name: string;
  key: string;
  colors: Array<number>;
}

interface State {
  calendars: Array<Calendar>;
  refreshing: boolean;
}
export default class CalendarPage extends Component<Props> {

  state: State;

  static navigationOptions = {
    title: "Kalender",
    tabBarIcon: (
      <Icon type={"ionicon"} name={"md-calendar"} size={25} color={"gray"} />
    )
  };

  constructor(props: Props){
    super(props);
    this.state ={ calendars: [], refreshing: false };
  }

  updateCalendars() {
    const that = this;
    return (calendars: Array<object>) => {
      that.setState({calendars, refreshing: false});
    }
  }

  addCalendar() {
    const that = this;
    return (calendar: Calendar) => {
      let calendars = that.state.calendars;
      calendars.push(calendar);
      that.setState({calendars});
      Drive.getInstance().updateCalendars(calendars);
    }
  }

  componentDidMount(){
    Drive.getInstance().getAllCalendars(this.updateCalendars());
  }

  _onRefresh() {
    const that = this;
    return () => {
      that.setState({refreshing: true});
      Drive.getInstance().getAllCalendars(that.updateCalendars());
    }
  }

  render() {
    const { navigation } = this.props;
    let { calendars } = this.state;
    return (
      <View style={styles.app}>
        <Button
          icon={
            <Icon name="md-add" type={"ionicon"} size={40} color="#ffffff" />
          }
          buttonStyle={styles.add_calendar}
          onPress={() => {
            navigation.navigate("Add", {
              addCalendar: this.addCalendar()
            });
          }}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh()}
            />
          }
        >
          {calendars.map((calendar, i) => (
          <TouchableOpacity key={i} onPress={() => {
            navigation.navigate("Update", {
              calendar: this.state.calendars[i]
            });
          }}>
            <Card containerStyle={styles.calendar_card}>
              <Text style={styles.calendar_card_text}>
                {calendar.name}
              </Text>
            </Card>
          </TouchableOpacity>))}
        </ScrollView>
      </View>
    );
  }
}
