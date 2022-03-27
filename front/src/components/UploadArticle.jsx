import React, { useState, useRef } from 'react';
import { url } from '../static/conf';

function UploadArticle() {
    const [title, settitle] = useState("");
    const [Content, setContent] = useState("");
    const [photo, setphoto] = useState("");
    const [category, setcategory] = useState("");
    const inputRef = useRef()
    let user = JSON.parse(localStorage.getItem("user"))
    const onSubmitRequest = () => {
        if (!title || !Content || !photo || !category) {
            alert("INPUT MUST NOT BE EMPTY")
        } else {
            try {
                const formData = new FormData();
                formData.append('myfile', photo);
                formData.append("title", title)
                formData.append("publishedBy", user?.email)
                formData.append("content", Content)
                fetch(`${url}/article`, {
                    method: "POST",
                    body: formData
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
        <fieldset className="flex flex-col justify-center  items-center p-6 rounded-md shadow-sm  ">
            <div className=" ">
                <div className="justify-center flex ">
                    <div className="flex items-center  space-x-2">
                        <input type="file"
                            onChange={() => setphoto(inputRef.current.files[0])}
                            ref={inputRef}
                        />
                        <img src="https://source.unsplash.com/30x30/?random" alt="" className="w-14 h-14 rounded-full bg-coolGray-500 bg-coolGray-300" />
                    </div>
                </div>
                <div className="col-span-full sm:col-span-3 ">
                    <label for="title" className="text-sm">Title</label>
                    <input id="title" type="text"
                        onChange={(e) => settitle(e.target.value)}
                        placeholder="title" className="w-full rounded-md focus:ring p-1  focus:ring-opacity-75 focus:ring-violet-600 border-gray-700 border-2 text-coolGray-900" />
                </div>
                <div className="col-span-full">
                    <label for="content" className="text-sm">Content</label>
                    <textarea id="content"
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="type your article content here" className="w-full p-1 rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-600 border-2 border-slate-400 text-coolGray-900"></textarea>
                </div>
                <div className='mt-4 flex '>
                    <label className='mx-4'>Select Category:</label>
                    <select className='w-72' onChange={(e) => setcategory(e.target.value)}>
                        <option value="Technology">Technology</option>
                        <option value="News">News</option>
                        <option value="Story">Story</option>
                    </select>
                </div>
                <div className="justify-center flex mt-5 ">
                    <button
                        type="submit"
                        className="inline-block justify-self-center px-5 py-3 mt-2 text-sm font-medium text-white bg-blue-500 rounded-lg "
                        onClick={onSubmitRequest}
                    >
                        Upload Now
                    </button>
                </div>
            </div>
        </fieldset>
    )
}

export default UploadArticle;
