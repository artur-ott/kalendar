import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import styles from "styles";

interface Props {
  title: string;
  color: string;
  show: (id: number) => void;
}
export default class ActivitySelector extends Component<Props> {
  render() {
    const { title } = this.props;
    return (
      <TouchableOpacity style={{ paddingTop: 20, flexDirection: "row" }} onPress={() => this.props.show(this.props.id)}>
        <Text
          style={[
            styles.add_calendar_colorselector,
            { backgroundColor: this.props.color }
          ]}
        ></Text>
        <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: "bold" }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}
