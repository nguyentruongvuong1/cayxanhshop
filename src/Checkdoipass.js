import { useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
function Checkdoipass() {
  const { id } = useParams();
  const user = useSelector((state) => state.auth.user);
    // console.log(user.id)
    const ids = parseInt(id)
    // console.log(ids)
  // Chuyển hướng nếu id không khớp với id của người dùng đăng nhập
  if (user.id !== ids) {
    return <Navigate to={'/'} />;
  }
  else{
    return <Navigate to={`/doipass/${user.id}`} />;

  }
}

export default Checkdoipass;
