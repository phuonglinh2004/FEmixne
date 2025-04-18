import React, {useEffect, useState} from "react";
import HinhAnhModel from "../../../models/hinhAnhModel";
import hinhAnhModel from "../../../models/hinhAnhModel";
import {layToanBoAnhCuaMotSach} from "../../../API/hinhAnhAPI";
import {error} from "console";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS cho carousel
interface HinhAnhSanPham{
    maSach:number;
}
const HinhAnhSanPham:React.FC<HinhAnhSanPham>=(props)=>{
    const maSach:number=props.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<hinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            danhSach=>{
                setDanhSachAnh(danhSach);

                setDangTaiDuLieu(false);
            }
        ).catch(

            error=>{
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }

        );
    }, [])
    if(dangTaiDuLieu){
        return (
            <div>
                <h1>dang tai du lieu</h1>
            </div>
        );
    }if(baoLoi){
        return (
            <div>
                <h1>gap loi</h1>
            </div>
        );
    }
    return (
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showIndicators={true} >
                    {
                        danhSachAnh.map((hinhAnh, index)=>(
                            <div key={index}>
                                <img src={hinhAnh.duLieuAnh}  style={{maxWidth:"250px"}} />
                            </div>
                        ))
                    }
                </Carousel>
            </div>
        </div>
    );
}
export default HinhAnhSanPham;