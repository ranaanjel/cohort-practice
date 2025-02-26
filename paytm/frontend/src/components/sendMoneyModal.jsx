import { useRef, useState } from "react";
import { PrimaryButton } from "./button";
import { InputElement } from "./input";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SendMoneyModal({userIdList, payeeName, setVisible}) {

    const [currentInput, setCurrentInput] = useState(null);
    const inputRef = useRef(currentInput)
    const navigate = useNavigate();
    const [amountSend, setAmountSend] = useState({});

   async function sendMoneyTransfer() {
        //console.log("sending money to ", payeeName, amountSend)
        const amount = amountSend.amount ;
        const to  = userIdList[payeeName];
        if(amount == "" || amount == undefined) {
            return toast.error("Please enter the correct amount to send");
        }

        console.log("sending money to ", payeeName, to,amount)

       const response =  await axios.post("http://localhost:3000/account/transfer", {
            to: to,
            amount: amount
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(response => {
            toast.success("Money sent successfully")
            setTimeout(function() {
                window.location.reload()
            },1000)
        }).catch(err => {
            toast.error("Error sending money")
        })
        
    }

    return <div  onClick={function(eobj) {
        if(eobj.target.className.includes("outerModal")) {
            setVisible(false)
        }
    }} className="outerModal fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center">
        <div className="bg-gray-200 p-4 rounded-lg flex flex-col gap-4 min-w-1/3 min-h-1/2 justify-center items-center">
            <div className="text-3xl m-4 text-center font-bold">Send Money</div>
            <div className="text-xl flex gap-2 items-center">
                <span className="rounded-[100%] w-[50px] h-[50px] bg-gray-900 text-white flex items-center justify-center cursor-pointer">{payeeName[0]}</span>{payeeName}
            </div>
            <InputElement setData={setAmountSend} prevInput={inputRef} currentClick={setCurrentInput} label="Amount" type="number" />
            <PrimaryButton onclick={sendMoneyTransfer} label="Send Money" />
            <ToastContainer/>
        </div>
    </div>
}