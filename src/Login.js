import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { daLogin } from "./AuthSlice";
function FormLogin(){
    const [err, seterr] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const em = React.createRef()
    const pw = React.createRef()

    const Login = () =>{

      const email = em.current.value;
      const password = pw.current.value;

      if(email ==='' | password === ''){
        seterr('Vui lòng nhập đầy đủ thông tin tài khoản')
      }else if(email === ''){
        seterr('Vui lòng nhập email')
      }else if(password === ''){
        seterr('Vui lòng nhập mật khẩu')
      }

      let url = `http://localhost:3000/login`;
      let tt = {email, password};
      let opt = {
        method:'POST', body:JSON.stringify(tt), headers: {'Content-Type':'application/json'}
      }

      fetch(url, opt).then(res => res.json()).then(
        data =>{
          if(data.token){
            dispatch(daLogin(data));
            // console.log(daLogin(data))
            alert('Bạn đã đăng nhập thành công')
            if(data.userInfo.role === 1){
            navigate('/admin')
            }else{
            navigate('/')
            }
          }else{
            seterr('Sai email hoặc mật khẩu')

          }

        }
      )

    }

    return(
        <div>
    <form className="form">
      <div>
        <i className="bi bi-arrow-left"></i>
     </div>
      <h1>Đăng nhập</h1>
      <p>Đăng nhập để có thể sử dụng nhiều dịch vụ hơn</p>
      <p>{err}</p>
      <div>
        <label>Email:</label>
        <input type="email" ref={em} className="input" />
      </div>
      <div>
        <label >Mật khẩu:</label>
        <input type="password" ref={pw} className="input" />
      </div>
      <button type="button" onClick={() => Login()}>Đăng nhập</button>
    
   <div className="register_cotk"> <p>Bạn chưa có tài khoản. Đăng kí <Link to={'/register'}>tại đây</Link> ?</p></div>

    </form>
   
  </div>
    )
}

export default FormLogin;