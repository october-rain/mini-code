import React from "react";
import Field from "./Field";
import useForm from "./useForm";
import _Form from "./Form";

// 为了让在初始化的时候，能拿到 Form 实例
// 需要使用 forwardRef 和 useImperativeHandle 配合，将 form 反弹给 祖先组件
const Form = React.forwardRef(_Form) as (props: any) => React.ReactElement;
type InternalFormType = typeof Form;

interface MiniFormType extends InternalFormType {
  Field: typeof Field;
  useForm: typeof useForm;
}

const MiniForm: MiniFormType = Form as MiniFormType;

MiniForm.Field = Field;
MiniForm.useForm = useForm;

export { Field, useForm };
export default Form;
