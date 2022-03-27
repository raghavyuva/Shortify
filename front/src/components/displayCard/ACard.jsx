import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { url } from '../../static/conf';

function ACard({
    data
}) {
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
        <Link to={{
            pathname: `/Read/Article/${data?.title}`,
        }}
            state={data}
            className='m-2'
        >
            <a href="#" className="max-w-sm mx-auto group hover:no-underline focus:no-underline  shadow-xl ">
                <p>
                    {time} Minute Read
                </p>
                <img role="presentation" className="object-cover w-full rounded h-44 bg-coolGray-500" src={`${url}/serve/${data?.image}`} />
                <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">{data?.title}</h3>
                    <span className="text-xs text-coolGray-600">{date},{data?.publishedBy},</span>
                    <p className='line-clamp-3'>
                        {data?.content}
                    </p>
                </div>
            </a>
        </Link>
    )
}

export default ACard;
