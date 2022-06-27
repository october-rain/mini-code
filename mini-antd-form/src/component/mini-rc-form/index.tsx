import Field from "./Field";
import useForm from "./useForm";
import _Form from "./Form";

type InternalFormType = typeof _Form;
interface MiniForm extends InternalFormType {
  Field: typeof Field;
  useForm: typeof useForm;
}

const Form = _Form as MiniForm;

Form.Field = Field
Form.useForm = useForm

export {
  Field,
  useForm
}
export default Form;