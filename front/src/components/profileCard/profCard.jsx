import React, { useEffect, useState } from 'react';
import { url } from '../../static/conf';
import UploadArticle from '../UploadArticle';
import UserArticle from './UserArticle';

function profCard({
    user
}) {
    const [Articles, setArticles] = useState([]);
    const [userArticle, setuserArticle] = useState([]);

    useEffect(() => {

        fetchUserArticles();
        return () => {

        };
    }, []);

    function fetchUserArticles() {
        fetch(`${url}/article`).then(
            (res) => res.json())
            .then((data) => {
                if (data?.articles?.length > 0) {
                    setArticles(data?.articles)
                } else {
                    alert("error getting articles")
                }
            })
    }

    useEffect(() => {
        if (Articles?.length > 0) {

            let userarticle = Articles?.filter(element => {
                return element.publishedBy == JSON.parse(localStorage.getItem("user"))?.email
            })
            if (userarticle?.length > 0) {
                userarticle?.map((article) => {
                    console.log(article);
                    setuserArticle((prev) => [...prev, article])
                })
            }
        }
        return () => {

        };
    }, [Articles]);

    useEffect(() => {
        setuserArticle(userArticle)
        console.log(userArticle);
        return () => {

        };
    }, [userArticle]);


    return (
        <>
            <div className="block overflow-hidden bg-white shadow-xl rounded-2xl" href="">
                <img
                    className="object-cover w-full h-56"
                    src="https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt=""
                />
                <div className="relative pt-20 text-center">
                    <div
                        className="
                    absolute
                    w-24
                    h-24
                    bg-green-800
                    rounded-lg
                    shadow-xl
                    transform
                    -translate-x-1/2
                    -top-10
                    left-1/2
                             "
                    >
                        <img 
                        className='bg-cover w-30 h-30'
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
                    </div>

                    <div className="px-6 sm:px-12">
                        <h5 className="text-xl font-bold text-gray-900">
                            {user?.username}
                        </h5>

                        <p className="mt-2 text-sm text-gray-500">
                            {user?.email}
                        </p>
                    </div>
                    <UploadArticle />
                </div>

            </div>
            <div className=" grid grid-cols-3 p-5   bg-coolGray-100 text-coolGray-800">
                {
                    userArticle && userArticle.map(article => {
                        return (

                            <UserArticle data={article} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default profCard;
