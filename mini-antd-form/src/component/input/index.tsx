import React from "react";
const Input = (props: any) => {
  return <input {...props} />;
};

// const CustomizedInput = (props: any) => {
//   const { value, ...otherProps } = props;

//   return (
//     <div style={{ padding: 10 }}>
//       <Input style={{ outline: "none" }} value={value} {...otherProps} />
//     </div>
//   );
// };å

// export default CustomizedInput;

interface IProps {
  value?: string;
}
interface IState {}

class CustomizeInput extends React.Component<IProps, IState> {
  render() {
    // 现在 CustomizeInput 是受控组件，但如果不给 value 设置默认值为 "", 则会变成非受控组件。
    const {value = "", ...otherProps} = this.props;
    return (
      <div style={{padding: 10}}>
        <Input style={{outline: "none"}} value={value} {...otherProps} />
      </div>
    );
  }
}

export default CustomizeInput;
