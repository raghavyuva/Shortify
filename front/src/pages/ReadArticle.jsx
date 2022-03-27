import React, { useState, useEffect } from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import Comment from '../components/Comment';
import DisplayComments from '../components/DisplayComments';
import Footer from '../components/Footer';
import { Nav } from '../components/topBar/topBar';
import { url } from '../static/conf';

const ReadArticle = ({

}) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [data, setData] = useState(location?.state);
    let date = new Date(data?.created_at).toDateString()
    const [commentData, setcommentData] = useState()
    const [Liked, setLiked] = useState(false)
    const [TotalLikes, setTotalLikes] = useState(0)
    useEffect(() => {

        checkWhetherLiked()
        fetchCommentData()
        return () => {

        }
    }, [data])


    function checkWhetherLiked() {
        fetch(`${url}/article/${data?.a_ID}/likes`).then(
            (res) => res.json())
            .then((data) => {
                console.log(data);
                if (data?.likes?.length > 0) {
                    setTotalLikes(data?.likes?.length)
                    let user = JSON.parse(localStorage.getItem("user"))
                    let obj = data?.likes?.find(o => o.likedBy === user?.email);
                    console.log(Object.keys(obj).length)
                    if (obj) {
                        setLiked(true)
                    }
                } else {
                    // alert("error getting articles")
                }
            })
    }

    const fetchCommentData = () => {
        fetch(`${url}/article/${data?.a_ID}/comment`).then(
            (res) => res.json())
            .then((data) => {
                console.log(data);
                if (data?.comments?.length > 0) {
                    setcommentData(data?.comments)

                } else {
                    // alert("error getting articles")
                }
            })
    }


    function LikeUnlike(action) {
        switch (action) {
            case "like":
                setLiked(true)
                LikeContent()
                break;
            case "unlike":
                setLiked(false)
                UnLikeContent()
                break;
            default:
                alert("invalid action")
                break;
        }
    }


    function LikeContent() {
        try {
            let user = JSON.parse(localStorage.getItem("user"))
            fetch(`${url}/article/${data?.a_ID}/like`, {
                method: "POST",
                body: JSON.stringify({
                    likedBy: user?.email,
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

    function UnLikeContent() {
        try {
            let user = JSON.parse(localStorage.getItem("user"))
            fetch(`${url}/article/${data?.a_ID}/like`, {
                method: "DELETE",
                body: JSON.stringify({
                    likedBy: user?.email,
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


    return (
        <div>
            <section className="bg-coolGray-100 text-coolGray-800">
                <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12 shadow-lg">
                    <Nav
                        isMenuOpen={isMenuOpen}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                    <div className='flex flex-col'>
                        <img src={`${url}/serve/${data?.image}`} alt="" className="object-contain w-full h-64 rounded sm:h-96 lg:col-span-7 bg-cool Gray-500" />
                        <div className="p-6 space-y-2 lg:col-span-5">
                            <h3 className="text-2xl font-semibold sm:text-4xl  group-hover:underline group-focus:underline">{data?.title}</h3>
                            <span className="text-xs  font-bold  "  >{date}, {data?.publishedBy}, {TotalLikes} Likes</span>
                            <p className=''>{data?.content}</p>
                        </div>
                    </div>
                    <div className='px-6'>
                        {!Liked ? <div className='flex items-center ' onClick={() => LikeUnlike("like")}>
                            <MdThumbUp size={25} className='mr-2' />
                            Like this Article
                        </div> : <div className='flex items-center' onClick={() => LikeUnlike("unlike")}>
                            <MdThumbDown size={25} className='mr-2' />
                            Mark Article not useful
                        </div>
                        }
                    </div>
                    <div className='font-bold font-mono text-xl pl-6'>
                        Comments on this Article
                    </div>
                    <div className='grid grid-cols-4 space-x-2'>
                        {
                            commentData && commentData?.length > 0 &&
                            commentData?.map((ele) => (
                                <DisplayComments ele={ele} />
                            ))
                        }
                    </div>
                    <Comment data={data} />
                    <Footer />
                </div>
            </section>
        </div>
    )
};

export default ReadArticle;
