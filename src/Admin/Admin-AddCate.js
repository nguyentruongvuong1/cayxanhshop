import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";
function AddCate() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadFile = async () => {
        if (!file) return null;
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const res = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            if (res.data && res.data.filename) {
                return res.data.filename;
            } else {
                console.error('Filename not returned from server');
                return null;
            }
        } catch (err) {
            console.error(err);
            return null;
        }
        
    };

 
    const idref = React.createRef();
    const tenRef = React.createRef();
    const addCate = async () => {
        if (
            tenRef.current.value === "" ||
            !file 
        ) {
            alert("Vui lòng nhập đủ thông tin");
            return;
        }
    
        let filename = '';
        if (file) {
            console.log(file);
            filename = await uploadFile();
            console.log(filename);
        
            if (!filename) {
                alert('Lỗi tải lên ảnh');
                return;
            }
        }
    
        const Ngay = new Date().toISOString();
        const url = 'http://localhost:3000/admin/cate';
        const tt = {
            name: tenRef.current.value,
            img: filename,
            ngay : Ngay
        };
        console.log(tt);
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(tt),
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                alert("Thêm danh mục thành công");
                const confirm = window.confirm("Bạn có muốn đến trang quản lý danh mục?");
                if (confirm) {
                    navigate("/admin/cates");
                }
            } else {
                alert("Lỗi thêm danh mục: " + data.message || "Lỗi không xác định");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi thêm danh mục");
        }
    };

    return (
        <div>
            <div className="link_dashboard">
    <p> <strong>Home </strong></p>
    <p>/</p>
    <p style={{color: "#00791c"}}><Link href="#" to={'/admin'}> Dashboard</Link></p>
    <p>/</p>
    <p ><Link href="#" to={'/admin/cates'}> danh mục</Link></p>
</div>
        
        <form className="form">
            <h2>Form thêm danh mục</h2>
            <div >
                <label>Tên danh mục</label>
                <input type="text" ref={tenRef} className="input" />
            </div>
           
            <div >
                <label>Ảnh danh mục</label>
                <input type="file" style={{border:'0,5px solid white'}} className="input" onChange={handleFileChange} />
            </div>
    
                    <input type="hidden" ref={idref} />
            <div className="button-container">
                <button type="button" onClick={addCate}>Thêm danh mục</button>
            </div>
        </form>
        </div>

    );
}

export default AddCate;
