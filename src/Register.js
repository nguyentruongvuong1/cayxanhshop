import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormRegister() {
  const navigate = useNavigate()
  const [err, setErr] = useState(null);
  const unRef = React.createRef();
  const emRef = React.createRef();
  const pwRef = React.createRef();
  const repwRef = React.createRef();

  const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
      return password.length >= 6;
  };

  const Dangki = () => {
      const username = unRef.current.value;
      const email = emRef.current.value;
      const password = pwRef.current.value;
      const repw = repwRef.current.value;
      const ngay = new Date();

      if (username === '' || email === '' || password === '' || repw === '') {
          setErr('Vui lòng nhập đầy đủ thông tin');
      } else if (!validateEmail(email)) {
          setErr('Email phải có @gmail.com');
      } else if (!validatePassword(password)) {
          setErr('Mật khẩu phải có ích nhất 6 số');
      } else if (repw !== password) {
          setErr('Mật khẩu không khớp');
      } else {
          let url = `http://localhost:3000/register`;
          let tt = { username, email, password, ngay };
          let opt = {
              method: 'POST', body: JSON.stringify(tt), headers: { 'Content-Type': 'application/json' }
          };

          fetch(url, opt)
              .then(res => res.json())
              .then(data => {
                alert(data.thongbao)
                navigate('/login')
            })
      }
  };

  return (
      <div>
          <form className="form">
              <div>
                  <i className="bi bi-arrow-left"></i>
              </div>
              <h1>Đăng kí</h1>
              <p>Đăng kí tài khoản để có thể sử dụng nhiều dịch vụ hơn</p>
                  <p>{err}</p>
              <div>
                  <label>Tên đăng nhập:</label>
                  <input type="text" ref={unRef} className="input" />
              </div>
              <div>
                  <label>Email:</label>
                  <input type="email" ref={emRef} className="input" />
              </div>
              <div>
                  <label>Mật khẩu:</label>
                  <input type="password" ref={pwRef} className="input" />
              </div>
              <div>
                  <label>Nhập lại mật khẩu:</label>
                  <input type="password" ref={repwRef} className="input" />
              </div>
              <button type="button" onClick={Dangki}>Đăng Kí</button>
              <div className="register_cotk">
                  <p>Bạn đã có tài khoản có tài khoản. Đăng nhập <Link to="/login">tại đây</Link> ?</p>
              </div>
          </form>
      </div>
  );
}





export default FormRegister;