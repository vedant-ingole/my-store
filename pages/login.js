import React, { useState } from 'react';
import Link from 'next/link';
import login from './api/login';
import { useRouter } from 'next/router';
import baseUrl from '../helpers/baseUrl';
import cookie from 'js-cookie';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const userLogin = async (e) => {
        e.preventDefault();
        const res = await fetch(`${baseUrl}/api/login`, {
            method:"POST",
            header:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const res2 = await res.json();
        if(res2.error){
            M.toast({html: res2.error , classes:"red"})
        }else{
            console.log(res2);
            cookie.set('token', res2.token)
            router.push('/account');
        }
    }

    return (
           <>
              <div className="container signup-card center-align">
                <h3>Login</h3> 
                <form onSubmit={(e) => userLogin(e)}>
                    <input type="email" placeholder="Email"
                        value={ email } 
                        onChange={(e) => setEmail(e.target.value)} /> 
                    <input type="password" placeholder="Password"
                        value={ password } 
                        onChange={(e) => setPassword(e.target.value)} /> 

                    <button className="btn waves-effect waves-light center-align" type="submit" style={{marginTop:'40px'}}>Login
                        <i className="material-icons right ">forward</i>
                    </button>
                </form> 

                <Link href="/signup"  > 
                    <a  > <h5 className="redirect" > Dont have an Account ? </h5> </a>
                </Link>
              </div>
        </>
    )
}

export default Login