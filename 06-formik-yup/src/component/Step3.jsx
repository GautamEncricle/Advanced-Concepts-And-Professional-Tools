import { useFormikContext } from 'formik';

export default function Step3() {
    const { values } = useFormikContext();
    return (
        <div>
            <h3 className="font-bold mb-2">Confirm your info:</h3>
            <p><strong>Name:</strong> {values.name}</p>
            <p><strong>Email:</strong> {values.email}</p>
            <p><strong>Address:</strong> {values.address}</p>
            <p><strong>City:</strong> {values.city}</p>
        </div>
    );
}
