import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function AdminUpdatePr() {
    const [file, setFile] = useState(null);
    const [Ah, setAh] = useState(null);
    const [loai, setLoai] = useState([]);
    const [sp, gansp] = useState({})
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
        fetch(`http://localhost:3000/admin/sp/${id}`, opt).then(res => res.json()).then( data => { 
            gansp(data)
            setAh(data.an_hien)})
    }, [id,token])

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

    useEffect(() => {
        let opt = {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json' ,'Authorization': 'Bearer ' + token
            }
        };
        fetch("http://localhost:3000/admin/cate", opt)
            .then(res => res.json())
            .then(data => setLoai(data));
    }, [token]);

  
    const idref = React.createRef();
    const tenRef = React.createRef();
    const giaRef = React.createRef();
    const slRef = React.createRef();
    const loaiRef = React.createRef();
    const MtRef = React.createRef();

    const UpdateProduct = async () => {
        if (
            tenRef.current.value === "" ||
            giaRef.current.value === '' ||
            slRef.current.value === '' ||
            loaiRef.current.value === '' ||
            MtRef.current.value === '' 
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
    
        const url = `http://localhost:3000/admin/sp/${id}`;
        const tt = {
            name: tenRef.current.value,
            price: giaRef.current.value,
            img: filename === '' ? sp.img.slice(16,sp.img.length) : filename ,
            quantity: slRef.current.value,
            cate_id: loaiRef.current.value,
            description: MtRef.current.value,
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
                alert("Cập nhật sản phẩm thành công");
                const confirm = window.confirm("Bạn có muốn đến trang quản lý sản phẩm?");
                if (confirm) {
                    navigate("/admin/products");
                }
            } else {
                alert("Lỗi sửa sản phẩm: " + data.message || "Lỗi không xác định");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi sửa sản phẩm");
        }
    };

    return (
        <form className="form">
            <h2>Form sửa sản phẩm</h2>
            <div >
                <label>Tên sản phẩm</label>
                <input type="text" defaultValue={sp.name} ref={tenRef} className="input" />
            </div>
            <div >
                <label>Giá</label>
                <input type="number" defaultValue={sp.price} ref={giaRef} className="input" />
            </div>
            <div >
                <label>Ảnh sản phẩm</label>
                <input type="file" style={{border:'0.5px solid white'}} onChange={handleFileChange} className="input" />
            </div>
            <div >
                <label>Số lượng</label>
                <input type="number" defaultValue={sp.quantity} ref={slRef} className="input" />
            </div>
            <div >
                <label>Loại</label>
                <select style={{width:'400px', height:'40px', marginBottom:'10px'}} ref={loaiRef}>
                    {loai.map((l, index) =>
                        <option value={l.id} key={index}>{l.name}</option>
                    )}
                </select>
            </div>
          
            <div >
                <label>Mô tả sản phẩm</label>
                <textarea ref={MtRef} style={{width:'400px', height:'100px'}} defaultValue={sp.description} />
            </div>

            <div className="visibility-toggle">
    <label className="AnHien">Ẩn hiện</label>
    <span>Hiện</span>
    <input type="radio" value={0}  onChange={Anhien} checked={Ah === 0} className="Hien" />
    <span>Ẩn</span>
    <input type="radio" value={1} onChange={Anhien} checked={Ah === 1} className="An" />
</div>
                    <input type="hidden" ref={idref} defaultValue={sp.id} />
            <div className="button-container">
                <button type="button" onClick={UpdateProduct}>Sửa sản phẩm</button>
            </div>
        </form>
    );
}

export default AdminUpdatePr;
