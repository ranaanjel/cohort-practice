import { useEffect, useRef, useState } from "react";
import { Header } from "../components/heading";
import { InputElement } from "../components/input";
import { SubHeading } from "../components/subHeading";
import { PrimaryButton } from "../components/button";
import {BottomWarning} from "../components/bottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";

export default function Signup() {

    const navigate = useNavigate();
    const [currentInput, setCurrentInput] = useState(null);
    const prevInputElement = usePrev(currentInput);
    const [visible, setVisible] = useState(false);
    const [clientData, setClientData] = useState({
         firstName: "",
         lastName: "",
         email: "",
         password: ""
     });

    if(prevInputElement){

        if(prevInputElement.current.value === "" && prevInputElement.current !== currentInput.current){
        prevInputElement.current.nextElementSibling.classList.remove("animate-label", "px-1");
        }
    }

    async function signUpClick() {

    try {

    
      let res =  await axios.post("http://localhost:3000/user/signup", {
        firstName: clientData.firstName,
        lastName: clientData.lastName,
        username: clientData.email,
        password: clientData.password 
      });
         navigate("/signin");
       } catch (err) {
        toast.error(err.response.data);
       }
    }


    return <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center bg-gray-200 w-[30%] p-8 rounded-lg text-black gap-2 shadow-lg">
            <Header label="Sign Up" />
            <SubHeading label="Enter your information to your account" />
            <InputElement setData={setClientData} prevInput={prevInputElement} currentClick={setCurrentInput} label="First Name" type="text" />
            <InputElement setData={setClientData} prevInput={prevInputElement} currentClick={setCurrentInput} label="Last Name" type="text" />
            <InputElement setData={setClientData} prevInput={prevInputElement} currentClick={setCurrentInput} label="Email" type="email" />
            <InputElement setData={setClientData} changeVisible={setVisible} visible={visible} prevInput={prevInputElement} currentClick={setCurrentInput} label="Password" 
            type={visible?"text":"password"}/>
            <PrimaryButton onclick={signUpClick} label="Sign Up" />
            <BottomWarning label="Already have an account?" link="Sign In" to="/signin" />
            <ToastContainer />
        </div>
    </div>
}


//custom hook usePrev

const usePrev = (value) => {
    const ref = useRef(0);
    useEffect(() => {

        if(!(value == ref.current)){
        ref.current = value;
        }
    },[value]);
    return ref.current;
}

