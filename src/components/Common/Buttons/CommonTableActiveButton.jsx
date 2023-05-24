import { Button, Modal } from "antd";
import React from "react";
import {
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

const CustomTableActiveButton = ({ handleActiveInactive, statusCode,  loading = false }) => {
  const title = `Are you sure you want to ${statusCode ? 'Inactive' : 'Active'}?`;
  return (
    <Button
      type="primary"
      style={{ backgroundColor: statusCode ? "#FFB300" : "rgb(34, 171, 85)" }}
      icon={statusCode ? <LockOutlined /> : <UnlockOutlined />}
      size="small"
      loading={loading}
      onClick={(event) => {
        event.stopPropagation();
        Modal.confirm({
          title: title,
          onOk: () => handleActiveInactive(),
        });
      }}
    ></Button>
  );
};

export default CustomTableActiveButton;
