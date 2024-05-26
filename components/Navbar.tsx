import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Navbar = () => {
  const  navIcons = [
    { src: '/assets/icons/search.svg', alt:'search'},
    { src: '/assets/icons/black-heart.svg', alt:'favorites'},
    { src: '/assets/icons/user.svg', alt:'user'},
  ]
  return (
    <header className='w-full'>
      <nav className='nav'>
        <Link href="/" className="flex items-center gap-1">
          <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={27}
          height={27}
          />
          <p className='nav-logo'>
            Price<span className="text-primary">Tracker</span>
          </p>
        </Link>
        <div className="flex items-center gap-5">
          {navIcons.map((icon, i)=>(
            <Image 
              key={i}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className='object-contains'
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar