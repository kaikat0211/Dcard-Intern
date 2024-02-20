'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { TbMenu2 } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { LiaGreaterThanEqualSolid } from "react-icons/lia";
import { FaPlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscRecord } from "react-icons/vsc";
import { BsUsbSymbol } from "react-icons/bs";
import { PiBagSimpleLight } from "react-icons/pi";
import WhiteMark from "../../public/WhiteMark.svg"
import Image from 'next/image';
type Anchor = 'top' | 'left' | 'bottom' | 'right';
type User = {
    name?: string | null | undefined
    email?: string | null | undefined
    image?: string | null | undefined
} | undefined
type Props = {
    user: User,
}
export default function Nav({ user } : Props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
    console.log(user)
  return (
    <div className='p-4 flex justify-between'>
      <div className='flex gap-4 items-center h-[32px]'>
        {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <button onClick={toggleDrawer(anchor, true)} className='borderButtonStyle'>
            <TbMenu2 className='text-slate-400 text-xl'/>
          </button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
        <div className='w-[32px] h-[32px] cursor-pointer'>
            <Image src={WhiteMark} alt='mark'/>
        </div>
        <div>
            <button className='simpleButtonStyle'>{'username'}</button>
            <span className='font-light text-slate-500'>/</span>
            <button className='simpleButtonStyle'>{'repo'}</button>
        </div>
      </div>
      <div className='flex gap-2.5 h-[32px]'>
        <button className='border p-1 border-githubBorder rounded-md flex items-center gap-1 justify-between w-[350px]'>
            <div className='flex items-center'>
                <IoSearchOutline className='m-[3px] text-md text-slate-400'/>
                <div className='text-sm font-light text-slate-400 ml-1'>Type <span className='text-[12px] border-[0.5px]  rounded-sm border-slate-400 px-1 py-[1px]'>/</span> to search</div>
            </div>
            <div className='border-l m-1 border-githubBorder'>
                <LiaGreaterThanEqualSolid className='ml-2 text-slate-400'/>
            </div>
        </button>
        <div className='my-1.5 border-[0.5px] border-githubBorder'></div>
        <button className='borderButtonStyle hover:bg-repohover flex gap-1 items-center'>
            <FaPlus className='ml-1 text-slate-400 text-sm'/>
            <IoMdArrowDropdown className='mr-1 text-slate-400'/>
        </button>
        <button className='borderButtonStyle hover:bg-repohover center'>
            <VscRecord className='text-slate-400 text-[18px]'/>
        </button>
        <button className='borderButtonStyle hover:bg-repohover center'>
            <BsUsbSymbol className='text-slate-400 text-[18px]'/>
        </button>
        <button className='borderButtonStyle hover:bg-repohover center'>
            <PiBagSimpleLight className='text-slate-400 text-[18px]'/>
        </button>
        <div className='rounded-full'>
            {user?.image ? <Image alt={user?.name ?? "Profile Pic"} src={user?.image} width={32} height={32} className='rounded-full cursor-pointer'/> : <></>}
        </div>
      </div>
    </div>
  );
}