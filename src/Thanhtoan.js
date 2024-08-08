import React from "react";
import { XoaSP } from "./cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { XoaGH } from "./cartSlice";
function Thanhtoan() {
    let navigate = useNavigate()
    const dispatch = useDispatch()
    let htRef = React.createRef();
    let emRef = React.createRef();
    let sdtRef = React.createRef();
    let dcRef = React.createRef();
    const cart = useSelector(state => state.cart.listSP)
    const thanhtoan = () =>{
        let ht = htRef.current.value ;
        let em = emRef.current.value ;
        let sdt = sdtRef.current.value ;
        let dc = dcRef.current.value ;

        if( ht === '' || em === '' || sdt === '' || dc === '')
        {
            alert("Vui lòng nhập đủ thông tin");
            return;
        };  
        if(cart.length === 0) {alert("Bạn chưa có sản phẩm trong giỏ hàng"); return;}
        const tdm = new Date();
        let url =`http://localhost:3000/luudonhang`;
        let tt = {
          thoi_diem_mua: tdm, ho_ten : ht, email: em, sdt: sdt, dia_chi: dc 
        }
        let opt = {method:'post', body: JSON.stringify(tt), headers: {"Content-Type":"application/json"}}

        fetch(url, opt).then(res => res.json()).then(data => {
            if(data.id_dh < 0) console.log("Loi", data)
                else{
            let id_dh = data.id_dh;
              console.log("Đã lưu xong giỏ hàng")
              alert("Bạn đã thanh toán thành công")
              navigate('/')
              luuchitietdonhang(id_dh, cart);
            }
            
        })
    }
    const luuchitietdonhang = (id_dh, cart) =>{
        let url = `http://localhost:3000/luugiohang`;
        cart.forEach(sp =>{
            let t = {id_dh: id_dh, id_sp: sp.id, so_luong: sp.so_luong};
            let opt = {method: 'post', body: JSON.stringify(t), headers: {'Content-Type':'application/json'}}
            fetch(url, opt).then(res => res.json()).then(data => luuxongsp(data))
        })
        console.log("Sẽ gửi lên serve id_dh=", id_dh)
        console.log("Sẽ gửi lên serve cart=", cart)
    }

    const luuxongsp = (data) =>{console.log(data)
        dispatch(XoaSP(data.id_sp))
        dispatch(XoaGH())

    }
    return(
        <form id="frmthanhtoan" >
        <h2>Thanh toán đơn hàng</h2> 
        <div><label>Họ tên</label> <input type="text" ref={htRef}/> 
        </div>     
        <div> <label>Email</label> <input type="email" ref={emRef}/>
        </div>
        <div> <label>Số điện thoại</label> <input type="number" ref={sdtRef}/>
        </div>
        <div> <label>Địa chỉ</label> <input type="text" ref={dcRef}/>
        </div>
        <div> <button onClick={() => {thanhtoan()} } type="button">Lưu đơn hàng</button> </div>
      </form>
  
    )
}

export default Thanhtoan;