import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function AdminUpdateCate() {
    const [file, setFile] = useState(null);
    const [Ah, setAh] = useState(null);
    const [loai, ganloai] = useState({})
    let {id} = useParams()
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)



    useEffect(()=>{ 
        let opt = {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };
        fetch(`http://localhost:3000/admin/cate/${id}`,opt).then(res => res.json()).then( data => { 
            ganloai(data)
            setAh(data.an_hien)})
    }, [id, token])

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const Anhien = (e) =>{
        setAh(Number(e.target.value));
    }

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


    const UpdateCate = async () => {
        if (
            tenRef.current.value === "" 
         
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
    
        const url = `http://localhost:3000/admin/cate/${id}`;
        const tt = {
            name: tenRef.current.value,
            img: filename === '' ? loai.img.slice(16,loai.img.length) : filename ,
            an_hien: Ah
        };
        console.log(tt);
    
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(tt),
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                alert("Sửa danh mục thành công");
                const confirm = window.confirm("Bạn có muốn đến trang quản lý danh mục?");
                if (confirm) {
                    navigate("/admin/cates");
                }
            } else {
                alert("Lỗi sửa danh mục: " + data.message || "Lỗi không xác định");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi sửa danh mục");
        }
    };

    return (
        <form className="form">
            <h2>Form sửa sản phẩm</h2>
            <div >
                <label>Tên sản phẩm</label>
                <input type="text" defaultValue={loai.name} ref={tenRef} className="input" />
            </div>
          
            <div >
                <label>Ảnh sản phẩm</label>
                <input type="file" style={{border:'0.5px solid white'}}  onChange={handleFileChange} className="input" />
            </div>
          
            <div >
                <label>Ẩn hiện</label>
                Hiện   <input type="radio" value={0}  onChange={Anhien} checked={Ah === 0} /> 
                Ẩn <input type="radio" value={1} onChange={Anhien} checked={Ah === 1} /> 
            </div>
        
                    <input type="hidden" ref={idref} defaultValue={loai.id} />
            <div className="button-container">
                <button type="button" onClick={UpdateCate}>Sửa danh mục</button>
            </div>
        </form>
    );
}

export default AdminUpdateCate;
