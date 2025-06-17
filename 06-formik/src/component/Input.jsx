export const Input = ({ label, name, formik, ...props }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                name={name}
                {...props}
                onChange={formik.handleChange}
                value={formik.values[name]}
                onBlur={formik.handleBlur}
            />
            {formik.errors[name] && formik.touched[name] && (
                <p className="mt-1 text-sm text-red-600">{formik.errors[name]}</p>
            )}
        </div>
    );
};
