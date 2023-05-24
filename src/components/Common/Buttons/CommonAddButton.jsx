import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const CommonAddButton = ({ link, onClickHandle, loading }) => {
  const navigation = useNavigate();
  const handleClick = () => {
    if (["", null].includes(link) || typeof link === "undefined") {
      onClickHandle();
      return;
    }
    navigation(link);
  };

  return (
    <Button
      type="primary"
      style={{
        backgroundColor: "#04aa6d",
        borderColor: "transparent",
        borderRadius: "5px",
      }}
      onClick={handleClick}
      loading={loading}
    >
      <PlusOutlined /> Add
    </Button>
  );
};

export default CommonAddButton;
