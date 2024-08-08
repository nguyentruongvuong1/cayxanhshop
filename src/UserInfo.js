import { useDispatch } from "react-redux";
import { CheckLogin } from "./AuthSlice";
const UserInfo = () => {
    const dispatch = useDispatch();
    dispatch(CheckLogin())
    return(
        <></>
    )

}
export default UserInfo