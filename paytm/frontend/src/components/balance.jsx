export function BalanceAmount({value}) {
    return <div>
        Your Balance ₹ <span className={value == 0 ?"text-red-600" : "text-green-600"}>{value}</span>
    </div>
}