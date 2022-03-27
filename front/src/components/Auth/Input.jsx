import React from 'react';

const Input = ({
    type,
    placeholder,
    value,
    onvalChange,
    Icon,
    visible,
    setvisible
}) => {
    return (
        <>
            <div>
                <label className="sr-only">{type}</label>
            </div>
            <div className="relative">
                <input
                    type={visible == undefined ? type : visible ? type : "email"}
                    className="w-full p-4 pr-12 text-sm border-gray-500 rounded-lg shadow-sm "
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onvalChange(e.target.value)}
                />
                <span className="absolute inset-y-0 inline-flex items-center right-4">
                    {
                        Icon && <Icon className=''
                            onClick={() => {
                                visible != undefined && setvisible(!visible)
                            }}
                        />
                    }
                </span>
            </div>
        </>
    )
};

export default Input;
