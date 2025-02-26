import { useEffect, useRef, useState } from "react";
import { InputElement } from "./input.jsx";
import { PrimaryButton } from "./button.jsx";
import { SendMoneyModal } from "./sendMoneyModal.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserList() {
    const tokenValue = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentInput, setCurrentInput] = useState(null)
    //user list array state
    const [userList, setUserList] = useState([])

    const inputRef = useRef(currentInput)
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPayee, setCurrentPayee] = useState(userList[0]);
    const [searchValue, setSearchValue] = useState({});
    const [userId, setUserId] = useState({});

    //  useEffect( function () {
    //   try {
    //       const response = axios.get("http://localhost:3000/user/bulk", {
    //         headers:{
    //             "Authorization": tokenValue
    //         }
    //     }).then(response => {
    //     let newData = (response.data.user.map(m => m.firstName + " "+ m.lastName));
    //     setUserList((newData)) 
    //     }).catch(err => {
    //         navigate("/signin")
    //     })
    // }  catch (err) {
    //     console.log(err)
    // }
      
    // },[]);

    
    function fetchData() {

        var filterValue = searchValue.search;
        try {
            const response = axios.get(`http://localhost:3000/user/bulk?filter=${filterValue}`, {
                headers:{
                    "Authorization": tokenValue
                }
            }).then(response => {
                let newData = (response.data.user.map(m => {
                    let key = m.firstName + " "+ m.lastName ;
                    let newValue = {};
                     newValue[key] = m.userId;
                    setUserId(prevValue => {
                        return {...prevValue, ...newValue}
                    })
                    return m.firstName + " "+ m.lastName}));
                setUserList((newData)) 
                
                
            }).catch(err => {
                navigate("/signin")
            })
        }  catch (err) {
            console.log(err)
        }
    }


    return <div className="flex flex-col gap-2 mt-4 text-black justify-center items-center">
        <div className="flex flex-row gap-2 w-[70%] items-center">
            <InputElement setData={setSearchValue} color="gray" prevInput={inputRef} currentClick={setCurrentInput}   type="text" label="Search Users"/>
        <div className="w-[30%]"><PrimaryButton label="Search" onclick={fetchData}/></div></div>
            {userList.length != 0 ? userList.map((user,index) => {
                return <UserItem key={index} name={user} changeName={setCurrentPayee} showModal={setModalVisible}/>
            }):"" }
        {
            modalVisible ? <SendMoneyModal userIdList={userId} setVisible={setModalVisible} payeeName={currentPayee}/> :""
        }
      
    </div>
}

function UserItem({name, changeName, showModal}) {

    return <div className="flex flex-row justify-between w-[70%]">
        <div className="flex items-center gap-2 w-[50%]">
            <span className=" rounded-[100%] w-[50px] h-[50px] bg-gray-900 text-white flex items-center justify-center cursor-pointer">
            {name.split("")[0].toUpperCase()}
            </span> {name}
        </div>
        <div className="w-[30%] flex flex-end items-end">
            <PrimaryButton onclick={function() {
                changeName(name)
                showModal(m => !m)
            }} label={"Send Money"}/>
        </div>
        </div>
}