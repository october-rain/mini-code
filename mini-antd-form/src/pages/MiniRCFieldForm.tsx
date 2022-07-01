import React, { Component } from "react";
import Form, { Field, useForm } from "../component/mini-rc-form";
import Input from "../component/input";

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

// export const MiniRCFieldForm = () => {

//   const [form] = useForm();

//   const onFinish = (val: any) => {
//     console.log("onFinish", val);
//   };
//   const onFinishFailed = (val: any) => {
//     console.log("onFinishFailed", val);
//   };

//   console.log('form :>> ', form);

//   return (
// <div>
//   <h3>MiniRCFieldForm</h3>
//   <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//     <Field name="username" rules={[nameRules]}>
//       <Input />
//     </Field>
//     <Field name="password" rules={[passworRules]}>
//       <Input />
//     </Field>
//       <button>submit</button>
//   </Form>
// </div>
//   );
// }

export class MiniRCFieldForm extends Component {
  formRef = React.createRef();

  componentDidMount() {
    // 这里如果想要提前拿到 form，则需要使用 forwardRef 和 useImperativeHandle 处理
    // 实际上是 祖先组件，想要用子孙组件的值 
    console.log("form", this.formRef.current);
    (this.formRef.current as any).setFieldValue({ username: "default" });
  }

  onFinish(val: any) {
    console.log("onFinish", val);
  }

  onFinishFailed(val: any) {
    console.log("onFinishFailed", val);
  }

  render() {
    return (
      <div>
        <h3>MiniRCFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Field name="username" rules={[nameRules]}>
            <Input />
          </Field>
          <Field name="password" rules={[passworRules]}>
            <Input />
          </Field>
          <button>submit</button>
        </Form>
      </div>
    );
  }
}
