import { useState } from "react";
import Link from 'next/link';
import baseUrl from '../helpers/baseUrl';
import { useRouter } from "next/router";

const Loader = () => {
    return(
      <>
         <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
      </>
    )
  }


const Signup = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter();

    const userSignup = async (e) => {
        e.preventDefault();
        const res = await fetch(`${baseUrl}/api/signup`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, 
                email,
                password
            })
        })
        const res2 = await res.json();
        if(res2.error){
            M.toast({html: res2.error , classes:"red"})
        } else{
            M.toast({html: res2.message , classes:"green"})
            router.push('/');
        }
    }

    return (
        <>
        <div className="container signup-card center-align">
            <h3>SignUp</h3>  
            <form onSubmit={(e)=> userSignup(e)}>
                <input type="text" placeholder="Name"
                    value={ name } 
                    onChange={(e) => setName(e.target.value)} /> 
                <input type="email" placeholder="Email"
                    value={ email } 
                    onChange={(e) => setEmail(e.target.value)} /> 
                <input type="password" placeholder="Password"
                    value={ password } 
                    onChange={(e) => setPassword(e.target.value)} /> 
            
                <button className="btn waves-effect waves-light center-align" type="submit" style={{marginTop:'40px'}}>SignUp
                        <i className="material-icons right ">forward</i>
                </button>
            </form>
            <Link href="/login" > 
                <a> <h5 className="redirect"  >Alredy have an Account ? </h5> </a>
            </Link>
        </div> 
        </>
    )
}

export default Signup;
