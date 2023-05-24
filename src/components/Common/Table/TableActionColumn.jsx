import {Space} from "antd";
import CustomTableEditButton from "../Buttons/CustomTableEditButton";
import CustomTableDeleteButton from "../Buttons/CustomTableDeleteButton";
import React from "react";
import CustomTableActiveButton from "../Buttons/CommonTableActiveButton";

const TableActionColumn = (
    {
      statusCode,
      handleEdit,
      handleActiveInactive,
      handleDelete,
      loading = false,
      ...props
    }
  ) => {
  return (
    <Space
      size="middle"
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      {props.children}
      {
        (handleEdit) ? (
          <CustomTableEditButton
            handleEdit={handleEdit}
            loading={loading}
          />
        ) : null
      }
      {
        (handleActiveInactive) ? (
          <CustomTableActiveButton
            handleActiveInactive={handleActiveInactive}
            statusCode={statusCode}
            loading={loading}
          />
        ) : null
      }
      {
        (handleDelete) ? (
          <CustomTableDeleteButton
            handleDelete={handleDelete}
            loading={loading}
          />
        ) : null
      }
    </Space>
  )
}

export default TableActionColumn