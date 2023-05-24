import {DeleteOutlined} from "@ant-design/icons";
import {Button, Modal} from "antd";
import React from "react";

const CustomTableDeleteButton = (
    {
      title = "Are you sure you want to delete?",
      handleDelete,
      loading = false
    }
  ) => {
  return (
    <Button
    type="primary"
    danger
    icon={<DeleteOutlined />}
    size="small"
    onClick={(event) => {
      event.stopPropagation();
      Modal.confirm({
        title: title,
        onOk: () => handleDelete(),
      });
    }}
    style={{
      backgroundColor: "#EC1B1B",
      borderColor: "#E66464",
    }}
    loading={loading}
  ></Button>
  )
}

export default CustomTableDeleteButton