import React, {Component} from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import styles from "styles";
import { ActivitySelector, ColorSelector } from "templates";
import { Calendar } from 'communication';
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
  getParam: Function;
}
interface Props {
  navigation: Navigation;
}

interface State {
  name: string;
  loaded: boolean;
  colors: Array<number>;
  colorSelectorVisible: boolean;
  currentActivity: number;
  update: boolean;
}

export default class UpdateCalendarPage extends Component<Props> {
  state: State = {
    name: "",
    loaded: false,
    colors: [0, 0, 0, 0, 0],
    colorSelectorVisible: false,
    currentActivity: -1,
    update: true
  };

  showColorSelector(id: number) {
    const that = this;
    return () =>
      that.setState({ colorSelectorVisible: true, currentActivity: id });
  }

  changeName() {
    const that = this;
    return (name: string) => {
      that.setState({name});
      that.checkNameAndKey(that, name);
    }
  }

  checkNameAndKey(that: UpdateCalendarPage, name: string) {
    if (name.length > 0) {
      that.setState({update: true});
    } else {
      that.setState({update: false});
    }
  }

  saveCalendar(that: UpdateCalendarPage) {
    const addCalendar = this.props.navigation.getParam('addCalendar', (calendar: object) => {console.error('foo')});
    return (key: string) => {
      addCalendar({
        key,
        name: that.state.name,
        colors: that.state.colors
      });
      that.props.navigation.navigate('Main');
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { navigation } = props;
    if (!state.loaded) {
      const calendar = navigation.getParam('calendar', {name: '', colors: [0, 0, 0, 0, 0]});
      state.name = calendar.name;
      state.colors = calendar.colors;
      state.loaded = true;
    }
    return state;
  } 

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.app}>
        <Input
          label="Name:"
          placeholder={'Name'}
          onChangeText={this.changeName()}
          value={this.state.name}
        />
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
          <Button title={"updaten"} disabled={!this.state.update} onPress={() => {}} />
        </View>
      </View>
    );
  }
}