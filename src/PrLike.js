import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function Showsplike() {
    const [listsp, ganlistsp] = useState([]);
    useEffect(() =>{
     let url = "http://localhost:3000/showPrLike";
     fetch(url).then(res => res.json()).then(data => ganlistsp(data))   
    }, []);

    const Prlike = (id) =>{
       
        let url = `http://localhost:3000/likepr/${id}`;
        let opt = {method:'post', body: JSON.stringify({}), headers:{'Content':'application/json'}}
        let hoi = window.confirm("Bạn có chắc muốn hủy thích sản phẩm này.")
        if(hoi){
            fetch(url,opt).then(res =>res.json()).then(data => console.log(data),
            ganlistsp(sp => sp.map(p => p.id === id ? {...p, like: p.like === 1 ? 0 : 1} : p), alert("Bạn đã hủy thích sản phẩm thành công"), window.location.reload( )  
        ))
        }else return;
        
    }


    const tangluotxem = (id) =>{
        let url = `http://localhost:3000/tangluotxem/${id}`;
        let opt = { method:'post' , body: JSON.stringify({}), headers:{"Content-Type":'application/json'} }
        fetch(url, opt).then(res => res.json()).then(data => console.log(data))
    }

  
    return(
        
    <div  id="listnewpr" className="main-product">
    <h3 style={{marginBottom:"20px"}}>SẢN PHẨM YÊU THÍCH CỦA BẠN</h3>
    <div className="pr"  >

    {
    listsp.length === 0 ? (
        <div><h3>Bạn chưa có sản phẩm nào</h3></div>
    ) : (
            listsp.map((p, index) => 
                <div  className="product" key={index}>
                    <div className="product-con">
                        <p className="product_moi">Mới</p>
                        <Link to={"sp/"+ p.id} onClick={() => tangluotxem(p.id)}>
                            <img src={p.img} alt={p.name}/> </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={p.like === 1 ? 'red': 'white'} onClick={() => Prlike(p.id)} cursor={'pointer'} className="bi bi-heart-fill"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                        </svg>
                        <button className="product-mn" onClick={() => tangluotxem(p.id)} ><Link to={"sp/" +p.id} className="xct">Xem chi tiết</Link></button>
                    </div>
                    <div className="product-name-price">
                        <p className="product-name">{p.name.toLocaleUpperCase()}</p>
                        <p>{Number(p.price).toLocaleString('vi')} VNĐ</p>
            
                    </div>
                </div>
                )
        
    )


     
    }
        </div>
</div>
    )
    
}

export default Showsplike;