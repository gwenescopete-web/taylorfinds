import React from 'react'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import SignIn from './SignIn'
import MobileMenu from './MobileMenu'
import { auth, currentUser } from '@clerk/nextjs/server'
import { ClerkLoaded, SignedIn, UserButton } from '@clerk/nextjs'
import SearchBar from './SearchBar'
import OrdersIcon from './OrdersIcon'

const Header = async() => {
  const user = await currentUser()
  const {userId} = await auth()
  
  return (
    <header className="bg-white/90 py-5 sticky top-0 z-50 backdrop-blur-md">
        <Container className="flex items-center justify-between text-lightColor">
            <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
              <MobileMenu />
              <Logo />
            </div>
            <HeaderMenu />
            <div className="w-auto md:w-1/3 flex items-center justify-end gap-5">
              <SearchBar />
              <CartIcon />
              <FavoriteButton />
              <ClerkLoaded>
                <SignedIn>
                  <OrdersIcon userId={userId} />
                </SignedIn>
                <UserButton />
                {!user && <SignIn />}
              </ClerkLoaded>
            </div>
        </Container>
    </header>
  )
}

export default Header