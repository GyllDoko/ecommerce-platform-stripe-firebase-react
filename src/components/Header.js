import React from 'react'
import Image from "next/image"
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon
} from "@heroicons/react/outline"
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router"
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice'
function Header() {
  const { data: session } = useSession()
  const router = useRouter()
  const items = useSelector(selectItems)
  return (
    <header className='sticky top-0 z-50'>
      {/* Top Nav */}
      <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
        {/* Logo */}
        <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
          <Image
            onClick={() => router.push("/")}
            src="https://links.papareact.com/f90"
            width={150}
            height={40}
            objectFit="contain"
            className='cursor-pointer'
          />
        </div>
        {/* search */}
        <div className='hidden sm:flex bg-yellow-400 hover:bg-yellow-500 items-center h-10 flex-grow rounded-md cursor-pointer'>
          <input className='p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4' type="text" />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right section */}
        <div className='text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
          <div className=' link' onClick={!session ? signIn : signOut}>
            <p>
              {session ? `Hello ${session.user.name}` : "Sign In"}
            </p>
            <p className='font-extrabold md:text-sm'>Account & Lists</p>
          </div>
          <di onClick={() => router.push("/orders")} v className=' link'>
            <p>Return</p>
            <p className='font-extrabold md:text-sm'>& Orders</p>
          </di>
          <div onClick={() => router.push("/checkout")} className='relative link flex items-center '>
            <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>{items.length}</span>
            <ShoppingCartIcon className='h-10' />
            <p className='font-extrabold md:text-sm  hidden md:inline mt-2'>Basket</p>
          </div>
        </div>

      </div>

      {/* Bottom nav  */}
      <div className='flex items-center bg-amazon_blue-light text-white text-sm space-x-3 p-2 pl-6'>
        <p className='link flex items-center'>
          <MenuIcon className='h-6 mr-1' />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className='link hidden lg:inline-flex'>Electronics</p>
        <p className='link hidden lg:inline-flex'>Food & Grocery</p>
        <p className='link hidden lg:inline-flex'>Prime</p>
        <p className='link hidden lg:inline-flex'>Buy Again</p>
        <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
        <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
      </div>
    </header>
  )
}

export default Header
