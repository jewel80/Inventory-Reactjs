import useUserTypes from "../../../hooks/UserHooks/useUserTypes";
import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import CustomTab from "../../../components/Common/CustomTab/CustomTab";
import CustomTable from "../../../components/Common/Table/CustomTable";
import Helper from "../../../Helper/Helper";
import useGenericPagination from "../../../hooks/GenericPagination/useGenericPagination";
import TableActionColumn from "../../../components/Common/Table/TableActionColumn";
import {Card} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";

const UserTypes = () => {
  const {
    urls,
    loading : loadingOnUserAction,
    listPageBreadCrumb,
    handleEdit,
    handleDelete,
    handleTabChange,
    handleActiveInactive,
  } = useUserTypes();

  const {getSerialNumber, formatDate} = Helper();

  const {
    loading,
    collection,
    currentPage,
    itemsPerPage,
    totalElements,
    paginate,
    fetchData
  } = useGenericPagination(urls[0], true);

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
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => record.description
    },
    {
      title: "Created By",
      dataIndex: "createdByName",
      key: "createdByName",
      render: (_, record) => record.createdByName
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
          handleActiveInactive={() => handleActiveInactive(record.id, record.statusId, fetchData)}
          handleDelete={() => handleDelete(record.id, fetchData)}
          statusCode={record.statusId}
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
            title="User Type List"
            link="/users/type/add"
            addBtn={true}
          />
        }
      >
        <CustomTab
          handleChange={() => handleTabChange(fetchData)}
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

export default UserTypes;