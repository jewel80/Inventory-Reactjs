import {Form} from "antd";

const CustomForm = ({name, form, ...props}) => {
  return (
    <Form
      name={name ?? 'basic'}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 20 }}
      autoComplete="off"
      form={form}
      {...props}
    >
      {props.children}
    </Form>
  )
}

export default CustomForm