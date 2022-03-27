import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/Auth/Input';
import { setToken } from '../redux/actions/UserActions';
import { MdAlternateEmail, MdPerson, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import LoginNote from '../components/Auth/loginNote';
import Deviate from '../components/Auth/Deviate';
import { url } from '../static/conf';

export const Register = () => {
    const dispatch = useDispatch();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const [gender, setGender] = useState("don't tell");
    const [visible, setvisible] = useState(false);

    const onAuthRequest = () => {
        if (!email || !password) {
            alert("fields cannot be empty");
        } else {
            if (validateEmail(email)) {
                if (password.length < 5) {
                    alert("password must be 6 or more characters long")
                } else {
                    let body = { email, password, gender, username }
                    fetch(`${url}/register`, {
                        method: "POST",
                        body: JSON.stringify(body),
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                    }).then(response => response.json())
                        .then(data => {
                            if (data?.token) {
                                try {
                                    localStorage.setItem("token", data?.token);
                                    let obj = {};
                                    obj.username = data?.user?.USERNAME, obj.email = data?.user?.EMAIL;
                                    localStorage.setItem("user", JSON.stringify(obj))
                                    dispatch(setToken(data?.token))
                                } catch (error) {
                                    console.log(error);
                                    alert("error signing in")
                                }
                            } else {
                                alert("error signing in")
                            }
                        });
                }
            } else {
                alert("enter an valid email address")
            }
        }
    }

    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    return (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
            <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
                <LoginNote />
                <div className="max-w-xl mx-auto mt-8 mb-0 space-y-4 ">
                    <Input
                        type="username"
                        placeholder="Enter username"
                        value={username}
                        onvalChange={setusername}
                        Icon={MdPerson}
                    />
                    <Input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onvalChange={setemail}
                        Icon={MdAlternateEmail}
                    />
                    <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onvalChange={setpassword}
                        Icon={visible ? MdVisibility : MdVisibilityOff}
                        visible={visible}
                        setvisible={setvisible}
                    />
                    <div className='mt-4 flex '>
                        <label className='mx-4'>Choose a Gender:</label>
                        <select className='w-72' onChange={(e) => setGender(e.target.value)}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not">Prefer Not to tell</option>
                        </select>
                    </div>
                    <Deviate
                        onAuthRequest={onAuthRequest}
                        route={"/"}
                        note={{
                            routel: "Have an Account?",
                            routen: "Sign In !"
                        }}
                    />
                </div>
            </div>
            <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
                <img
                    className="absolute inset-0 object-cover w-full h-full"
                    src="https://images.unsplash.com/photo-1642167714894-1c22e231c5de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"
                    alt=""
                />
            </div>
        </section>
    )
};
