import * as Yup from 'yup';

export const step1Validation = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
})


export const step2Validation = Yup.object({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
});
