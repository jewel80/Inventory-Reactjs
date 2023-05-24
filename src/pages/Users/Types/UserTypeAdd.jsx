import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import {Card} from "antd";
import useUserTypes from "../../../hooks/UserHooks/useUserTypes";
import {useEffect} from "react";
import FormItem from "antd/es/form/FormItem";
import CustomInput from "../../../components/Common/InputFields/CustomInput";
import CustomForm from "../../../components/Common/Form/CustomForm";
import CustomTextArea from "../../../components/Common/InputFields/CustomTextArea";
import CustomFormSubmit from "../../../components/Common/Form/CustomFormSubmit";
import CustomFormItemContainer from "../../../components/Common/Form/CustomFormItemContainer";
import {maxTextAreaLength} from "../../../Helper/CommonStings";

const UserTypeAdd = () => {

  const {
    id,
    loading,
    userTypeForm,
    addPageBreadCrumb,
    handleSubmit,
    onReset,
    getUserTypeDataFromId
  } = useUserTypes()

  const title = id ? "User Type Edit" : "User Type Add";

  useEffect(() => {
    if(id) {
      getUserTypeDataFromId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CustomBreadCrumb pageLists={addPageBreadCrumb} />
      <Card
        title={
          <PageTitleWithButton
            title={title}
            link="/users/type"
            addBtn={false}
          />
        }
      >
        <CustomForm
          name="userTypeForm"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          style={{
            maxWidth: 600,
            margin: '0px auto'
          }}
          onFinish={handleSubmit}
          autoComplete="off"
          form={userTypeForm}
        >
          <CustomFormItemContainer>
            <FormItem
              name={"name"}
              label={"Name"}
              rules={[
                {
                  required: true,
                  message: 'Name field is required'
                }
              ]}
            >
              <CustomInput
                placeholder="Please enter user type name"
              />
            </FormItem>
          </CustomFormItemContainer>

          <CustomFormItemContainer>
            <FormItem
              name={"description"}
              label={"Description"}
              rules={[
                {max: maxTextAreaLength, message: `Maximum ${maxTextAreaLength} characters allowed`}
              ]}
            >
              <CustomTextArea maxLength={maxTextAreaLength}/>
            </FormItem>
          </CustomFormItemContainer>
          <CustomFormSubmit id={id} onReset={onReset} loading={loading} lg={10}/>
        </CustomForm>
      </Card>
    </>
  )
}

export default UserTypeAdd