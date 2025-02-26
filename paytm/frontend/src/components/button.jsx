export function PrimaryButton({label, onclick}){
    return <button onClick={onclick} className="bg-blue-900 hover:bg-blue-300 hover:text-blue-950 text-xl text-white font-medium py-2 px-4 m-auto rounded w-[80%]">
        {label}
    </button>
}