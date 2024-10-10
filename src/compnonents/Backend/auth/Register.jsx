import "./register.css";
import { FaPhabricator, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import Api from "../../Helper/Api";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Container } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";

const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;

const validationSchame = Yup.object().shape({
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "Minimum Required length is 3")
    .max(10, "Maximum Required length 10"),
  lastname: Yup.string()
    .required("Last name is required")
    .min(3, "Minimum Required length is 3")
    .max(10, "Maximum Required length 10"),
  role: Yup.string().required("First name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email")
    .matches(emailRegExp, "Please enter a valid email"),

  password: Yup.string()
    .required("password is required")
    .min(8, "Minimum Required length is 8")
    .max(20, "Maximum Required length 20")
    .matches(
      passwordRegExp,
      "password must be at least one uppercase letter, one lowercase letter, one number and one special character 8."
    ),
  confirmPassword: Yup.string()
    .required("confirm Password required")
    .oneOf(
      [Yup.ref("password"), null],
      " Must match the the first password input"
    ),
});

const style = {
  marginTop: "20px",
  marginBottom: "20px",
  border: 0,
};

function Register() {
  const navigate = useNavigate();
  const userSiginin = useSelector((state) => state.userSignin);
  const { userInfo } = userSiginin;

  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);

  const handlePasswordClick = () => {
    setPasswordEye(!passwordEye);
  };

  const handleConfirmPasswordClick = () => {
    setConfirmPasswordEye(!confirmPasswordEye);
  };

  const onSubmit = async (values) => {
    formik.resetForm();
    const { firstname, lastname, email, role, password, confirmPassword } =
      values;
    const res = await Api.post(
      "/register",
      {
        firstname,
        lastname,
        role,
        email,
        password,
        confirmPassword,
      },
      {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
    ).catch((err) => {
      if (err && err.response) toast.error(err.response.data.data);
    });
    if (res) {
      // setAuth(true);
      toast.success(res.data.data);
    }

    navigate("/HomeB/users");
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      role: "",
      confirmPassword: "",
      email: "",
    },
    onSubmit,
    validationSchema: validationSchame,
  });

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#E1F0FF",
          height: "120px",
          marginTop: "-4px",
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginLeft: "4rem",
            padding: "53px",
            fontFamily: ["Miriam Libre ", "sans-serif"],
          }}
        >
          Users
        </div>
      </Container>
      <Container
        style={{
          backgroundColor: "#E1F0FF",
          marginBottom: "20px",
          marginTop: "20px",
          borderRadius: "9px",
          paddingTop: "4px",
          paddingLeft: "12px",
          paddingBottom: "1px",
        }}
      >
        <div>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/HomeB" }}>
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
            <Breadcrumb.Item active> Users</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Container>
      <Container>
        <hr style={style} />
      </Container>
      <Container>
        <div>
          <form className="form" onSubmit={formik.handleSubmit}>
            <div>
              <h1> Register</h1>
            </div>
            {/* {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>} */}
            <div>
              <label htmlFor="email">First Name</label>
              <input
                type="text"
                id="firstname"
                autoComplete="off"
                placeholder="John"
                name="firstname"
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                required
              />
              <span style={{ color: "red" }}>
                {formik.touched.firstname && formik.errors.firstname
                  ? formik.errors.firstname
                  : ""}
              </span>
            </div>
            <div>
              <label htmlFor="email"> Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter lastname"
                name="lastname"
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                onChange={formik.handleChange}
                required
              />
              <span style={{ color: "red" }}>
                {formik.touched.lastname && formik.errors.lastname
                  ? formik.errors.lastname
                  : ""}
              </span>
            </div>
            <div>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                onBlur={formik.handleBlur}
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                placeholder="Enter Email"
              />
              <span style={{ color: "red" }}>
                {formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : ""}
              </span>
            </div>
            <div>
              <label htmlFor="roles">Roles</label>

              <input
                type="text"
                id="role"
                placeholder="Users / Admin "
                name="role"
                onBlur={formik.handleBlur}
                value={formik.values.role}
                onChange={formik.handleChange}
                required
              />
              <span style={{ color: "red" }}>
                {formik.touched.role && formik.errors.role
                  ? formik.errors.role
                  : ""}
              </span>
            </div>
            <div>
              <label htmlFor="password"> Password</label>
              <input
                placeholder="Enter password"
                id="password"
                required
                type={passwordEye === false ? "password" : "text"}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              <span style={{ color: "red" }}>
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </span>
              <div
                style={{
                  marginTop: "-44px",
                  textAlign: "end",
                  fontSize: "20px",
                }}
              >
                {passwordEye === false ? (
                  <FaPhabricator size={30} onClick={handlePasswordClick} />
                ) : (
                  <FaEye size={30} onClick={handlePasswordClick} />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="password"> confirm Password</label>
              <input
                id="confirm_pwd"
                placeholder="confirm Password"
                type={confirmPasswordEye === false ? "password" : "text"}
                name="confirmPassword"
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onPaste={(e) => {
                  e.preventDefault();
                  return false;
                }}
                required
              />
              <span style={{ color: "red" }}>
                {formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? formik.errors.confirmPassword
                  : ""}
              </span>
              <div
                style={{
                  marginTop: "-44px",
                  textAlign: "end",
                  fontSize: "20px",
                }}
              >
                {confirmPasswordEye === false ? (
                  <FaPhabricator
                    size={30}
                    onClick={handleConfirmPasswordClick}
                  />
                ) : (
                  <FaEye size={30} onClick={handleConfirmPasswordClick} />
                )}
              </div>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
        
      </Container>
    </>
  );
}

export default Register;
