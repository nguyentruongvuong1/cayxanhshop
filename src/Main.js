import Showspnew from "./Prnew";
import Showsphot from "./Prhot";
import ShowCate from "./Cate";
import SearchPr from "./SearchPr";
import Showspcate1 from "./PrCt1";
import Showspcate3 from "./PrCt3";
import Showspcate8 from "./PrCt8";
function Main() {
    return(
        <div>
                 <div className="nen">
        <img src="/nen.jpg" alt="" />
        
        <div className="nen-con">
            <h4>Tận hưởng không gian sống xanh</h4>
            <p>Bổ sung thêm cây xanh là một cách đơn giản nhất để tạo ra sự thoải mái cho không gian sống của bạn, giúp mang lại hiệu quả công việc và thư giãn mỗi khi trở về</p>
            <button className="nen-lh" >LIÊN HỆ</button>
            <button className="nen-mn">MUA NGAY</button>      
        </div>
              </div>
              <nav><ShowCate/></nav>
        <SearchPr/>
        <Showspnew/>
        <Showsphot/>
        <Showspcate1/>
        <Showspcate3/>
        <Showspcate8/>
        </div>
    )
}

export default Main;
