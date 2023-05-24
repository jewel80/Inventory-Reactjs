import "../../assets/styles/Login/Login.scss"
import {Alert, Card, Col, Form, Row} from "antd";
import logo from "../../assets/Images/sl-logo.svg";
import CustomInput from "../../components/Common/InputFields/CustomInput";
import {MailOutlined} from "@ant-design/icons";
import CustomButton from "../../components/Common/Buttons/CustomButton";
import useLogin from "../../hooks/LoginHooks/useLogin";

const SendEmail = () => {
  const {
    loading,
    sendEmailConfirmation,
    navigate,
    handleSendMail,
  } = useLogin();
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
            {
              sendEmailConfirmation.success ? (
                <div>
                  <Alert message={(
                    <h2 className="login-title" style={{margin: '20px'}}>
                      {sendEmailConfirmation.message}
                    </h2>
                  )} type="info" />
                  <CustomButton
                    style={{
                      margin: "15px",
                      float: "right"
                    }}
                    className="login-form-button"
                    onClick={() => navigate('/login')}
                    text="Back to Login" type={"primary"}
                  />
                </div>
              ) : (
                <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={handleSendMail}
                  style={{
                    width: '100%'
                  }}
                >

                  <h2 className="login-title" style={{marginBottom: '15px'}}>
                    Please submit your registered e-mail address.
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
                  <Form.Item>
                    <CustomButton
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                      style={{width: "100%", marginTop: '15px'}}
                      text="Send Email"
                      loading={loading}
                    />
                  </Form.Item>
                </Form>
              )
            }
          </div>
        </Card>
      </Col>
    </Row>
  )
}

export default SendEmail