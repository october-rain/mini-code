import React, { Component } from "react";
import FieldContext from "./FieldContext";

interface FieldProps {
  children: any;
  name: string;
  rules?: any;
}

interface FieldState {}

export default class Field extends Component<FieldProps, FieldState> {
  static contextType = FieldContext;
  private unregister?: () => void;

  componentDidMount() {
    const { registerFieldEntities } = this.context as any;
    this.unregister = registerFieldEntities(this);
  }

  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = () => {
    const { name } = this.props;
    const { getFieldValue, setFieldValue } = this.context as any;

    return {
      value: getFieldValue(name), // "default"
      onChange: (e: any) => {
        const newVal = e.target.value;
        console.log("newVal :>> ", newVal);
        setFieldValue({ [name]: newVal });
      },
    };
  };

  render() {
    console.log("render");
    const { children } = this.props;

    const returnChildrenNode = React.cloneElement(
      children,
      this.getControlled()
    );

    return returnChildrenNode;
  }
}
