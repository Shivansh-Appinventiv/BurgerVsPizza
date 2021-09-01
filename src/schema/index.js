import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string().required("Required!"),
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required!"),
  password: Yup.string().required("Required!"),
});

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string().required("Required!"),
  lastName: Yup.string().required("Required!"),
  email: Yup.string().email("Inavlid Email address").required("Required!"),
  phoneNo: Yup.number()
    .typeError("Phone Number should be number type")
    .required("Required!"),
  address: Yup.string().required("Required!"),
  city: Yup.string().required("Required!"),
  state: Yup.string().required("Required!"),
  zip: Yup.number()
    .typeError("ZipCode should be number type")
    .required("Required!"),
});

const Schema = {
  LoginSchema,
  RegisterSchema,
  ProfileSchema,
};

export default Schema;
