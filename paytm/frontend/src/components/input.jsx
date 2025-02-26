import { useRef } from "react"
import { PasswordEye } from "./passwordEye";

export function InputElement({label, type, currentClick, prevInput, changeVisible, visible,setData}) {
    var labelElement = useRef(null);
    var inputElement = useRef(null);

    function shiftLabel(){
        currentClick(inputElement);
        labelElement.current.classList.add("animate-label", "px-1"); 
    }

    function changeInput() {
        setData((prev) => {
            if(label === "First Name"){
                prev.firstName = inputElement.current.value;
            }else if(label === "Last Name"){
                prev.lastName = inputElement.current.value;
            }
            else if(label === "Email"){
                prev.email = inputElement.current.value;
            }  else if (label == "Password") {
                prev.password = inputElement.current.value;
            } else if(label === "Amount") {
                prev.amount = inputElement.current.value;
            }else if(label === "Search Users") {
                prev.search = inputElement.current.value;
            }
              return  prev
            })
    }

    return <div className="relative w-[80%]">
        <input onChange={changeInput} ref={inputElement} onFocus={shiftLabel} type={type} className="focus:outline-none border-2 rounded bg-gray-200 p-2  my-2 w-full" />
     <p ref={labelElement} onClick={function() {
       inputElement.current.focus(); 
     }} className="absolute top-4 text-[1.2rem] left-5 text-gray-600 select-none bg-gray-200">{label}</p>
        
    {label === "Password" && <span onClick={() => {
        changeVisible(!visible)
        inputElement.current.focus();
        }} className="absolute right-2 top-2 cursor-pointer" ><PasswordEye visible={visible} /></span>}  
    </div>
}