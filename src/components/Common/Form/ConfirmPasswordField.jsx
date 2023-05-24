import CustomInput from "../InputFields/CustomInput";
import {LockOutlined} from "@ant-design/icons";
import {Form} from "antd";

const ConfirmPasswordField = (
    {
      name,
      confirmField,
      label = null,
      placeholder = "Confirm your new password",
      required = true,
      showIcon = true
    }
  ) => {
  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        { required: required, message: 'Please confirm your new password' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue(confirmField) === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('Passwords that you entered do not match!'));
          },
        }),
      ]}
    >
      <CustomInput
        type='password'
        prefix={showIcon ? <LockOutlined className="site-form-item-icon" /> : ''}
        placeholder={placeholder}
      />
    </Form.Item>
  )
}

export default ConfirmPasswordField