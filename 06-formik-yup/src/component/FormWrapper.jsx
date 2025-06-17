import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

import { step1Validation, step2Validation } from '../validation/schemas';
const steps = ['Step1', 'Step2', 'Step3'];

const initialValues = {
    name: '',
    email: '',
    address: '',
    city: '',
};

function FormWrapper() {
    const [step, setStep] = useState(0);

    const getValidationSchema = () => {
        switch (step) {
            case 0: return step1Validation;
            case 1: return step2Validation;
            default: return null;
        }
    };

    const isLastStep = step === steps.length - 1;

    const handleSubmit = (values, actions) => {
        if (!isLastStep) {
            setStep(step + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        } else {
            alert(JSON.stringify(values, null, 2));
            actions.resetForm();
            setStep(0);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border rounded">
            <h2 className="text-xl font-bold mb-4">Multi-Step Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema()}
                onSubmit={handleSubmit}
            >
                <Form>
                    {step === 0 && <Step1 />}
                    {step === 1 && <Step2 />}
                    {step === 2 && <Step3 />}
                    <div className="mt-4 flex justify-between">
                        {step > 0 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="bg-gray-300 px-4 py-1 rounded"
                            >
                                Back
                            </button>
                        )}
                        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                            {isLastStep ? 'Submit' : 'Next'}
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default FormWrapper
