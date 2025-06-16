// import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { logoutUser } from '../redux/apiSlice';

// export const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const user = useSelector((state) => state.auth.user);
//     const loading = useSelector((state) => state.auth.loading);

//     useEffect(() => {
//         // You can add any side effects related to user or loading here if needed
//     }, [user, loading]);

//     // logout handler
//     const logout = () => {
//         localStorage.removeItem("token");
//         dispatch(logoutUser());
//         navigate('/login');
//     };

//     return (
//         <>
//             {children}
//         </>
//     );
// };

// export const useAuth = () => {
//     const user = useSelector((state) => state.auth.user);
//     const loading = useSelector((state) => state.auth.loading);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.removeItem("token");
//         dispatch(logoutUser());
//         navigate('/login');
//     };

//     return { user, loading, logout };
// };
