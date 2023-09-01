
import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TiShoppingCart } from 'react-icons/ti'


const Navbar = () => {


    // const {token} =useSelector((state)=>state.auth);
    // const {user} = useSelector((state)=>state.profile);
    // const {totalItems}=useSelector((state)=>state.cart);



    const location = useLocation();
    const matchRoute =(route)=>{
        return matchPath({path:route},location.pathname)
    }

  return (
    <div className='flex h-14 itens-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
            <Link to="/">
                <img src={logo} alt="StudyNotion" width={160} heigth={42} loadiing='lazy'/>
            </Link>
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((link,index)=>(
                            <li key={index}>
                                {
                                    link.title==="Catalog"?(
                                        <div className=''>
                                            
                                        </div>
                                    ):(
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* login signup */}
            {/* <div className='flex gap-x-4 items-center '>
                    {
                        user &&user?.accountType!=="Instructor"&&(
                            <Link to="/dashboard/cart" className='relative'>
                                <TiShoppingCart className=' fill-richblack-25 w-7 h-7' />

                            </Link>
                        )
                    }
                    {
                        token===null&&(
                            <Link to="/login">
                                <button>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null&&(
                            <Link to="/signup">
                                <button>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    
            </div> */}

        </div>
    </div>
  )
}

export default Navbar