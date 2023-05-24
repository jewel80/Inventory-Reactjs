import {ArrowLeftOutlined} from "@ant-design/icons";
import {Button} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";

const CommonBackButton = ({link, onClickHandle, loading}) => {

  const navigation = useNavigate();
  const handleClick = () => {
    if (['', null].includes(link) || typeof link === 'undefined') {
      onClickHandle();
      return ;
    }
    navigation(link);
  }
  return (
    <Button type="primary"
            onClick={handleClick}
            loading={loading}
    >
      <ArrowLeftOutlined /> Back
    </Button>
  )
}

export default CommonBackButton