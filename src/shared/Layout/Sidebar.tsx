import React from 'react';
import { BiCheckShield, BiHomeAlt2, BiLogIn } from 'react-icons/bi';
import { SiFivem, SiDiscord } from 'react-icons/si';

interface SideBarIconProps {
  icon: JSX.Element;
  text?: string;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text = 'tooltip 💡' }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

const Sidebar: React.FC = () => (
  <div className="fixed w-20 flex-col py-2 bg-slate-900 mx-5 my-auto rounded-2xl translate-x-2 translate-y-64 z-50 hidden md:flex">
    <SideBarIcon icon={<BiHomeAlt2 color="white" size="20" />} text={'Home 🏠'} />
    <Divider />
    <SideBarIcon icon={<SiFivem color="white" size="20" />} text={'Play now ▶️'} />
    <SideBarIcon icon={<SiDiscord color="white" size="20" />} text={'Join discord 🎤'} />
    <SideBarIcon icon={<BiCheckShield color="white" size="20" />} text={'Get Whitelisted ✅'} />
    <Divider />
    <SideBarIcon icon={<BiLogIn color="white" size="22" />} text={'Login 👤'} />
  </div>
);

export default Sidebar;
