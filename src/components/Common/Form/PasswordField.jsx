import {Form} from "antd";
import {passwordMaxLength, passwordMinLength, passwordRegex} from "../../../Helper/CommonStings";
import CustomInput from "../InputFields/CustomInput";
import {LockOutlined} from "@ant-design/icons";

const PasswordField = (
  {
    name,
    label = null,
    placeholder = "Please enter new password",
    required = true,
    showIcon = true
  }
) => {
 return (
   <Form.Item
     name={name}
     label={label}
     rules={[
       { required: required, message: 'Password field is required' },
       {
         min: passwordMinLength,
         message: `Minimum length is ${passwordMinLength} characters`
       },
       {
         max: passwordMaxLength,
         message: `Maximum length is ${passwordMaxLength} characters`
       },
       {
         pattern: new RegExp(passwordRegex),
         message: "The password must have at least 1 number, 1 special character, 1 uppercase letter and " +
           "1 lowercase letter"
       }
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

export default PasswordField