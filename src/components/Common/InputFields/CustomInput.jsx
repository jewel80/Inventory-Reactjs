import {Input} from "antd";
import {maxInputFieldLength} from "../../../Helper/CommonStings";

const CustomInput = ({name, placeholder, maxLength = maxInputFieldLength, ...props}) => {
  return (
    (props.type === 'password') ?
      (
        <Input.Password
          name={name}
          maxLength={maxLength}
          min={props.min ?? 1}
          max={props.max ?? 9999999999}
          placeholder={placeholder ?? "Please type here"}
          {...props}
        />
      ) :
      (
        <Input
          name={name}
          maxLength={maxLength}
          min={props.min ?? 1}
          max={props.max ?? 9999999999}
          placeholder={placeholder ?? "Please type here"}
          {...props}
        />
      )

  )
}

export default CustomInput;