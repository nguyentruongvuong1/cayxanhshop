// import 'froala-editor/css/froala_style.min.css';
// import 'froala-editor/css/froala_editor.pkgd.min.css';
// import FroalaEditorComponent from 'react-froala-wysiwyg';
// import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/languages/vi.js';
// import 'font-awesome/css/font-awesome.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';



function AddPr() {
    const [file, setFile] = useState(null);
    const [loai, setLoai] = useState([]);
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token)

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    

    // let configFroala = {
    //     heightMin: 250,
    //     placeholderText: 'Nhập mô tả sản phẩm',
    //     charCounterCount: true, 
    //     toolbarButtons: [
    //         ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'], 
    //         ['fontFamily', 'fontSize', 'textColor', 'backgroundColor'], 
    //         ['inlineClass', 'inlineStyle', 'clearFormatting'],
    //         ['insertImage']
    //     ]
    // };
    
 

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
                "Content-Type": 'application/json',
                'Authorization': 'Bearer ' + token
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

    const addProduct = async () => {
        if (
            tenRef.current.value === "" ||
            giaRef.current.value === '' ||
            slRef.current.value === '' ||
            loaiRef.current.value === '' ||
            !file ||
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
    
        const Ngay = new Date().toISOString();
        const url = 'http://localhost:3000/admin/sp';
        const tt = {
            name: tenRef.current.value,
            price: giaRef.current.value,
            img: filename,
            quantity: slRef.current.value,
            cate_id: loaiRef.current.value,
            description: MtRef.current.value,
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
                alert("Thêm sản phẩm thành công");
                const confirm = window.confirm("Bạn có muốn đến trang quản lý sản phẩm?");
                if (confirm) {
                    navigate("/admin/products");
                }
            } else {
                alert("Lỗi thêm sản phẩm: " + data.message || "Lỗi không xác định");
            }
        } catch (err) {
            console.error(err);
            alert("Lỗi thêm sản phẩm");
        }
    };

    return (
        <div>
        <div className="link_dashboard">
    <p> <strong>Home </strong></p>
    <p>/</p>
    <p style={{color: "#00791c"}}><Link href="#" to={'/admin'}> Dashboard</Link></p>
    <p>/</p>
    <p ><Link href="#" to={'/admin/products'}> sản phẩm</Link></p>
</div>
        <form className="form" >
            <h2>Form thêm sản phẩm</h2>
            <div >
                <label>Tên sản phẩm</label>
                <input type="text" ref={tenRef} className="input" />
            </div>
            <div >
                <label>Giá</label>
                <input type="number" ref={giaRef} className="input" />
            </div>
            <div >
                <label>Ảnh sản phẩm</label>
                <input type="file" style={{border:'0.5px solid white'}} onChange={handleFileChange} className="input" />
            </div>
            <div >
                <label>Số lượng</label>
                <input type="number" ref={slRef} className="input" />
            </div>
            <div  >
                <label>Loại</label>
                <select ref={loaiRef} style={{width:'400px', height:'40px',marginBottom:'10px'}}>
                    <option value={0}>Chọn loại</option>
                    {loai.map((l, index) =>
                        <option value={l.id} key={index}>{l.name}</option>
                    )}
                </select>
            </div>
          
            <div  >
                <label>Mô tả sản phẩm</label>
                <textarea ref={MtRef} style={{width:'400px', height:'100px'}} />
            </div>
            {/* <div className='fr-toolbar' >
         <FroalaEditorComponent tag='textarea' config={configFroala}/>
        </div> */}

         
                    <input type="hidden" ref={idref} />
            <div className="button-container">
                <button type="button" onClick={addProduct}>Thêm sản phẩm</button>
            </div>
        </form>
        </div>

    );
}

export default AddPr;
