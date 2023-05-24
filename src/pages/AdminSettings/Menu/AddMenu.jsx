import useMenu from "../../../hooks/AdminSettings/useMenu";
import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import {Card, Select, Switch} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomFormItemContainer from "../../../components/Common/Form/CustomFormItemContainer";
import FormItem from "antd/es/form/FormItem";
import CustomInput from "../../../components/Common/InputFields/CustomInput";
import {maxInputFieldLength} from "../../../Helper/CommonStings";
import CustomFormSubmit from "../../../components/Common/Form/CustomFormSubmit";
import CustomForm from "../../../components/Common/Form/CustomForm";
import {useEffect} from "react";

const AddMenu = () => {
  const {
    id,
    title,
    listUrl,
    loading,
    menuForm,
    menuList,
    parentDisabled,
    addPageBreadCrumb,
    onReset,
    handleSubmit,
    fetchParentList,
    setParentDisabled
  } = useMenu()

  useEffect(() => {
    fetchParentList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <CustomBreadCrumb pageLists={addPageBreadCrumb} />
      <Card
        title={
          <PageTitleWithButton title={title} link={listUrl} addBtn={false} />
        }
      >
        <CustomForm
          name="menuForm"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{
            maxWidth: 800,
            margin: '0px auto'
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          form={menuForm}
        >
          <CustomFormItemContainer>
            <FormItem
              name={"isParent"}
              label={"Is Parent"}
              valuePropName="checked"
            >
              <Switch onChange={(value) => setParentDisabled(value)}/>
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"parentId"}
              label={"Select Parent"}
            >
              <Select allowClear placeholder={"Please select a parent"} disabled={parentDisabled}>
                {
                  menuList.map(menu => (
                    <Select.Option key={menu.id} value={menu.id}>{menu.title}</Select.Option>
                  ))
                }
              </Select>
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"name"}
              label={"Menu Name"}
              rules={[
                {
                  required: true,
                  message: 'Name field is required'
                }
              ]}
            >
              <CustomInput
                placeholder="Please enter menu name"
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"sortId"}
              label={"Sort"}
              rules={[
                {
                  required: true,
                  message: 'sort field is required'
                }
              ]}
            >
              <CustomInput
                type={'number'}
                placeholder="Please enter sorting number"
                max={1000}
                rules={[
                  {
                    max: 1000,
                    message: 'Maximum value can be 1000'
                  }
                ]}
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"code"}
              label={"Code"}
              rules={[
                {
                  max: 70,
                  message: 'Maximum value can be 100'
                },
                {
                  min: 3,
                  message: 'At least 3 characters needed'
                }
              ]}
            >
              <CustomInput
                placeholder="Please enter menu code"
                maxLength={100}
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"levelAt"}
              label={"Level At"}
            >
              <CustomInput
                type={'number'}
                placeholder="Please enter lavel number"
                max={maxInputFieldLength}
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"url"}
              label={"URL"}
              rules={[
                {
                  max: 100,
                  message: 'Maximum value can be 100'
                }
              ]}
            >
              <CustomInput
                placeholder="Please enter url"
                maxLength={100}
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"menuIcon"}
              label={"Menu Icon"}
            >
              <CustomInput maxLength={maxInputFieldLength}/>
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"isVisible"}
              label={"Is Visible"}
              valuePropName="checked"
            >
              <Switch />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"showMenu"}
              label={"Show in Menu"}
              valuePropName="checked"
            >
              <Switch />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormSubmit id={id} onReset={onReset} loading={loading} lg={10}/>
        </CustomForm>
      </Card>
    </>
  )
}

export default AddMenu