'use client';

import React from 'react';
import { useAuth } from '@/shared/context/AuthContext';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const NavList = [
  { id: 0, label: 'Home', href: '/', },
  { id: 1, label: 'Products', href: '/products', },
  { id: 2, label: 'Categories', href: '/categories', }
]

const UserMenu: React.FC = () => {
  const { user } = useAuth();
  const initials = user?.fullname?.[0] || 'U';

  const handleLogout = async () => {

  };

  return !user ? (<Link to="/login">Login</Link>) : (
    <div className='flex items-center gap-2'>
      <ul className='flex gap-2'>
        {NavList.map(({id, label, href}) => <li key={id}><Link to={href}>{label}</Link></li>)}
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.fullname}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
