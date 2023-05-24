import CustomBreadCrumb from "../../../components/Common/BreadCrumb/CustomBreadCrumb";
import UseUsers from "../../../hooks/UserHooks/useUsers";
import {Card, Col, Row, Select} from "antd";
import PageTitleWithButton from "../../../components/Common/PageTitle/PageTitleWithButton";
import CustomForm from "../../../components/Common/Form/CustomForm";
import CustomInput from "../../../components/Common/InputFields/CustomInput";
import FormItem from "antd/es/form/FormItem";
import {
  bdPhoneNumber,
  maxInputFieldLength,
  maxTextAreaLength,
  phoneNumberMaxLength,
  userNameRegex
} from "../../../Helper/CommonStings";
import {useEffect} from "react";
import PasswordField from "../../../components/Common/Form/PasswordField";
import ConfirmPasswordField from "../../../components/Common/Form/ConfirmPasswordField";
import CustomTextArea from "../../../components/Common/InputFields/CustomTextArea";
import CustomFormSubmit from "../../../components/Common/Form/CustomFormSubmit";

const UserCreate = () => {
  const {
    id,
    loading,
    userForm,
    userTypes,
    addPageBreadCrumb,
    onReset,
    handleSubmit,
    goToListPage,
    getUserDataFromId,
    getUserTypeList,
  } = UseUsers()

  const title = id ? 'Update user details' : 'Create new user'

  useEffect(() => {

    if (id) {
      getUserDataFromId(id)
    }
    getUserTypeList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomBreadCrumb pageLists={addPageBreadCrumb}/>
      <Card
        title={
          <PageTitleWithButton title={title} addBtn={false} onClickHandle={goToListPage}/>
        }
      >
        <CustomForm
          name={"userCreateForm"}
          form={userForm}
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Row>
            <Col md={12} sm={24}>
              <FormItem
                label={'Name'}
                name='name'
                rules={[
                  {required: true, message: "Name field is required"},
                  {max: maxInputFieldLength, message: `Name can be maximum of ${maxInputFieldLength} characters`}
                ]}
              >
                <CustomInput
                  placeholder="Please enter full name"
                  maxLength={maxInputFieldLength}
                />
              </FormItem>

              <FormItem
                label={'User Type'}
                name='typeId'
                rules={[
                  {required: true, message: "Please select user type"},
                ]}
              >
                <Select
                  allowClear
                  placeholder={"Please select user type"}
                >
                  {
                    userTypes.map((type) => (
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                    ))
                  }
                </Select>
              </FormItem>

              <FormItem
                label={'Username'}
                name='userName'
                rules={[
                  {
                    required: true,
                    message: "Username field is required"
                  },
                  {
                    min: 4,
                    message: 'Username should be at least 4 characters long'
                  },
                  {
                    max: maxInputFieldLength,
                    message: `Username can be maximum of ${maxInputFieldLength} characters`
                  },
                  {
                    pattern: new RegExp(userNameRegex),
                    message: "Username should start with uppercase or lowercase character. " +
                      "And can only contain Uppercase or Lowercase characters and numbers"
                  }
                ]}
              >
                <CustomInput
                  placeholder="Please enter username"
                  maxLength={maxInputFieldLength}
                />
              </FormItem>

              {
                (!id) ?
                  (
                    <>
                      <PasswordField
                        name={"password"}
                        label={"Enter new password"}
                        required={(!id)}
                        showIcon={false}
                      />
                      <ConfirmPasswordField
                        name={"confirmPassword"}
                        confirmField={"password"}
                        label={"Confirm password"}
                        required={(!id)}
                        showIcon={false}
                      />
                    </>
                  ) :
                  null
              }
            </Col>
            <Col md={12} sm={24}>
              <FormItem
                label={'E-mail'}
                name='email'
                rules={[
                  {
                    required: true,
                    message: "E-mail field is required"
                  },
                  {
                    type: 'email',
                    message: 'The value should be a valid e-mail address'
                  },
                  {
                    max: maxInputFieldLength,
                    message: `E-mail field can be maximum of ${maxInputFieldLength} characters`
                  },
                ]}
              >
                <CustomInput
                  placeholder="Please enter E-mail address"
                  maxLength={maxInputFieldLength}
                  type="email"
                />
              </FormItem>

              <FormItem
                label={'Phone number'}
                name='phoneNumber'
                rules={[
                  {
                    required: true,
                    message: "Phone number field is required"
                  },
                  {
                    max: phoneNumberMaxLength,
                    message: `Phone Number field can be maximum of ${phoneNumberMaxLength} characters`
                  },
                  {
                    pattern: new RegExp(bdPhoneNumber),
                    message: `Please enter a valid phone number`
                  },
                ]}
              >
                <CustomInput
                  placeholder="Please enter phone number"
                  maxLength={phoneNumberMaxLength}
                />
              </FormItem>

              <FormItem
                label={'Address'}
                name='address'
                rules={[
                  {
                    max: maxTextAreaLength,
                    message: `Phone Number field can be maximum of ${maxTextAreaLength} characters`
                  },
                ]}
              >
                <CustomTextArea
                  placeholder="Please enter address"
                  maxLength={maxTextAreaLength}
                />
              </FormItem>
            </Col>
          </Row>
          <CustomFormSubmit id={id} onReset={onReset} loading={loading} sm={null} md={null} lg={4}/>

        </CustomForm>
      </Card>
    </>
  )
}

export default UserCreate