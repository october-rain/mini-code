import React from "react";
import FieldContext from "./FieldContext";

const Form = (props: any) => {
  const { children, form, onFinish, onFinishFailed } = props;

  form.setCallbacks({
    onFinish,
    onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.submit();
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  );
};

export default Form;
