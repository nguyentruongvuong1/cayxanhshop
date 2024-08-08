import { useSelector, useDispatch  } from "react-redux";
import { CheckLogin } from "./AuthSlice";
import { Navigate } from "react-router-dom";
function ProtectAdmin(){
const dispatch = useDispatch();
dispatch(CheckLogin())

let token = useSelector(state => state.auth.token)
let user = useSelector(state => state.auth.user)

if(!token){
    return <Navigate to={'/login'} />;
}
else if(user.role !== 1) return <Navigate to={'/login'} />
    else return (<></>);

    
}

export default ProtectAdmin