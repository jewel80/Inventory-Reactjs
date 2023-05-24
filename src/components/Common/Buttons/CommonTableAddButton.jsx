import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const CustomTableAddButton = ({ handleAdd, loading = false }) => {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      style={{ backgroundColor: "#22AB55" }}
      size="small"
      onClick={() => handleAdd()}
      loading={loading}
    ></Button>
  );
};

export default CustomTableAddButton;
