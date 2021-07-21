/* eslint-disable @next/next/no-sync-scripts */
import Navbar from "./Navbar";
import Head from 'next/head';

// const Loader = () => {
//     return(
//       <>
//          <div className="progress">
//         <div className="indeterminate"></div>
//     </div>
//       </>
//     )
//   }


const Layout = ({ children }) => {

    return (
        <>
            <Head>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
            </Head>
            {/* { !children ? <Loader/> :} */}
            <Navbar />  
             { children }
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
        </>
    )
}

export default Layout;
