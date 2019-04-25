import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import styles from "styles";

interface Props {}
export default class CalendarPage extends Component<Props> {
  static navigationOptions = {
    title: "Kalender",
    tabBarIcon: (
      <Icon type={"ionicon"} name={"md-calendar"} size={25} color={"gray"} />
    )
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.app}>
        <Button
          icon={
            <Icon name="md-add" type={"ionicon"} size={40} color="#ffffff" />
          }
          buttonStyle={styles.add_calendar}
          onPress={() => {
            navigation.navigate("Add");
          }}
        />
        <TouchableOpacity onPress={() => {
          navigation.navigate("Add");
        }}>
          <Card containerStyle={styles.calendar_card}>
            <Text style={styles.calendar_card_text}>
              ott.artur1992@gmail.com
            </Text>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
}
