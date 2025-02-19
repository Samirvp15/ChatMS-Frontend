import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router";
import Avatar from "./Avatar";
import { useAppSelector } from "../hooks/reduxHook";
import { useState } from "react";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";


export default function Sidebar() {

    const user = useAppSelector(state => state.user)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = ()=>{
        dispatch(logout())
        navigate("/email")
        localStorage.clear()
    }

    return (
        <div className=" w-full h-full grid grid-cols-[auto_1fr]">
            <div className=" bg-primary w-20 h-full rounded-tr-2xl rounded-br-2xl py-5 flex flex-col justify-between text-slate-300">
                <div className="grid gap-4">
                    <NavLink to={''} className={({ isActive }) => `w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-secondary hover:text-white ${isActive && 'bg-secondary rounded-4xl'}`} title="Message">
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>

                    <div onClick={()=>setOpenSearchUser(true)} className="w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-secondary hover:rounded-4xl hover:text-white" title="Add Friend">
                        <FaUserPlus size={25} />
                    </div>
                    
                </div>

                <div className="flex flex-col items-center gap-4">
                    <button className="w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-secondary hover:rounded-4xl hover:text-white" title="Logout" onClick={handleLogout}>
                        <BiLogOut size={25} />
                    </button>
                    <button className=" cursor-pointer z-0 hover:bg-secondary hover:rounded-full p-1" title="User Profile" onClick={() => setEditUserOpen(true)}>
                        <Avatar
                            width={50}
                            height={50}
                            name={user.name}
                            imageURL={user.profile_pic}
                            userId={user._id}
                        />
                    </button>
                </div>
            </div>
           
            <div className=" bg-secondary rounded-tl-2xl rounded-bl-2xl">
                <div className=" h-16 flex items-center">
                    <h2 className=" text-xl font-bold p-4 text-white h-16">Mensajes</h2>
                </div>
                <div className=" bg-slate-400 p-[0.5px]"></div>
                <div className=" h-[calc(100vh-64px)] overflow-x-hidden overflow-y-auto p-5">
                    {
                        allUser.length === 0 && (
                            <div className="mt-16">
                                <div className=" flex justify-center items-center my-5 text-slate-400">
                                    <FiArrowUpLeft size={40} />
                                </div>
                                <p className=" text-md text-center text-slate-400">
                                    {`Empieza a chatear con tus amigos. Comparte tu historia y descubre nuevas perspectivas.`}
                                </p>
                            </div>
                        )
                    }
                </div>
               
            </div>
            

            {
                editUserOpen && (
                    <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
                )
            }

            {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)} />
                )
            }
        </div>
    )
}
