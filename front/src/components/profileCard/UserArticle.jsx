import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { url } from '../../static/conf';

function UserArticle({
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
    function DeleteArticle(data) {
        try {
            fetch(`${url}/article`, {
                method: "DELETE",
                body: JSON.stringify({
                    a_ID: data?.a_ID
                }),
                headers: {
                    "content-type": "application/json"
                }

            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                })
        } catch (error) {
            console.log(error);
        }
    }
    let URI = url + "/serve/" + data?.image
    return (
        <Link to={{
            pathname: `/Read/Article/${data?.title}`,
        }}
            state={data}
        >
            <div className=" m-2">

                <div className={`relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 bg-coolGray-500`}
                    style={{
                        backgroundImage: `url(${URI})`
                    }}
                >
                    <div className={`absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b via-transparent from-coolGray-900 to-coolGray-900  `}></div>
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                        <a href="#" className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-coolGray-100 bgundefined">{time} Minute Read</a>
                        <MdDelete size={25} onClick={() => DeleteArticle(data)} />
                        <div className="flex flex-col justify-start text-center text-coolGray-100">
                            <span className="text-3xl font-semibold leading-none tracking-wide">{date?.slice(10, 13)}</span>
                            <span className="leading-none uppercase">{date?.slice(4, 8)}</span>
                        </div>
                    </div>
                    <h2 className="z-10 p-5">
                        <a href="#" className="font-medium text-md hover:underline text-coolGray-100 line-clamp-3">{data?.content}</a>
                    </h2>
                </div>
            </div>
        </Link>
    )
}

export default UserArticle;
