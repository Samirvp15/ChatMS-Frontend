import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router";
import Avatar from "./Avatar";
import { useAppSelector } from "../hooks/reduxHook";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";


export default function Sidebar() {

    const user = useAppSelector(state => state.user)
    const [editUserOpen, setEditUserOpen] = useState(true)

    return (
        <div className=" w-full h-full">
            <div className=" bg-emerald-100 w-18 h-full rounded-tr-2xl rounded-br-2xl py-5 flex flex-col justify-between">
                <div className="grid gap-4">
                    <NavLink to={''} className={({ isActive }) => `w-18 h-12  flex justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-emerald-300 hover:text-white ${isActive && 'bg-emerald-400 rounded-4xl'}`} title="Message">
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>

                    <div className="w-18 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-emerald-300 hover:rounded-4xl hover:text-white" title="Add Friend">
                        <FaUserPlus size={25} />
                    </div>
                    <div className="w-18 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-emerald-300 hover:rounded-4xl hover:text-white" title="Add user">
                        <FaUserPlus size={25} />
                    </div>
                    <div className="w-18 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-emerald-300 hover:rounded-4xl hover:text-white" title="Add user">
                        <FaUserPlus size={25} />
                    </div>
                    <div className="w-18 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-emerald-300 hover:rounded-4xl hover:text-white" title="Add user">
                        <FaUserPlus size={25} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button className="w-18 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-emerald-300 hover:rounded-4xl hover:text-white" title="Logout">
                        <BiLogOut size={25} />
                    </button>
                    <button title="User Profile" onClick={()=> setEditUserOpen(true)}>
                        <Avatar
                            width={50}
                            height={50}
                            name={user.name}
                            imageURL={user.profile_pic}
                        />
                    </button>
                </div>

            </div>
            {
                editUserOpen && (
                    <EditUserDetails onClose={()=>setEditUserOpen(false)} user={user} />
                )
            }
        </div>
    )
}
