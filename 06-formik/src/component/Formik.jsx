import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup'; // ✅ Fixed this line
import { Input } from './Input';

const initialValues = {
    name: '',
    email: '',
    Description: ''
};

const validateSchema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    Description: yup.string().required('Required')
});

const Formik = () => {
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validateSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <Input
                    label="Name"
                    name="name"
                    type="text"
                    formik={formik}
                />
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    formik={formik}
                />
                <Input
                    label="Description"
                    name="Description"
                    type="text"
                    formik={formik}
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Formik;
