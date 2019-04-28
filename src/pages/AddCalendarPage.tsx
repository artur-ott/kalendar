import React, { Component } from "react";
import { View } from "react-native";
import { Button, Input } from "react-native-elements";
import styles from "styles";
import { ActivitySelector, ColorSelector } from "templates";
import {
  CALENDAR_COLORS_DEFAULT,
  CALENDAR_COLORS_LAVENDEL,
  CALENDAR_COLORS_SALBEI,
  CALENDAR_COLORS_WEINTRAUBE,
  CALENDAR_COLORS_FLAMINGO,
  CALENDAR_COLORS_BANANE,
  CALENDAR_COLORS_MANDARINE,
  CALENDAR_COLORS_GRAFIT,
  CALENDAR_COLORS_HEIDELBEERE,
  CALENDAR_COLORS_BASILIKUM,
  CALENDAR_COLORS_TOMATE
} from "styles/Colors";

const COLORS = [
  { name: "Standard", id: 0, color: CALENDAR_COLORS_DEFAULT },
  { name: "Lavendel", id: 1, color: CALENDAR_COLORS_LAVENDEL },
  { name: "Salbei", id: 2, color: CALENDAR_COLORS_SALBEI },
  { name: "Weintraube", id: 3, color: CALENDAR_COLORS_WEINTRAUBE },
  { name: "Flamingo", id: 4, color: CALENDAR_COLORS_FLAMINGO },
  { name: "Banane", id: 5, color: CALENDAR_COLORS_BANANE },
  { name: "Mandarine", id: 6, color: CALENDAR_COLORS_MANDARINE },
  { name: "Pfau", id: 7, color: CALENDAR_COLORS_DEFAULT },
  { name: "Grafit", id: 8, color: CALENDAR_COLORS_GRAFIT },
  { name: "Heidelbeere", id: 9, color: CALENDAR_COLORS_HEIDELBEERE },
  { name: "Basilikum", id: 10, color: CALENDAR_COLORS_BASILIKUM },
  { name: "Tomate", id: 11, color: CALENDAR_COLORS_TOMATE }
];

interface Navigation {
  navigate: Function;
}
interface Props {
  navigation: Navigation;
}

interface State {
  key: string;
  name: string;
  colors: Array<number>;
  colorSelectorVisible: boolean;
  currentActivity: number;
  add: boolean;
  authorize: boolean;
}
export default class AddCalendarPage extends Component<Props> {
  state: State = {
    key: "",
    name: "",
    colors: [0, 0, 0, 0, 0],
    colorSelectorVisible: false,
    currentActivity: -1,
    add: false,
    authorize: false
  };

  static navigationOptions = {
    title: "Kalender hinzufügen"
  };

  showColorSelector(id: number) {
    const that = this;
    return () =>
      that.setState({ colorSelectorVisible: true, currentActivity: id });
  }

  addKey() {
    const that = this;
    return (key: string) => {
      that.setState({key, authorize: true});
      that.checkNameAndKey(that, key)
    }
  }

  addName() {
    const that = this;
    return (name: string) => {
      that.setState({name});
      that.checkNameAndKey(that)
    }
  }

  checkNameAndKey(that: AddCalendarPage, keyChanged: string | undefined) {
    const {name, key} = that.state;
    if (name.length > 0 && (key.length > 0 || keyChanged && keyChanged.length > 0)) {
      that.setState({add: true});
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.app}>
        <Input
          label="Name:"
          placeholder={'Name'}
          onChangeText={this.addName()}
        />
        <View style={{ paddingTop: 20 }}>
          <Input
            label="Zugangscode:"
            placeholder={'Zugangscode'}
            editable={false}
            value={this.state.key}
          />
          <Button
            title={"Berechtigung erteilen"}
            buttonStyle={{ marginTop: 5 }}
            onPress={() => {
              navigation.navigate("AuthorizeCalendar", {
                addKey: this.addKey()
              });
            }}
            disabled={this.state.authorize}
          />
        </View>
        <View>
          <ActivitySelector
            color={COLORS[this.state.colors[0]].color}
            title={"Termine"}
            show={this.showColorSelector(0)}
          />
          <ActivitySelector
            color={COLORS[this.state.colors[1]].color}
            title={"Geburtstage"}
            show={this.showColorSelector(1)}
          />
          <ActivitySelector
            color={COLORS[this.state.colors[2]].color}
            title={"Arzttermine"}
            show={this.showColorSelector(2)}
          />
          <ActivitySelector
            color={COLORS[this.state.colors[3]].color}
            title={"Aktivitäten"}
            show={this.showColorSelector(3)}
          />
          <ActivitySelector
            color={COLORS[this.state.colors[4]].color}
            title={"Arbeit"}
            show={this.showColorSelector(4)}
          />
          <ColorSelector
            colors={COLORS}
            color={this.state.colors[this.state.currentActivity]}
            visible={this.state.colorSelectorVisible}
            hide={() =>
              this.setState({
                colorSelectorVisible: false,
                currentActivity: -1
              })
            }
            changeColor={(color: number) => {
              let colors = this.state.colors;
              colors[this.state.currentActivity] = color;
              this.setState({ colors: colors });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end"
          }}
        >
          <Button title={"hinzufügen"} disabled={!this.state.add} />
        </View>
      </View>
    );
  }
}
