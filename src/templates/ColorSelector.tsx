import React, { Component } from "react";
import { View } from "react-native";
import { CheckBox } from "react-native-elements";
import { MaterialDialog } from "react-native-material-dialog";

interface Colors {
  name: string;
  id: number;
  color: string
}

interface Props {
  color: number;
  colors: Array<Colors>;
  visible: boolean;
  hide: Function;
  changeColor: Function;
}

export default class ColorSelector extends Component<Props> {

  state={
    color: 0,
    visible: false
  }

  static getDerivedStateFromProps(props, state) {
    if (props.visible === true && state.visible === false) {
      return {
        color: props.color,
        visible: true
      };
    }
    return {
      color: state.color,
      visible: props.visible
    };
  } 

  render() {
    return (
      <MaterialDialog
        title="Wähle die Farbe aus"
        visible={this.props.visible}
        cancelLabel={'Abbrechen'}
        okLabel={'Anwenden'}
        onOk={() => {
          this.props.changeColor(this.state.color);
          this.props.hide();
        }}
        onCancel={() => this.props.hide()}
      >
        <View>
          {this.props.colors.map((color, i: number) => (
            <CheckBox
              key={i}
              title={color.name}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              containerStyle={{
                backgroundColor: "transparent",
                borderColor: "transparent",
                padding: 0
              }}
              onPress={() => this.setState({ color: i })}
              uncheckedColor={color.color}
              checkedColor={color.color}
              checked={i === this.state.color}
            />
          ))}
        </View>
      </MaterialDialog>
    );
  }
}
