import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import useMenuPermission from "../../../hooks/AdminSettings/useMenuPermission";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import {Card, Form, Select, Tree} from "antd";
import CustomForm from "../../../components/Common/Form/CustomForm";
import {useEffect} from "react";
import CustomFormItemContainer from "../../../components/Common/Form/CustomFormItemContainer";
import CustomFormSubmit from "../../../components/Common/Form/CustomFormSubmit";

const AddPermission = () => {
  const {
    id,
    loading,
    listUrl,
    roleData,
    checkedKeys,
    mappedRoles,
    expandedKeys,
    roleMenuForm,
    unMappedRoles,
    autoExpandParent,
    addPageBreadCrumb,
    onReset,
    onExpand,
    handleSubmit,
    onCheckTreeNode,
    onSelectCopyRole,
    getMappedAndUnmappedRoles
  } = useMenuPermission()

  useEffect(() => {
    getMappedAndUnmappedRoles()
  }, []);


  return (
    <>
      <CustomBreadCrumb pageLists={addPageBreadCrumb}/>
      <Card
        title={
          <PageTitleWithButton
            title="Add Role Menu Permission"
            link={listUrl}
            addBtn={false}
          />
        }
      >

        <CustomForm
          name="roleMenuForm"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{
            maxWidth: 800,
            margin: '0px auto'
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          form={roleMenuForm}
        >

          <CustomFormItemContainer>
            <Form.Item
              name="roleId"
              label="Role Name"
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Role To Assign Permission"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                disabled={(id)}
              >
                {unMappedRoles.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <Form.Item
              name="copyFromRoleId"
              label="Copy From Role Name"
            >
              <Select
                showSearch
                allowClear
                optionFilterProp="children"
                placeholder="Select Role To Copy From"
                onSelect={onSelectCopyRole}
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }

              >
                {mappedRoles.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <Form.Item
              name="selected_keys"
              label="Select Role Wise Menus"
            >
              <Tree
                checkable
                selectable={false}
                treeData={roleData}
                onCheck={onCheckTreeNode}
                checkedKeys={checkedKeys}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onExpand={onExpand}
              />
            </Form.Item>
          </CustomFormItemContainer>

          <CustomFormSubmit id={id} onReset={onReset} loading={loading} lg={10}/>
        </CustomForm>
      </Card>
    </>
  )
}

export default AddPermission