import { useField } from 'formik';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-3">
            <label className="block mb-1">{label}</label>
            <input {...field} {...props} className="border px-2 py-1 w-full rounded" />
            {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
        </div>
    );
};  

export default function Step1() {
    return (
        <>
            <TextField name="name" label="Name" type="text" />
            <TextField name="email" label="Email" type="email" />
        </>
    );
}
