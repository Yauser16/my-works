
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";

const Page404 = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>Page doesn't exist</p>
            <p onClick={() => navigate(-1)} style={{'display': 'block','textAlign': 'center','fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px', 'cursor': 'pointer'}} >Back to main page</p>
        </div>
    )
}

export default Page404;