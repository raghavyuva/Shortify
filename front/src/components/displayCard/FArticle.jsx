import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../static/conf';
function FArticle({ data }) {
    let date = new Date(data?.created_at).toDateString()
    const [time, settime] = useState(0);

    useEffect(() => {

        setReadingTime();

        return () => {

        };
    }, [data]);


    

    function setReadingTime() {
        let count = data?.content.split("").length;
        settime(Math.ceil(count / 400));
    }

    return (

        <div className="block max-w-sm gap-3 mx-auto sm:max-w-full group hover:no-underline shadow-2xl focus:no-underline lg:grid lg:grid-cols-12 bg-coolGray-50">
            <img src={`${url}/serve/${data?.image}`} alt="" className="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-cool Gray-500" />
            <div className="p-6 space-y-2 lg:col-span-5">
                <div className='flex'>
                    <p className='mr-3'>
                        {time} Minute Read
                    </p>
                </div>
                <Link to={{
                    pathname: `/Read/Article/${data?.title}`,
                }}
                    state={data}
                >
                    <h3 className="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">{data?.title}</h3>
                    <span className="text-xs text-coolGray-600 "  >{date}</span>
                    <p className='line-clamp-5'>{data?.content}</p>
                </Link>
            </div>
        </div>
    )
}

export default FArticle;
