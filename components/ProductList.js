/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';

const ProductList = ({products}) => {
    return (
        <>
          {
        products.map((product) => {
          return (
            <>
              <div className="root-cards" key={product._id} >
              <div className="card"  >
                <div className="card-image">
                  <img src={product.mediaUrl} />
                  <div className="card-title">{product.name}</div>
                </div>
                  <p className="card-price" >₹ {product.price}</p>
                <div className="card-content">
                  <p>{product.description}</p>
                </div>
                <div className="card-action">
                 <Link  href={"/product/[id]"} as={`/product/${product._id}`}>  View Product  </Link>
                </div>
              </div>
              </div>
              </>
          )
        } )
      }   
        </>
    )
}

export default ProductList
