import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";

// 函数组件不能直接接受 ref，所以要用 forwardRef 进行处理(详见index.tsx)
// 处理之后，ref 和 props 是同层级的
const Form = (props: any, ref: any) => {
  const { children, form, onFinish, onFinishFailed } = props;

  const [formInstance] = useForm(form)
  console.log('ref', ref)
  console.log('formInstance :>> ', formInstance);

  // 把 formInstance 传给祖先组件
  React.useImperativeHandle(ref, () => formInstance)

  formInstance.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
};

export default Form;
