import React from 'react'
import { cn } from '@/lib/utils'
import { Link, useLocation } from 'react-router-dom'

const NavList = [
  { id: 0, label: 'Home', href: '/', },
  { id: 1, label: 'Products', href: '/products', },
  { id: 2, label: 'Categories', href: '/categories', }
]

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <div className='flex gap-2'>
      {NavList.map(({ id, label, href }) => (
        <Link key={id} to={href} className={cn(
          pathname === href ? 'bg-black/5' : 'bg-black/0',
          'hover:bg-black/5 transition-all',
          'p-1 px-5 rounded-md'
        )}>
          {label}
        </Link>
      ))}
    </div>
  )
}

export default Navbar
