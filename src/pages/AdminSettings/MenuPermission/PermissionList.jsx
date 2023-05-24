import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import useMenuPermission from "../../../hooks/AdminSettings/useMenuPermission";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import {Card, Tree} from "antd";
import Helper from "../../../Helper/Helper";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";

const PermissionList = () => {
  const {
    urls,
    listUrl,
    activeTab,
    listPageBreadCrumb,
    loading: loadingOnUserAction,
    handleEdit,
    handleDelete,
    handleTabChange
  } = useMenuPermission()

  const {
    loading,
    collection,
    currentPage,
    itemsPerPage,
    totalElements,
    paginate,
    fetchData,
  } = useGenericPagination(urls[activeTab])

  const {getSerialNumber, formatDate} = Helper();

  const columns = [
    {
      title: "SN",
      dataIndex: "id",
      key: "id",
      render: (_, record) => getSerialNumber(collection, record, currentPage, itemsPerPage),
    },
    {
      title: "Role Name",
      dataIndex: "roleName",
    },
    {
      title: "Description",
      dataIndex: "roleDescription",
    },
    {
      title: "Menu List",
      dataIndex: "menus",
      key: "menus",
      render: (_, record) => (
        <Tree
          selectable={false}
          defaultExpandAll={true}
          treeData={record.menus}
        />
      )
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: <div style={{textAlign: "center"}}>Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <TableActionColumn
          handleEdit={() => handleEdit(record.roleId)}
          handleDelete={() => handleDelete(record.roleId, fetchData)}
          statusCode={record.statusId}
          loading={loadingOnUserAction}
        />
      )
    }
  ]

  return (
    <>
      <CustomBreadCrumb pageLists={listPageBreadCrumb} />
      <Card
        title={
          <PageTitleWithButton
            title="Role Menu Permission List"
            link={`${listUrl}/add`}
            addBtn={true}
          />
        }
      >
        <CustomTab
          handleChange={() => handleTabChange(fetchData)}
          defaultActiveId={activeTab}
          Children={(
            <CustomTable
              rowKey={'roleId'}
              columns={columns}
              dataSource={collection}
              paginate={paginate}
              loading={loading}
              paginationInfo={{
                currentPage: currentPage,
                totalElements: totalElements,
                perPage: itemsPerPage
              }}
            />
          )}
        />
      </Card>
    </>
  )
}

export default PermissionList