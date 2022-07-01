import React, { useRef, useEffect } from "react";
import { Button, Form, Input } from "antd";

const { Item } = Form;

const nameRules = { required: true, message: "请输入姓名！" };
const passworRules = { required: true, message: "请输入密码！" };

export const AntdForm = () => {
  const formRef = useRef<any>();

  const onFinish = (val: any) => {
    console.log("onFinish", val);
  };
  const onFinishFailed = (val: any) => {
    console.log("onFinishFailed", val);
  };

  useEffect(() => {
    formRef.current.setFieldsValue({ username: "defalut" });
  }, []);

  return (
    <div>
      <h3>AntdForm</h3>
      <Form ref={formRef} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Item
          name="username"
          label="姓名"
          rules={[nameRules]}
        >
          <Input placeholder="username placeholder" />
        </Item>
        <Item
          name="password"
          label="密码"
          rules={[passworRules]}
        >
          <Input placeholder="username placeholder" />
        </Item>
        {/* <Button> Submit </Button> */}
        <Item>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </div>
  );
};
