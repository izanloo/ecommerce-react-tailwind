import React from 'react'
import { BASE_URL } from '../configs/variables.config'
import { BiHeart } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const CardCategory = ({ data }) => {
const navigate = useNavigate()
    
    return (
        <>
            <div className="flex flex-wrap gap-5 px-5 justify-center ">
                {data.map((item, i) => (
                    <Link  to={`/details/${item.id}`}  key={i}>
                     <div className='border shadow-md rounded-md mb-3'  >
                        <img alt="Placeholder" className="block w-[282px] h-[256px] rounded-t-md" src={`${BASE_URL}/files/${item.thumbnail}`} />
                        <div className='p-3'>
                            <p>{item.name}</p>
                            <p className='flex items-center justify-between'><span>{item.price} تومان </span><BiHeart /></p>
                        </div>
                     </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
export default CardCategory  