import axios from "axios";
import React,{useState} from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from '../../configs/variables.config'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import UploadImage from '../../apies/UploadImage'

export default function ModalEdit(props) {
  const item = props.item
  const [showModal, setShowModal] = React.useState(false);
      // "useform" for get value inputs and handle error validation:
      const { register, formState: { errors }, handleSubmit } = useForm();

  
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
  
  const body = {
    name: "heloo",
  };
  
  
  
  const token = localStorage.getItem('token')
  const configs = {
    "headers": {
      "Authorization": `Token ${token}`,
    },
  };

  const handleEdit = async () => {

    // axios
    //   .patch(`http://localhost:3002/products?id=${item.id}`, body)
    //   .then(res => console.log(res))
    //   .then(err => console.log(err));

  }

  const onSubmit = async (data) => {
    console.log(data)
    let files = data.gallery
    let temp = [];
    Object.values(files).map((item) => {
      const formData = new FormData();
      formData.append("image", item);
      const tempRequest = UploadImage(formData)
      temp.push(tempRequest);
    });
    const arrayResponse = await Promise.all(temp);
    const galleryImages = arrayResponse.map(function (item) {
      return item["data"]["filename"]
    });

    // get and upload image (thumnial)
    let thumbnail = data.thumbnail
    let imageThumbnail = [];
    const formData = new FormData();
    formData.append("image", thumbnail[0])
    imageThumbnail = UploadImage(formData)
    const arrayResponse1 = await Promise.all([imageThumbnail]);
    const imgThumnail = arrayResponse1.map(function (item) {
      return item["data"]["filename"]
    });

    // put all inputs
    axios.put(`${BASE_URL}/products/${item.id}`, {
        "name": data.nameProduct,
        "category": "1",
        "price": data.price,
        "count": data.count,
        "description": data.description,
        "images": galleryImages,
        "thumbnail": imgThumnail
    })
    //  const response = await axios.put(`http://localhost:3002/products/${item.id}`, data)
  }

  return (
    <>
      <button
        className=" font-bold text-3xl  shadow hover:shadow-lg "
        type="button"
        onClick={() => setShowModal(true)}
      >
        <BiEditAlt />
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative  w-full bg-white outline-none focus:outline-none p-5">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* img thumbnail */}
                  {/* <div>
                    <label for="file-input">
                      <img src={`${BASE_URL}/files/${item.thumbnail}`} className="w-[300px]" />
                    </label>
                    <input id="file-input" type="file" className="hidden" name="thumnail" {...register("thumnail", { required: "عکس محصول  را وارد کنید" })} />
                  </div> */}
                  {/* images gallery */}
                  {/* <label for="gallery" className="flex my-2 gap-2 justify-center">
                    {(item.images).map((items, i) => (
                      <img src={`${BASE_URL}/files/${items}`} className=" w-28 h-26" name="images" />
                    ))}
                    <input id="gallery" type="file" className="hidden" name="gallery" multiple {...register("gallery", { required: "عکس محصول  را وارد کنید" })} />
                  </label> */}
                  <label htmlFor="file" className="block w-60 h-60 border border-black border-dashed rounded-md text-center  ">
                    {mydata != '' ? <img src={mydata.imagePreview} className="h-60 w-60 rounded-md" /> : <img src={`${BASE_URL}/files/${item.thumbnail}`}/>}
                  </label>
                  <input type="file" id="file" className="hidden" name="thumbnail" {...thumbnail} onChange={e => { thumbnail.onChange(e); handleImageUpload(e) }} />


                  <label for="gallery" className="mt-4">گالری عکس:(3عکس)
                    {(item.images).map((items, i) => (
                      <img src={`${BASE_URL}/files/${items}`} className=" w-28 h-26" name="images" />
                    ))}</label>
                  <input id="gallery" accept="image/jpg,image/jpeg" type="file" name="gallery" className="hidden" multiple {...register("gallery", { required: "عکس محصول را وارد کنید" })} />

                  <div className="relative my-5">
                    <label className="absolute -top-3.5 right-3 bg-white text-gray-700">نام محصول</label>
                    <input defaultValue={item.name} className="border block  w-full p-3 rounded-lg  text-gray-500" name="nameProduct" {...register("nameProduct", { required: "نام محصول  را وارد کنید" })} />
                  </div>
                  <div className="relative my-5">
                    <label className="absolute -top-3.5 right-3 bg-white text-gray-700">توضیحات</label>
                    <textarea defaultValue={item.description} className="border block  w-full p-3 rounded-lg h-36 text-gray-500" name="description" {...register("description", { required: "توضیحات  محصول  را وارد کنید" })} />
                  </div>
                  <div className="relative my-5">
                    <label className="absolute -top-3.5 right-3 bg-white text-gray-700">قیمت به تومان</label>
                    <input defaultValue={item.price} className="border block  w-full p-3 rounded-lg  text-gray-500" name="price" {...register("price", { required: "قیمت محصول  را وارد کنید" })} />
                  </div>
                  <div className="relative my-5">
                    <label className="absolute -top-3.5 right-3 bg-white text-gray-700">تعداد</label>
                    <input defaultValue={item.count} className="border block  w-full p-3 rounded-lg  text-gray-500" name="count" {...register("count", { required: "تعداد محصول  را وارد کنید" })} />
                  </div>
                  <input type="submit" className="w-full bg-yellow-400 font-bold py-2 px-4 my-6 rounded-lg" value="ورود" />
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}