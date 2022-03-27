import React from 'react';
import { Link } from 'react-router-dom';

function Deviate({
    onAuthRequest,
    route,
    note
}) {
    return (
        <div className="flex items-center justify-between">
            <p className="text-sm text-white">
                {note?.routel}
                <Link className="underline" to={route} >{note?.routen}</Link>
            </p>
            <button
                type="submit"
                className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg "
                onClick={onAuthRequest}
            >
                Sign in
            </button>
        </div>
    )
}

export default Deviate;
