import { useParams } from "react-router-dom"
import React from "react"
function Binhluan() {
    let {id} = useParams(); 
    let tenRef = React.createRef();
    let ndRef = React.createRef();
    let idspRef = React.createRef();

    const Gui = () =>{
        if(tenRef.current.value === "" || ndRef.current.value === "" || idspRef.current.value === "" ){
            alert("Vui lòng nhập đủ thông tin");
            return;
        }

        let ngaybl = new Date().toISOString();
        let url = "http://localhost:3000/binh_luan";
        let tt = {
            ten_user: tenRef.current.value,
            noi_dung: tenRef.current.value,
            id_sp: idspRef.current.value,
            ngay: ngaybl
        }
        let opt = {method: "post", body: JSON.stringify(tt), headers:{"Content-Type":"application/json"}};

        fetch(url, opt).then(res=> res.json()).then(data => { alert(data.thongbao); window.location.reload() })

    }

    return(
        <form className="form_bl">
            <div>
                <div>
                    <label> Họ tên</label> <br/>
                    <input type="text" ref={tenRef} />
                </div>

                <div>
                    <label> Nội dung</label><br/>
                    <textarea type="text" ref={ndRef} />
                </div>

                <div>
                    <input type="hidden" defaultValue={id} ref={idspRef} />
                    <button type="button" onClick={Gui}>Gửi đánh giá</button>
                </div>
            </div>
        </form>
    )
}

export default Binhluan