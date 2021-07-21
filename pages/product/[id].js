/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import baseUrl from '../../helpers/baseUrl';
import { useRef, useEffect } from "react";

const Productdetail = ({ product }) => {

    const modalRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        M.Modal.init(modalRef.current);
    }, [])

    if(router.isFallback){
        return( <h3>Loading...</h3> )
    }

    const deleteProduct = async () => {
       const response = await fetch(`${baseUrl}/api/product/${product._id}`, { method: "DELETE" })
       const res2 = await response.json();
       router.push('/');
    //    router.reload();
    }

    const getModal = () => {
        return (
            <div id="modal1" className="modal" ref={modalRef} >
            <div className="modal-content">
              <h4>{product.name}</h4>
              <p>Are you sure, you want to delete this item!</p>
            </div>
            <div className="modal-footer">
            <button  className="btn waves-effect waves-light  #2196f3 blue">Cancel</button>
            <button  className="btn waves-effect waves-light  #d32f2f red darken-2" onClick={deleteProduct} >Delete</button>
            </div>
           
          </div>
        )
    }

    return (
        <>
         <div className=" container center-align" style={{marginBottom:"20px"}}  >
              <h2>{ product.name }</h2>
              <img src={product.mediaUrl} alt="img" style={{width:"50%"}} />
              <h5> ₹ {product.price}</h5>
              <input 
              type="number"
              style={{width:"250px", margin:"10px"}}
              min="1"
              placeholder="Quantity" />
              <button className="btn waves-effect waves-light #2196f3 blue">Add to cart
                <i className="material-icons right">add</i>
              </button>
              <p className="" >{product.description}</p>
              <button data-target="modal1" className="btn waves-effect waves-light modal-trigger #d32f2f red darken-2">Delete
                <i className="material-icons right"  >delete</i>
              </button>

              {getModal()}
         </div>   
        </>
    )
}

export default Productdetail;


// #01 Using getServerSideProps - sends a whole new request to the server(not too much of time delay).
// export async function getServerSideProps({ params : { id }}) {

//     const response = await fetch(`http://localhost:3000/api/product/${id}`);
//     const data = await response.json();

//     // const { params } = context;
//     // const { id } = params;
//     console.log(data);

//     return {
//         props:{
//             product : data
//         }
//     }
// }


// #02 Using getStaticProps
export async function getStaticProps({ params : { id }}) {

    const response = await fetch(`${baseUrl}/api/product/${id}`);
    const data = await response.json();

    // const { params } = context;
    // const { id } = params;
    // console.log(data);

    return {
        props:{
            product : data
        }
    }
}

export async function getStaticPaths() {

    const response = await fetch(`${baseUrl}/api/products`);
    const products = await response.json();

    const paths = products.map((product) => (
        {
            params: { id: product._id }
        }
    ))

    return {
        paths:[
            // { params : { id: "60f438cf3e04ffb2de2389f5"}},
            // { params : { id: "60f43a523e04ffb2de2389f7"}},
        ],
        fallback:true
    }
}