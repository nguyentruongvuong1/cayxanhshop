import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ShowCate() {
    const[listcate, ganlistcate] = useState([]);
    useEffect(() =>{
        let url = 'http://localhost:3000/cate';
        fetch(url).then(res => res.json()).then(data => ganlistcate(data))
        
    }, [])
    return(
        <nav className="nav-dmsp">
    <h3>DANH MỤC SẢN PHẨM</h3>

    <div className="nav-dmsp-main" >
        {
            listcate.map( (cate, index) => 
                <div className="nav-dmsp-main-con" key={index}>
                <Link to={"/cate/" + cate.id}> <img src={cate.img} alt="" /> </Link>
                <p>{cate.name}</p>
                </div>
            )
          }
</div>

   </nav>
  
    )
}

export default ShowCate;