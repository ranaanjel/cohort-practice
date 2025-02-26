
import { useEffect, useState } from "react";
import { AppBar } from "../components/appbar";
import { BalanceAmount } from "../components/balance";
import { UserList } from "../components/usersComponent";
import axios from "axios";

export default function Dashboard() {

    //requesting the api for the current user and its values.
   const [currentBalance, setCurrentBalance] = useState(0) 

   useEffect(function() {

    axios.get("http://localhost:3000/account/balance",{
        headers :{
            "Authorization":localStorage.getItem("token")
        }
    }).then(res =>  {
        setCurrentBalance(res.data.balance) 
    }).catch(err => {
        console.log(err)
    })

   },[])


    return <div className="mx-[100px]">
        <AppBar logo="Paytm App"  greet={"hello"}/>
        <div className="px-[50px] text-xl bg-gray-200 text-black p-5 rounded">
            <BalanceAmount value={currentBalance} />
            <UserList/>
        </div>
    </div>
}