import { Link } from "react-router-dom";
import React from "react";
function FormLogin(){
    return(
        <div>
    <form className="form">
      <div>
        <i className="bi bi-arrow-left"></i>
     </div>
      <h1>Đăng nhập</h1>

      <div>
        <label>Email:</label>
        <input type="email" formControlName="email" />
      </div>
      <div>
        <label f >Mật khẩu:</label>
        <input type="password" id="password" formControlName="password" />
      </div>
      <button type="submit">Đăng nhập</button>
    
   <div className="register_cotk"> <p>Bạn chưa có tài khoản. Đăng kí <Link>tại đây</Link> ?</p></div>

    </form>
   
  </div>
    )
}

export default FormLogin;