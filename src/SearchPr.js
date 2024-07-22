import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SearchPr() {
const [searchten, gansearchten] = useState('');
const [sp, gansp] = useState([]);
const [spfilter, ganspfilter] = useState([])
const [isInputFocused, setInputFocused] = useState(false);
const [color, gancolor] = useState('white')
useEffect(()=>{
    if(sp.length === 0){
        fetch('http://localhost:3000/sp').then(res=> res.json()).then(data => gansp(data))
    }
   
}, [sp])
const searchchange = (event) =>{
    gansearchten(event.target.value);
} 
const tim = () =>{
    gancolor(color === 'white' ? 'red' :'white')
}

useEffect(() =>{
    const FilterPr = sp.filter( pr => pr.name.toLowerCase().includes(searchten.toLowerCase())
)
ganspfilter(FilterPr);
}, [searchten, sp])


const tangluotxem = (id) =>{
    let url = `http://localhost:3000/tangluotxem/${id}`;
    let opt = { method:'post' , body: JSON.stringify({}), headers:{"Content-Type":'application/json'} }
    fetch(url, opt).then(res => res.json()).then(data => console.log(data))
}


 return(
    <div>
    <div className="search">
        <input
            type="text"
            value={searchten}
            onChange={searchchange} placeholder="Tìm kiếm..."
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
/>
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon_search" />
        <div>
            {
             searchten && spfilter.length > 0 ? (
                    <div className="pr"> 
                        {
                            spfilter.map((pr, index) =>
                                <div  className="product" key={index}>
                                <div className="product-con">
                                    <Link to={"sp/" + pr.id} onClick={() => tangluotxem(pr.id)}>
                                        <img src={pr.img} alt={pr.name}/> </Link>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={color} onClick={tim} cursor={'pointer'} className="bi bi-heart-fill"
                                        viewBox="0 0 16 16" >
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                    <button className="product-mn" onClick={() => tangluotxem(pr.id)} ><Link to={"sp/" +pr.id} className="xct">Xem chi tiết</Link></button>
                                </div>
                                <div className="product-name-price">
                                    <p className="product-name">{pr.name.toLocaleUpperCase()}</p>
                                    <p>{Number(pr.price).toLocaleString('vi')} VNĐ</p>
                                    <p>Lượt xem : {pr.xem}</p>
                        
                                </div>
                            </div>
                            )
                        }
                    </div>
                ) :(
                  searchten && isInputFocused && <div style={{marginBottom:'10px', fontSize:'20px'}}> Sản phẩm không tồn tại</div>
                )
            }
       
        </div>
    </div>
</div>
 )    
}

export default SearchPr;