import React, { useState, useEffect } from 'react';
import { url } from '../static/conf';

const Contact = () => {
    let user = JSON.parse(localStorage.getItem("user"))
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState(user?.email);
    const [Message, setMessage] = useState("");


    useEffect(() => {
        setEmail(user?.email)
        return () => {

        };
    }, []);


    const onSendMessageRequest = () => {
        if (!FullName || !Message) {
            alert("input fields cannnot be empty")
        } else {
            let body = { FullName, EMAIL: Email, message: Message }
            console.log(body);
            fetch(`${url}/contact`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data?.contact) {
                        alert("message sent successfully")
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="grid max-w-screen-xl  h-screen grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 bg-coolGray-100 text-coolGray-800">
            <div className="flex flex-col ">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leading-tight lg:text-5xl">Let's talk!</h2>
                    <div className="text-coolGray-600">Want to contact us?</div>
                </div>
                <img src="https://mambaui.com/assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64" />
            </div>
            <div className="space-y-6 ng-untouched ng-pristine ng-valid">
                <div>
                    <label for="name" className="text-sm">Full name</label>
                    <input
                        onChange={(e) => { setFullName(e.target.value) }}
                        id="name" type="text" placeholder="" className="w-full p-3 rounded bg-coolGray-100" />
                </div>
                <div>
                    <label for="message" className="text-sm">Message</label>
                    <textarea
                        onChange={(e) => setMessage(e.target.value)}
                        id="message" rows="3" className="w-full p-3 rounded bg-coolGray-100"></textarea>
                </div>
                <button
                    onClick={onSendMessageRequest}
                    className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded bg-violet-600 text-coolGray-50">Send Message</button>
            </div>
        </div>
    )
};

export default Contact;
