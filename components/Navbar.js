import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const Navbar = () => {

    const router = useRouter();

    function isActive(route) {
        if( route === router.pathname){
            return "active"
        } else ""

    }

    return (
        <>
            <nav>
                <div className="nav-wrapper #1976d2 blue darken-2 ">
                <Link href="/" >
                    <a className="brand-logo left">Logo</a>
                </Link>
                <ul id="nav-mobile" className="right">
                    <li className={isActive('/create')} >
                        <Link href="/create" ><a >Create</a></Link>
                    </li>
                    <li className={isActive('/account')} >
                        <Link href="/account" ><a >Account</a></Link>
                    </li>
                    <li className={isActive('/login')} >
                        <Link href="/login" ><a >Login</a></Link>
                    </li>
                    <li className={isActive('/signup')} >
                        <Link href="/signup" ><a >SignUp</a></Link>
                    </li>
                </ul>
                </div>
            </nav>  
        </>
    )
}

export default Navbar;
