import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from '../../configs/variables.config'
import { BiErrorCircle } from "react-icons/bi";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import UploadImage from "../../apies/UploadImage";
import { Tooltip } from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetCategory } from '../../apies/GetCategory';


export default function ModalAdd() {
    //toast :for show massage success
    const notify = () => toast("محصول جدید اضافه شد");

    //modal
    const [showModal, setShowModal] = React.useState(false);

    // "useform" for get value inputs and handle error validation:
    const { register, formState: { errors }, handleSubmit } = useForm();

    // get category for show in tag selcet
    let [category, setCategory] = useState([])
    useEffect(() => {
        GetCategory().then((res) => {
            setCategory(res.data)
        })
    }, [category])


    //get value input type file for show image in modal
    const [mydata, setData] = useState('')
    const thumbnail = register("thumbnail", { required: "عکس محصول را وارد کنید" })
    const handleImageUpload = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                setData({
                    ...mydata,
                    imagePreview: reader.result,
                    file: file
                });
            };
            reader.readAsDataURL(file);
        }
    }


    // "handleSubmite" post inputs and images galley and thumnail
    const onSubmit = async (data) => {
// get and upload images gallery
// let files = data.gallery
// let temp = [];
// Object.values(files).map((item) => {
//     const formData = new FormData();
//     formData.append("image", item);
//     const tempRequest = UploadImage(formData)
//     temp.push(tempRequest);
// });
// const arrayResponse = await Promise.all(temp);
// const galleryImages = arrayResponse.map(function (item) {
//     return item["data"]["filename"]
// });
//get and upload image (thumnial)
let thumbnail = data.thumbnail
let imageThumbnail = [];
const formData = new FormData();
formData.append("image", thumbnail[0])
imageThumbnail = UploadImage(formData)
const arrayResponse1 = await Promise.all([imageThumbnail]);
const imgThumnail = arrayResponse1.map(function (item) {
    return item["data"]["filename"]
});
//post all inputs
axios.post(`${BASE_URL}/products`, {
    "name": data.nameProduct,
    "category":data.category,
    "price": data.price,
    "count": data.count,
    "description": data.description,
    // "images": galleryImages,
    "thumbnail": imgThumnail
}).then(() => {
    notify()
})    }

    return (
        <>
            <Tooltip content="افزودن محصول جدید" className='bg-sky-700 p-3 '>
                <button
                    className=" font-bold text-3xl  shadow hover:shadow-lg "
                    type="button"
                    onClick={() => setShowModal(true)}
                >

                    <BiAddToQueue />
                </button>
            </Tooltip>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto ">
                            {/*content modal*/}
                            <div className="border-0 rounded-lg shadow-lg relative  w-full bg-white outline-none focus:outline-none p-5">
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 ">
                                        <div className="px-3">
                                            <p>نام محصول: </p>
                                            <input className="border w-full p-3 block rounded-md" name="nameProduct" {...register("nameProduct", { required: "نام محصول را وارد کنید" })} />
                                            <ErrorMessage errors={errors} name="nameProduct" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                                            <p className="mt-4">قیمت: به تومان </p>
                                            <input type="number" className="border w-full p-3 block rounded-md" name="price" {...register("price", { required: "قیمت محصول را وارد کنید" })} />
                                            <ErrorMessage errors={errors} name="price" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                                            <p className="mt-4">تعداد: </p>
                                            <input type="number" className="border w-full p-3 block rounded-md" name="count" {...register("count", { required: "تعداد محصول را وارد کنید" })} />
                                            <ErrorMessage errors={errors} name="count" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                                            <p className="mt-4">توضیحات</p>
                                            <textarea className="border w-full p-3 block rounded-md" name="description" {...register("description", { required: "توضیحات محصول را وارد کنید" })} />
                                            <ErrorMessage errors={errors} name="description" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                                        </div>
                                        <div className="px-3 flex flex-col items-center ">
                                            <label for="file" className="block w-60 h-60 border border-black border-dashed rounded-md text-center  ">
                                                {mydata != '' ? <img src={mydata.imagePreview} className="h-60 w-60 rounded-md" /> : <p className="flex flex-col justify-evenly h-60">عکس شاخص</p>}
                                            </label>
                                            <input type="file" id="file" className="hidden" name="thumbnail" {...thumbnail} onChange={e => { thumbnail.onChange(e); handleImageUpload(e) }} />
                                            <ErrorMessage errors={errors} name="thumbnail" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                                            {/* <label for="gallery" className="mt-4">گالری عکس:(3عکس) </label>
                                            <input id="gallery" accept="image/jpg,image/jpeg" type="file" name="gallery" className="hidden" multiple {...register("gallery", { required: "عکس محصول را وارد کنید" })} />
                                            <ErrorMessage errors={errors} name="gallery" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                                           */}
                                            {category = ''  || null ? <>دسته بندی وجود ندارد</> : 
                                            <select class="block border p-3 rounded-md w-full" name="category" {...register('category', { required: true })}>
                                            <option selected value="">دسته بندی</option>
                                            {category.map((item,i)=>(
                                                <option key={i} value={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                            }
                                            <div className="flex items-baseline font-bold">
                                                <input type="submit" className=" bg-green-400 w-full py-2 px-3 my-6 rounded-md" value="افزودن محصول" />
                                                <ToastContainer />
                                                <button className="text-red-500 bg-yellow-400 w-full py-2 mr-1 h-fit text-sm rounded-md px-5" type="button" onClick={() => setShowModal(false)}> کنسل!</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}