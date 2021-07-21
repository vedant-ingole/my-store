/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import ProductList from '../components/ProductList';
import baseUrl from '../helpers/baseUrl';


const Loader = () => {
  return(
    <>
       <div className="progress">
      <div className="indeterminate"></div>
  </div>
    </>
  )
}

const Home = ({ products }) => {

  console.log(products); //client side

  return (
    <>
      {/* <h1></h1> */}
      {/* <Loader/> */}
      <div className='all-cards' >
        { !products ? <Loader/> : <ProductList products={products} /> }
      {/* <ProductList products={products} /> */}
      </div>
    </>
  )
}

export default Home;


export async function getStaticProps() {
     const response = await fetch(`${baseUrl}/api/products`);
     const data = await response.json();

     

    //  console.log(data); //server side

     return {
       props:{
         products : data,
       }
     }
}
