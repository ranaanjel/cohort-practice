import { useEffect, useRef, useState } from "react";
import { Header } from "../components/heading";
import { InputElement } from "../components/input";
import { SubHeading } from "../components/subHeading";
import { PrimaryButton } from "../components/button";
import {BottomWarning} from "../components/bottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Signin() {

    const navigate = useNavigate();
    const [currentInput, setCurrentInput] = useState(null);
    const prevInputElement = usePrev(currentInput);
    const [visible, setVisible] = useState(false);
    const [clientData, setClientData] = useState({
        email: "",
        password: ""
    }); 

    if(prevInputElement){

        if(prevInputElement.current.value === "" && prevInputElement.current !== currentInput.current){
        prevInputElement.current.nextElementSibling.classList.remove("animate-label", "px-1");
        }
    }

    async function signinClick() {
        try {
        let response = await axios.post("http://localhost:3000/user/signin", {
            username: clientData.email,
            password: clientData.password
            
        });

        if(response.status == 200) {
            localStorage.setItem("token", response.data.token);
            console.log(response)
            navigate("/dashboard");
        }
        
    }
        catch(err) {
            toast.error("wrong user credentials")
        }
       
    }

    return <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center bg-gray-200 w-[30%] p-8 rounded-lg text-black gap-2 shadow-lg">
            <Header label="Sign In" />
            <SubHeading label="Enter your information to your account" />
            <InputElement setData={setClientData} prevInput={prevInputElement} currentClick={setCurrentInput} label="Email" type="email" />
            <InputElement setData={setClientData} changeVisible={setVisible} visible={visible} prevInput={prevInputElement} currentClick={setCurrentInput} label="Password" 
            type={visible?"text":"password"}/>
            <PrimaryButton onclick={signinClick} label="Sign In" />
            <BottomWarning label="Don't have an account?" link="Sign Up" to="/signup" />
            <ToastContainer/>
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
