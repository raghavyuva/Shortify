import React from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/actions/UserActions';

function Logout() {
    const dispatch = useDispatch();
    
    const onLogoutRequest = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            dispatch(setToken(null))
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <button
                onClick={onLogoutRequest}
                className="inline-block p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                <span className="block px-8 py-3 font-medium text-white bg-gray-900 rounded-full hover:bg-opacity-75">
                    Logout
                </span>
            </button>
        </div>
    )
}

export default Logout;
