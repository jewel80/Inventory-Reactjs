import {Alert, Card, Col, Form, Row} from "antd";
import logo from "../../assets/Images/sl-logo.svg";
import CustomInput from "../../components/Common/InputFields/CustomInput";
import {MailOutlined} from "@ant-design/icons";
import CustomButton from "../../components/Common/Buttons/CustomButton";
import useLogin from "../../hooks/LoginHooks/useLogin";
import {useEffect} from "react";
import PasswordField from "../../components/Common/Form/PasswordField";
import ConfirmPasswordField from "../../components/Common/Form/ConfirmPasswordField";

const ResetPassword = () => {

  const {
    loading,
      errorData,
    passwordResetForm,
    handleResetPassword,
    getEmailAddressFromUrl
  } = useLogin();

  useEffect(() => {
    getEmailAddressFromUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Row className="login-row">
      <div id="custom-shape"></div>
      <Col xs={20} sm={16} md={12} lg={8} className="login-column">
        <div className="login-logo">
          <img src={logo} alt="Shoplover Logo" />
        </div>
        <Card
          title={
            <div className="login-logo">
              <h1 className="login-title">Inventory Panel</h1>
            </div>
          }
          className="card-wrapper"
        >
          <div id="login-card" style={{width: '100%'}}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleResetPassword}
              form={passwordResetForm}
              style={{
                width: '100%'
              }}
            >
              <h2 className="login-title" style={{marginBottom: '15px'}}>
                Password Reset.
              </h2>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'E-mail address is required' },
                  {
                    type: 'email', message: 'Please enter a valid E-mail '
                  }
                ]}
              >
                <CustomInput
                  type='email'
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Please enter your registered e-mail."
                />
              </Form.Item>
              <PasswordField name={"newPassword"} />
              <ConfirmPasswordField name={"confirmNewPassword"} confirmField={'newPassword'} />
              {
                (errorData.length > 0) ?
                  (
                    <div className="error">
                      <Alert message={
                        <ul>
                          {
                            errorData.map((err, index) => <li key={index}>{err}</li>)
                          }
                        </ul>
                      } type="error" />
                    </div>
                  ) :
                  ''
              }
              <Form.Item>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{width: "100%", marginTop: '15px'}}
                  text="Update password"
                  loading={loading}
                />
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default ResetPassword