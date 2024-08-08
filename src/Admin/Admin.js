import { Outlet, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { thoat } from "../AuthSlice";
function Admin() {
  const dispatch = useDispatch()

  const Dangxuat = () =>{
    const hoi = window.confirm('Bạn có chắc muốn đăng xuất tài khoản này')
    if(hoi){  
    dispatch(thoat())
    alert('Đăng xuất tài khoản thành công')

    }else
    return window.location.reload()
  }
    return (
        <div>
            <div className="bg-warning">
                <nav className="navbar navbar-expand-lg bg-success fw-bolder" data-bs-theme="dark">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><h3>VƯƠNG <span>TREES</span> Admin</h3></Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/">Trang user</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                                        Quản trị loại
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/admin/addCate">Thêm loại</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/cates">Danh sách loại</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown">
                                        Quản trị sản phẩm
                                    </Link>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/admin/addpr">Thêm sản phẩm</Link></li>
                                        <li><Link className="dropdown-item" to="/admin/products">Danh sách sản phẩm</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={Dangxuat}>Thoát</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <Outlet />
        </div>
    );
}

export default Admin;
