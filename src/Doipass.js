import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";

function DoiPass() {
    const { id } = useParams();
    const [pass, setPass] = useState(null);
    const [error, seterror] = useState('');
    
    useEffect(() => {
        fetch(`http://localhost:3000/user/${id}`)
            .then(res => res.json())
            .then(data => setPass(data.password) );
    }, [id]);

    const pw = React.createRef();
    const password_new = React.createRef();
    const cf_password_new = React.createRef();

    const Doi = () => {
        const oldPassword = pw.current.value;
        const newPassword = password_new.current.value;
        const confirmPassword = cf_password_new.current.value;

        if (newPassword === '' || confirmPassword === '' || oldPassword ==='') {
            return seterror('Vui lòng nhập đủ thông tin');
        }

        if (!pass) return;
      
        if (newPassword !== confirmPassword) {
            return seterror('Mật khẩu mới không khớp');
        }

        fetch(`http://localhost:3000/doipass/${id}`, {
            method: 'PUT',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({password_old: oldPassword,password_new: newPassword}),
        })
        .then(res => res.json())
        .then(data => {
            if (data.thongbao) {
                seterror(data.thongbao);
            }
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });
    };

    return (
        <form className="form-container">
        <h2 className="form-title">ĐỔI MẬT KHẨU</h2>
        <div className="form-error"><p>{error}</p></div>
        <div className="form-group">
          <label className="form-label">Mật khẩu hiện tại</label>
          <input type="password" ref={pw} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Mật khẩu mới</label>
          <input type="password" ref={password_new} className="form-input" />
        </div>
        <div className="form-group">
          <label className="form-label">Nhập lại mật khẩu mới</label>
          <input type="password" ref={cf_password_new} className="form-input" />
        </div>
        <button type="button" onClick={Doi} className="form-button">Đổi mật khẩu</button>
      </form>
      
    );
}

export default DoiPass;
