import {Card, Checkbox, Col, Form, Row} from "antd";
import "../../assets/styles/Login/Login.scss"
import useLogin from "../../hooks/LoginHooks/useLogin";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import logo from "../../assets/Images/sl-logo.svg"
import {Link} from "react-router-dom";
import CustomInput from "../../components/Common/InputFields/CustomInput";
import CustomButton from "../../components/Common/Buttons/CustomButton";

const Login = () => {
  const {
          loading,
          handleSubmit
        } = useLogin()
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
              <p><b>user name: </b>admin <b>password: </b>Bd@1971</p>
            </div>
          }
          className="card-wrapper"
        >
          <div id="login-card" style={{width: '100%'}}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
              style={{
                width: '100%'
              }}
            >
              <Form.Item
                name="userName"
                rules={[
                  { required: true, message: 'Please input your Username!' }
                ]}
              >
                <CustomInput prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                noStyle={false}
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <CustomInput
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link to="/send-email" className="login-form-forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </Form.Item>

              <Form.Item>
                <CustomButton
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{width: "100%"}}
                  text="Log in"
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

export default Login;