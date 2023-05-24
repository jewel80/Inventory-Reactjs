import { Input } from 'antd';
import {maxTextAreaLength} from "../../../Helper/CommonStings";
const CustomTextArea = (
    {
      maxLength = maxTextAreaLength,
      placeholder = "Please enter short description",
      ...props
    }
  ) => {
  const { TextArea } = Input;
  return (
    <TextArea
      rows={props.rows ?? 4}
      maxLength={maxLength}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default CustomTextArea