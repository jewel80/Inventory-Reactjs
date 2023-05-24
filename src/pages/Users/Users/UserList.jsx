import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import Helper from "../../../Helper/Helper";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";
import {Card} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import useUsers from "../../../hooks/UserHooks/useUsers";

const UserList = () => {
  const {
    urls,
    loading : loadingOnUserAction,
    activeTab,
    listPageBreadCrumb,
    handleEdit,
    handleDelete,
    handleTabChange,
    handleActiveInactive,
  } = useUsers();

  const {getSerialNumber, formatDate} = Helper();

  const {
    loading,
    collection,
    currentPage,
    itemsPerPage,
    totalElements,
    paginate,
    fetchData
  } = useGenericPagination(urls[activeTab]);

  const columns = [
    {
      title: "SN",
      dataIndex: "id",
      key: "id",
      render: (_, record) => getSerialNumber(collection, record, currentPage, itemsPerPage),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => record.name
    },
    {
      title: "User Type",
      dataIndex: "typeName",
      key: "typeName",
      render: (_, record) => record.typeName
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      render: (_, record) => record.email
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => record.phoneNumber
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (_, record) => record.address
    },
    {
      title: "Created By",
      dataIndex: "createdByUser",
      key: "createdByUser",
      render: (_, record) => record.createdByUser
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => formatDate(record.createdAt)
    },
    {
      title: <div style={{textAlign: "center"}}>Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <TableActionColumn
          handleEdit={() => handleEdit(record.id)}
          handleActiveInactive={() => handleActiveInactive(record.id, activeTab, fetchData)}
          handleDelete={() => handleDelete(record.id, fetchData)}
          statusCode={activeTab}
          loading={loadingOnUserAction}
        />
      )
    }
  ];

  return (
    <>
      <CustomBreadCrumb pageLists={listPageBreadCrumb} />
      <Card
        title={
          <PageTitleWithButton
            title="User List"
            link="/users/add"
            addBtn={true}
          />
        }
      >
        <CustomTab
          handleChange={() => handleTabChange(fetchData)}
          defaultActiveId={activeTab}
          Children={(
            <CustomTable
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
  );
}

export default UserList;