import React, { useEffect, Component } from "react";
import Form, { Field, useForm } from "../component/mini-rc-form";
import Input from '../component/input'

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export const MiniRCFieldForm = () => {

  const [form] = useForm();

  const onFinish = (val: any) => {
    console.log("onFinish", val);
  };
  const onFinishFailed = (val: any) => {
    console.log("onFinishFailed", val);
  };

  console.log('form :>> ', form);

  return (
    <div>
      <h3>MiniRCFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input />
        </Field>
        {/* <Field name="submit"> */}
          <button>submit</button>
        {/* </Field> */}
      </Form>
    </div>
  );
}