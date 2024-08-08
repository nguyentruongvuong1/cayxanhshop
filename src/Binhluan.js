import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import React from "react"
import { useEffect } from "react"
function Binhluan() {
    const user = useSelector(state => state.auth.user)
    const [name, setname] = useState(null);
    let {id} = useParams(); 
    let tenRef = React.createRef();
    let ndRef = React.createRef();
    let idspRef = React.createRef();

    useEffect(() => {
        if (user && user.username) {
            setname(user.username);
        }
    }, [user]);

    const onchangname = (e) =>{
        setname(e.target.value)
    }

    const Gui = () =>{
        const userName = tenRef.current ? tenRef.current.value : name;

        if(userName === "" || ndRef.current.value === "" || idspRef.current.value === "" ){
            alert("Vui lòng nhập đủ thông tin");
            return;
        }
        let ngaybl = new Date().toISOString();
        let url = "http://localhost:3000/binh_luan";
        let tt = {
            id_user: user && user.id ? user.id : 0,
            ten_user: userName,
            noi_dung: ndRef.current.value,
            id_sp: idspRef.current.value,
            ngay: ngaybl
        }
        console.log(tt)
        let opt = {method: "post", body: JSON.stringify(tt), headers:{"Content-Type":"application/json"}};

        fetch(url, opt).then(res=> res.json()).then(data => { alert(data.thongbao); window.location.reload() })

    }

    return(
       <>
       {
        user && user.username  ? (
        <form className="form_bl">
        <div>
            <div>
                <label> Họ tên</label> <br/>
                {/* <input type="text" ref={tenRef} defaultValue={user.username} readOnly /> */}
                <select defaultValue={name} onChange={onchangname}>
                    <option value={user.username} >{user.username}</option>
                    <option value= 'ẩn danh' >ẩn danh</option>
                </select>
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
    ) :(
        <form className="form_bl">
        <div>
            <div>
                <label> Họ tên</label> <br/>
                <input type="text" ref={tenRef}  />
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
       </>

    )
}

export default Binhluan