/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import baseUrl from '../helpers/baseUrl';

const Product = () => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const imageUpload = async () => {
      const data = new FormData();
      data.append('file', media)
      data.append('upload_preset', 'my-store')
      data.append('cloud_name', 'mongodb-cloud')
      const res = await fetch('https://api.cloudinary.com/v1_1/mongodb-cloud/image/upload', {
        method:"POST",
        body:data
      });
      const res2 = await res.json();
      return res2.url
      // console.log(res2);
  }


  const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log(name, price, media, description);

      const mediaUrl2 = await imageUpload();

      const res = await fetch(`${baseUrl}/api/products`, {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price,
          mediaUrl: mediaUrl2 ,
          description
        })
      })
      const res2 = await res.json();
      if(res2.error){
        M.toast({html: res2.error , classes:"red"})
      }else{
        M.toast({html: "Product saved" , classes:"green"})
      }
      // router.push('/');
      setDescription(''); setMedia(''); setName(''); setPrice('');
  }

  
    return (
        <>
        <h2 className="center-align" >Add your Product </h2>
          <form className="container" onSubmit={(e) => handleSubmit(e)} >
            <label className="label" >Name
              <input type="text"  placeholder="Product Name" value={name}
              onChange={(e) => setName(e.target.value) } />
            </label>
            <label >Price
              <input type="number"  placeholder="Product Price" value={price}
              onChange={(e) => setPrice(e.target.value) } />
            </label>
            <label >Upload Image
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>File</span>
                        <input  type="file" 
                          accept="image/*" 
                           onChange={(e) => setMedia(e.target.files[0])}/>        
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                      </div>
                  </div>
                  <img className="responsive-img" src={media? URL.createObjectURL(media) : ""} alt="" />
            </label>
            <div>
              <label >Description
              <textarea  className="materialize-textarea" placeholder="write here" value={description}
              onChange={(e) => setDescription(e.target.value) }>  </textarea>
              </label>
            </div>

            <button className="btn waves-effect waves-light #2196f3 blue" type="submit">Submit
              <i className="material-icons right ">send</i>
            </button>
        
          </form> 
        </>
    )
}

export default Product
