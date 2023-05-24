import {EditOutlined} from "@ant-design/icons";
import {Button} from "antd";
import React from "react";

const CustomTableEditButton = ({handleEdit, loading = false}) => {
  return (
    <Button
      type="primary"
      icon={<EditOutlined />}
      size="small"
      onClick={() => handleEdit()}
      loading={loading}
    ></Button>
  )
}

export default CustomTableEditButton