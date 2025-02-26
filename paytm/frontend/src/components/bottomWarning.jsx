import { Link } from "react-router-dom"

export function BottomWarning({label, link, to}) {
    return <div className="m-4">
        <span >{label} </span>
        <Link className="visited:text-purple-900 underline text-purple-600" to={to}>{link}</Link>
    </div>
}