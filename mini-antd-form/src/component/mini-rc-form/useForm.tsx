import { useRef } from "react";

class FormStore {
  private store: any;
  private fieldEntities: any[];
  private callbacks: any;

  constructor() {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  // 注册与取消注册、订阅与取消订阅都是成对出现
  registerFieldEntities = (entity: any) => {
    this.fieldEntities.push(entity);

    return () => {
      this.fieldEntities = this.fieldEntities.filter((item) => item !== entity);
      delete this.store[entity.props.name];
    };
  };

  getFieldValue = (name: string) => {
    return this.store[name];
  };

  getFieldsValue = () => {
    return { ...this.store };
  };

  setFieldValue = (newStore: any) => {
    // 1. update store
    this.store = {
      ...this.store,
      ...newStore,
    };
    console.log("this.store :>> ", this.store);
    // 2. update component
    this.fieldEntities.forEach((entity) => {
      Object.keys(newStore).forEach((key) => {
        if (entity.props.name === key) {
          entity.onStoreChange();
        }
      });
    });
  };

  setCallbacks = (callback: any) => {
    this.callbacks = { ...this.callbacks, ...callback };
  };

  validate = () => {
    const err: any[] = [];

    this.fieldEntities.forEach((entity) => {
      const { name, rules } = entity.props;

      const value = this.getFieldValue(name);
      let requiredRule = rules.find((rule: any) => rule["required"]) || {};

      if (requiredRule.required && (value === undefined || value === "")) {
        err.push({ errMsg: requiredRule.message, value });
      }

      return err
    });

    return err;
  };

  submit = () => {
    console.log("submit");
    const { onFinish, onFinishFailed } = this.callbacks;
    const err = this.validate();
    if (err.length === 0) {
      // 校验成功
      onFinish(this.getFieldsValue());
    } else {
      // 校验失败
      onFinishFailed(err);
    }
  };

  getForm = () => {
    return {
      registerFieldEntities: this.registerFieldEntities,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}

export default function useForm(form: any) {
  // 存一个 Form 实例，在组件卸载之前，都是同一个
  const formRef = useRef<any>();
  if (!formRef.current) {
    if(form) {
      formRef.current = form
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
}
