import * as yup from "yup";

export const userValidationSchema = yup.object().shape({
    firstName: yup
    .string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is too Long!')
    .required('First name is required')
    .matches(/^[a-zA-Z0-9]+$/, "First name must contain only alphabets and numbers allowed"),
    lastName: yup
    .string()
    .min(2, 'First name is too Short!')
    .max(50, 'First name is too Long!')
    .required('First name is required')
    .matches(/^[a-zA-Z0-9]+$/, "First name must contain only alphabets and numbers allowed"),
    userName: yup
        .string()
        .min(2, 'Username is too Short!')
        .max(50, 'Username is too Long!')
        .required('Username is required')
        .matches(/^[a-zA-Z0-9]+$/, "User name must contain only alphabets and numbers allowed"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required email")
        .matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Invalid email address"),
    password: yup
        .string()
        .matches(/^.{8,}$/, 'Password must be at least 8 characters long.')
        .required('Password is required.'),
})


export const userLoginValidationSchema = yup.lazy((values) =>
    yup.object().shape({
        userName: !values.email
            ? yup
                .string()
                .min(2, "Username is too Short!")
                .max(50, "Username is too Long!")
                .required("Username is required")
                .matches(/^[a-zA-Z0-9]+$/, "User name must contain only alphabets and numbers allowed")
            : yup.string().notRequired(),
        email: !values.userName
            ? yup
                .string()
                .email("Invalid email address")
                .required("Email is required")
                .matches(
                    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    "Invalid email format"
                )
            : yup.string().notRequired(),
        password: yup
            .string()
            .matches(/^.{8,}$/, "Password must be at least 8 characters long.")
            .required("Password is required."),
    })
);

