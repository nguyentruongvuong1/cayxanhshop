import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function ShowPrbyCate() {
    let { id_loai } = useParams();
    const [cate, gancate] = useState({});
    const [listsp, ganlistsp] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/cate/name/${id_loai}`)
            .then(res => res.json())
            .then(data => gancate(data));

        fetch(`http://localhost:3000/cate/${id_loai}`)
            .then(res => res.json())
            .then(data => ganlistsp(data));
    }, [id_loai]);

    const tangluotxem = (id) => {
        let url = `http://localhost:3000/tangluotxem/${id}`;
        let opt = { method: 'post', body: JSON.stringify({}), headers: { "Content-Type": 'application/json' } };
        fetch(url, opt)
            .then(res => res.json())
            .then(data => console.log(data));
    };
  

    return (
        <div className="main-product" style={{ backgroundColor: "white" }}>
            <div className="listsp">
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    CÁC SẢN PHẨM : <strong style={{ color: "green" }}>{cate.name ? cate.name.toLocaleUpperCase() : 'No Category'}</strong>
                </h2>
                <PhanTrang listSP={listsp} pageSize={10} tangluotxem={tangluotxem} />
            </div>
        </div>
    );
}

function PhanTrang({ listSP, pageSize, tangluotxem }) {
    const [fromIndex, setfromIndex] = useState(0);
    const toIndex = fromIndex + pageSize;
    const spTrong1Trang = listSP.slice(fromIndex, toIndex);
    const tongSoTrang = Math.ceil(listSP.length / pageSize);

    const chuyenTrang = (event) => {
        const newIndex = (event.selected * pageSize) % listSP.length;
        setfromIndex(newIndex);
    };

    return (
        <div>
            <HienSPTrongMotTrang spTrongTrang={spTrong1Trang} tangluotxem={tangluotxem} />
            <ReactPaginate
                nextLabel=">"
                previousLabel="<"
                pageCount={tongSoTrang}
                pageRangeDisplayed={5}
                onPageChange={chuyenTrang}
                className="thanhphantrang"
            />
        </div>
    );
}

function HienSPTrongMotTrang({ spTrongTrang, tangluotxem }) {
    const [color, gancolor] = useState('white')
    const tim = () =>{
        gancolor(color === 'white' ? 'red' : 'white')
    }

    return (
        <div className="pr">
            {spTrongTrang.map((sp, index) => (
                <div className="product" key={index}>
                    <div className="product-con">
                        <Link to={"/sp/"+ sp.id} onClick={() => tangluotxem(sp.id)}>
                            <img src={sp.img} alt={sp.name}/>
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} onClick={tim} cursor={'pointer'} className="bi bi-heart-fill"
                            viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
                        <button className="product-mn" onClick={() => tangluotxem(sp.id)}>
                            <Link to={"/sp/" +sp.id} className="xct">Xem chi tiết</Link>
                        </button>
                    </div>
                    <div className="product-name-price">
                        <p className="product-name">{sp.name.toLocaleUpperCase()}</p>
                        <p>{Number(sp.price).toLocaleString('vi')} VNĐ</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ShowPrbyCate;
