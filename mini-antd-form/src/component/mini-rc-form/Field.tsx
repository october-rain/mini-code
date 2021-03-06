import React, { Component, useContext, useLayoutEffect, useReducer } from "react";
import FieldContext from "./FieldContext";

interface FieldProps {
  children: any;
  name: string;
  rules?: any;
}

interface FieldState {}

// export default class Field extends Component<FieldProps, FieldState> {
//   static contextType = FieldContext;
//   private unregister?: () => void;

//   componentDidMount() {
//     const { registerFieldEntities } = this.context as any;
//     this.unregister = registerFieldEntities(this);
//   }

//   componentWillUnmount() {
//     if (this.unregister) {
//       this.unregister();
//     }
//   }

//   onStoreChange = () => {
//     this.forceUpdate();
//   };

//   getControlled = () => {
//     const { name } = this.props;
//     const { getFieldValue, setFieldValue } = this.context as any;

//     return {
//       value: getFieldValue(name), // "default"
//       onChange: (e: any) => {
//         const newVal = e.target.value;
//         console.log("newVal :>> ", newVal);
//         setFieldValue({ [name]: newVal });
//       },
//     };
//   };

//   render() {
//     console.log("render");
//     const { children } = this.props;

//     // 让 Field 的子组件变成受控组件
//     const returnChildrenNode = React.cloneElement(
//       children,
//       this.getControlled()
//     );

//     return returnChildrenNode;
//   }
// }

const Field = (props: FieldProps) => {
  const { name, children } = props;

  const { getFieldValue, setFieldValue, registerFieldEntities } = useContext(
    FieldContext
  ) as any;

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useLayoutEffect(() => {
    const unregister = registerFieldEntities({
      props,
      onStoreChange: forceUpdate,
    });

    return unregister;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const getControlled = () => {
    return {
      value: getFieldValue(name),
      onChange: (e: any) => {
        const newValue = e.target.value;
        setFieldValue({ [name]: newValue });
      },
    };
  };

  const returnChildrenNode = React.cloneElement(children, getControlled());
  return returnChildrenNode;
};

export default Field;
