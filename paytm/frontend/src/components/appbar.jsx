export function AppBar({logo, userName="user", greet}) {
 
    return <div className="items-center flex justify-between m-auto my-4 text-2xl border-b border-b-gray-500/70 p-1 select-none">
        <div className="font-bold cursor-pointer"> 
            {logo}
        </div>
        <div className="flex items-center gap-3">
            <div className="text-orange-300">{greet}</div>
            <div className="rounded-[100%] w-[50px] h-[50px] bg-gray-900 flex items-center justify-center cursor-pointer">
                 {userName.split("")[0].toUpperCase()}
            </div>
        </div>

    </div>
}