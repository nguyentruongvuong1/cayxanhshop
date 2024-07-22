import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Binhluan from "./Binhluan";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themSP } from "./cartSlice";
function ShowdetalPr() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const nagivition = useNavigate()
    const [product, ganproduct] = useState({});
    const [splq, gansplq] = useState([]);
    const [binhluan, laybinhluan] = useState([]);

    useEffect(() => {
        let url = `http://localhost:3000/sp/${id}`;
        fetch(url).then(res => res.json()).then(data => ganproduct(data));

        fetch(`http://localhost:3000/splq/${id}`).then(res => res.json()).then(data => gansplq(data));
        fetch(`http://localhost:3000/show_binh_luan/${id}`).then(res => res.json()).then(data => laybinhluan(data));
    }, [id]);

    return (
        <div>
            <div className="detail-sp" key={product.id}>
                <div className="detail-img">
                    <h1>{product.name}</h1>
                    <img src={product.img} alt="" />
                </div>
                <div className="detail-tt">
                    <p style={{ color: 'black' }}><strong>Giá :</strong> {product.price} VNĐ </p>
                    <p><strong>Mô tả :</strong> {product.description}</p>
                    <p><strong>Lượt xem :</strong> {product.xem} </p>
                    <p><strong>Còn lại :</strong> {product.quantity} sản phẩm</p>
                </div>
                <button className="detail-mn" onClick={() =>{ let hoi = window.confirm(`Bạn có chắc muốn mua ${product.name}.`)
                    if(hoi) {
                        dispatch(themSP(product));
                        nagivition('/cart')
                    }
            } }>Mua Ngay</button>
                <button className="detail-tvg" onClick={() =>{ let hoi = window.confirm(`Bạn đã thêm ${product.name} vào giỏ hàng.`)
                    if(hoi) {
                        dispatch(themSP(product)); return;
                    }else{
                        dispatch(themSP(product))
                    }
            } }>Thêm vào giỏ </button>
            </div>

          

            <div>
                <h1 style={{textAlign:'center', marginTop:'10px'}}> Đánh giá về <strong style={{ color: "green" }}> {product.name} </strong></h1>
                <div className="binh_luan">
                    {
                    binhluan.length === 0 ? (
                        <div style={{paddingTop:'20px'}}>
                                <p style={{fontSize:'20px'}}>Bạn hãy là người bình luận đầu tiên.</p>
                            </div>
                    ) : ( 
                    
                        binhluan.map((bl, index) => {
                            const Ngay = moment(bl.ngay).format('YYYY-MM-DD HH:mm:ss');
                            return (
                                <div key={index}>
                                    <div>
                                        <p><strong>{bl.ten_user}</strong></p>
                                        <p style={{opacity:'70%'}} > {Ngay}</p>
                                        <p >{bl.noi_dung}</p>
                                    </div>
                                </div>
                            );
                        })
                    
                    )
                }
                
                </div>
                <Binhluan />
            </div>

                <div>
                <h1 style={{textAlign:'center', marginBottom:'20px'}}>Sản phẩm liên quan</h1>
                </div>
                <div className="pr">

                {
                    splq.map((sp, index) =>
                        <div className="product" key={index}>
                            <div className="product-con">
                                <Link to={"/sp/" + sp.id}>
                                    <img src={sp.img} alt={sp.name} />
                                </Link>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                                <button className="product-mn"><Link to={"/sp/" + sp.id} className="xct">Xem chi tiết</Link></button>
                            </div>
                            <div className="product-name-price">
                                <p className="product-name">{sp.name.toLocaleUpperCase()}</p>
                                <p>{Number(sp.price).toLocaleString('vi')} VNĐ</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ShowdetalPr;
