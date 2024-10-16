import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import { useLoginUserMutation } from "../../../redux/api/AuthApi";
import BasicButton from "../../../components/BasicButton";
import login from "../../../assests/images/loginimages.png";
import loginImage from "../../../assests/images/smalllogo.png";
import { toast } from "react-toastify";

const Login = () => {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const history = useNavigate();
  const [loginApi, { isLoading }] = useLoginUserMutation();

  const initialValues = {
    userName: "",
    password: "",
  };

  const showPassword = () => {
    setPasswordIcon(!passwordIcon);
  };

  const handleLogin = async (values) => {
    const { userName, password } = values;

    try {
      const response = await loginApi({
        userName,
        password,
      });
      if (response?.data) {
        toast.success(response?.data?.message, { autoClose: 1000 });
        history("/admin/dashboard");
      } else {
        toast.error(response?.error?.data.error, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      fluid
      className="vh-100 w-100 d-flex flex-column justify-content-center align-items-center bg-white"
      style={{ overflow: "hidden" }}
    >
      <Row className="justify-content-center align-items-center">
        <Col
          xs={12}
          md={6}
          lg={6}
          xl={6}
          className="justify-content-center align-items-center"
        >
          <img
            className="img-fluid d-none d-md-none d-sm-none d-lg-flex d-xl-flex d-xxl-flex d-lg-block ml-10 mt-md-4 justify-content-center align-items-center"
            src={login}
            alt="adminLoginImage"
            title="adminLoginImage"
            style={{ height: "500px", width: "800px" }}
          />
        </Col>

        <Col
          xs={12}
          md={12}
          lg={6}
          xl={6}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <Row
            className="shadow p-5 d-flex flex-column justify-content-center align-items-center"
            style={{ backgroundColor: "#718D74", borderRadius: "20px" }}
          >
            <Col className="d-flex flex-column justify-content-start align-items-start mt-3 mb-3">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  className="rounded-circle"
                  src={loginImage}
                  alt="adminLoginImage"
                  title="adminLoginImage"
                  style={{
                    height: "50px",
                    width: "50px",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <h4
                    className="mt-3 mb-0 color-white"
                    style={{ display: "inline-block" }}
                  >
                    YOGA NAME
                  </h4>
                  <div
                    style={{
                      borderBottom: "3px solid #ffffff",
                      width: "80px",
                      margin: "0 auto",
                    }}
                  ></div>
                </div>
              </div>

              <h5 className="justify-content-start align-items-start mt-4 mb-2 color-white" style={{ fontFamily: "'Roboto Mono', monospace" }}>
                Login
              </h5>
            </Col>
            <Col>
              <Formik
                initialValues={initialValues}
                validationSchema={LogAndRegSchema}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin(values);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form
                    className="d-flex flex-column justify-content-center"
                    onSubmit={handleSubmit}
                  >
                    <Row>
                      <Col xs={12}>
                        <Form.Label htmlFor="userName" className="text-white">
                        Email/Phone Number<span className="color-white">*</span>
                        </Form.Label>
                        <Form.Control
                          name="userName"
                          type="text"
                          id="userName"
                          placeholder="Enter your Email/Phone Number"
                          className={`form-control ${
                            touched.userName && errors.userName
                              ? "is-invalid"
                              : ""
                          }`}
                          style={{
                            backgroundColor: "#96AA97",
                            border: "none",
                            color: "#fff",
                          }}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-label="Email/Phone Number"
                        />
                        {touched.userName && errors.userName ? (
                          <p className="login-validation">{errors.userName}</p>
                        ) : null}
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col xs={12}>
                        <Form.Label htmlFor="password" className="text-white">
                          Password<span className="color-white">*</span>
                        </Form.Label>
                      </Col>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                          <Form.Control
                            name="password"
                            type={passwordIcon ? "text" : "password"}
                            size="md"
                            id="password"
                            placeholder="Enter your password"
                            className={`position-relative form-control ${
                              touched.password && errors.password
                                ? "border-danger"
                                : ""
                            }`}
                            style={{
                              backgroundColor: "#96AA97",
                              border: "none",
                              color: "#fff",
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-label="Password"
                          />
                          <div
                            className="position-absolute m-2 pointer"
                            onClick={showPassword}
                            aria-label="Toggle password visibility"
                          >
                            {passwordIcon ? (
                              <AiOutlineEye />
                            ) : (
                              <AiOutlineEyeInvisible />
                            )}
                          </div>
                        </Col>
                      </Row>
                    </Row>
                    {touched.password && errors.password ? (
                      <p className="login-validation">{errors.password}</p>
                    ) : null}

                    <BasicButton
                      className="mt-3"
                      variant={"warning"}
                      type="submit"
                      disabled={isSubmitting}
                      isLoading={isLoading}
                      label={"Login"}
                    />
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
