
import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TiShoppingCart } from 'react-icons/ti'
import ProfileDropDown from '../core/auth/ProfileDropDown'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'


const Navbar = () => {


    const {token} =useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);
    const location = useLocation();


    const {subLinks,setSubLinks}=useState([]);

    const fetchSublinks = async()=>{
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);


            // two time datat
            console.log("pring ting sublink result",result?.data?.data);


            setSubLinks(result.data.data);

            
        }catch(error){
            console.log("could not fetch category list");
        }
    }

    useEffect(()=>{
        fetchSublinks();
    },[])



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
                                        <div className='flex items-center group relative'>
                                            <p>{link.title}</p>
                                            <div className='invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 w-[300px] translate-x-[-50%] translate-y-[50%]'>
                                                <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-richblack-5 ">
                                                    {/* {
                                                        subLinks.length?(
                                                            subLinks.map((subLink,index)=>(
                                                                <Link to={`/catalog/${subLink.name}`} key={index}>

                                                                </Link>
                                                            ))

                                                        ):
                                                        (<div>

                                                        </div>)
                                                    } */}
                                                </div>
                                            </div>
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
            <div className='flex gap-x-4 items-center '>
                    {
                        user &&user?.accountType!=="Instructor"&&(
                            <Link to='/dashboard/cart' className=' relative px-4 '>
                                <div className=' z-50'>
                                    <TiShoppingCart className=' fill-richblack-25 w-7 h-7' />
                                </div>
                                {
                                    totalItems>0 && (
                                        <span className=' shadow-sm shadow-black text-[10px] font-bold bg-yellow-100 text-richblack-900 rounded-full px-1 absolute -top-[2px] right-[8px]'>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            
                            </Link>
                        )
                    }
                    {
                        token===null&&(
                            <Link to="/login" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200'>
                                <button>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token===null&&(
                            <Link to="/signup" className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md hover:scale-95 transition-all duration-200'>
                                <button>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token!==null&&<ProfileDropDown/>
                    }
                    
            </div>

        </div>
    </div>
  )
}

export default Navbar