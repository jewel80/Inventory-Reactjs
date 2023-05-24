import {Input, Table} from "antd";
import React from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {maxInputFieldLength} from "../../../Helper/CommonStings";
import '../../../assets/styles/Table/Table.scss'

const CustomTable = ({
  columns,
  dataSource,
  paginationInfo,
  searchMaxLength = maxInputFieldLength,
  paginate = () => null,
  onSearch = (query) => query,
  rowKey = 'id',
  loading = false,
  showSearch = false
 }) => {
  const {Search} = Input;

  return (
    <>
      {
        (showSearch) ?
          (
            <div style={{marginBottom: 10, display: "flex", justifyContent: "flex-end"}}>
              <Search
                placeholder="Enter query to search"
                onSearch={(query) => onSearch(query)}
                style={{ width: 300 }}
                enterButton
                allowClear
                maxLength={searchMaxLength}
              />
            </div>
          ) :
          <></>
      }
      <Table
        className={"sl-common-table"}
        columns={columns}
        dataSource={dataSource}
        rowKey={rowKey}
        bordered
        size="small"
        pagination={
          (paginationInfo) ?
            {
              defaultCurrent: 1,
              pageSize: paginationInfo.perPage ?? 10,
              current: paginationInfo.currentPage ?? 1,
              onChange: paginate,
              total: paginationInfo.totalElements ?? 0,
              showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`
            } :
            false
        }
        loading={{
          indicator: <LoadingOutlined />,
          spinning: loading,
          size: "large",
        }}
        scroll={{ x: 400 }}/>
    </>
  )
}

export default CustomTable;