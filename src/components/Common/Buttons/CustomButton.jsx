import {Button} from "antd";

const CustomButton = (props) => {
  return (
    <Button {...props}>
      { props.text }
    </Button>
  );
};

export default CustomButton;
