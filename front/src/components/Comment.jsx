import React, { useState } from 'react'
import { url } from '../static/conf';

function Comment({ data }) {
    const [commentText, setcommentText] = useState();


    function PostComment() {
        if (!commentText) {
            alert("INPUT MUST NOT BE EMPTY")
        } else {
            try {
                let user = JSON.parse(localStorage.getItem("user"))
                fetch(`${url}/article/${data?.a_ID}/comment`, {
                    method: "POST",
                    body: JSON.stringify({
                        publishedBy: user?.email,
                        comment: commentText
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
    }

    return (
        <div className='justify-center flex'>
            <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-coolGray-900 dark:text-coolGray-100">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                        <span className="text-center">How was The Article?</span>
                    </div>
                    <div className="flex flex-col w-full">
                        <textarea
                            onChange={(e) => setcommentText(e.target.value)}
                            rows="3" placeholder="Message..." className="p-4 rounded-md resize-none dark:text-coolGray-100 dark:bg-coolGray-900"></textarea>
                        <button
                            onClick={PostComment}
                            type="button" className="py-4 my-8 font-semibold rounded-md dark:text-coolGray-900 dark:bg-violet-400">Leave feedback</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comment