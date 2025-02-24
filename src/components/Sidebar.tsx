import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus, FaVideo } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink, useLocation, useNavigate } from "react-router";
import Avatar from "./Avatar";
import { useAppSelector } from "../hooks/reduxHook";
import { Fragment, useEffect, useState } from "react";
import EditUserDetails from "./EditUserDetails";
import { FiArrowUpLeft } from "react-icons/fi";
import SearchUser from "./SearchUser";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { FaImage } from "react-icons/fa6";
import { AllUserType } from '../redux/userSlice'
import moment from "moment";
import Divider from "./Divider";

export default function Sidebar() {


    const user = useAppSelector(state => state.user)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [allUser, setAllUser] = useState<AllUserType[]>([])
    const [openSearchUser, setOpenSearchUser] = useState(false)
    const socketConnection = useAppSelector(state => state.user.socketConnection)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    interface ConversationUserType {
        sender: {
            _id: string,
        },
        receiver: {
            _id: string,
        },

    }

    useEffect(() => {
        if (socketConnection) {
            socketConnection.emit('sidebar', user._id)

            socketConnection.on('conversation', (data) => {


                const conversationUserData = data.map((conversationUser: ConversationUserType) => {
                    if (conversationUser.sender._id === conversationUser.receiver._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                    else if (conversationUser.receiver._id !== user._id) {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.receiver
                        }
                    } else {
                        return {
                            ...conversationUser,
                            userDetails: conversationUser.sender
                        }
                    }
                })

                setAllUser(conversationUserData)
            })
        }
    }, [socketConnection, user])

    const handleLogout = () => {



        if (socketConnection) {
            socketConnection.disconnect()
        }

        localStorage.removeItem('token')
        dispatch(logout())

        navigate("/email")

    }

    const [showModal, setShowModal] = useState(false);
    return (
        <div className=" w-full h-full grid grid-cols-[auto_1fr]">
            <div className=" bg-primary w-20 h-full rounded-tr-2xl rounded-br-2xl py-5 flex flex-col justify-between text-slate-300">
                <div className="grid gap-4">
                    <NavLink to={''} className={({ isActive }) => `w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:rounded-4xl hover:bg-secondary hover:text-white ${isActive && 'bg-secondary rounded-4xl'}`} title="Message">
                        <IoChatbubbleEllipses size={25} />
                    </NavLink>

                    <div onClick={() => setOpenSearchUser(true)} className="w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-secondary hover:rounded-4xl hover:text-white" title="Add Friend">
                        <FaUserPlus size={25} />
                    </div>

                </div>

                <div className="flex flex-col items-center gap-4">
                    <button className="w-16 h-12 mx-auto flex justify-center items-center cursor-pointer hover:bg-secondary hover:rounded-4xl hover:text-white" title="Logout" onClick={() => setShowModal(true)}>
                        <BiLogOut size={25} />
                    </button>

                    {showModal && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-secondary/60 z-50 p-4 ">
                            <div className="bg-white rounded-lg p-4 text-black max-w-sm w-full">
                                <h2 className="text-lg font-bold mb-2">Cerrar sesión</h2>
                                <p className="mb-4">¿Estás seguro de que deseas cerrar sesión?</p>
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 rounded border-primary-lighter border-1 hover:bg-gray-200 cursor-pointer"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setShowModal(false);
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                                    >
                                        Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

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

                    {
                        allUser.map((conv) => {
                            return (
                                <Fragment key={conv._id}>
                                    <NavLink to={"/" + conv.userDetails._id} className={`${location.pathname === "/" + conv.userDetails._id && 'bg-primary-lighter hover:bg-primary-lighter'} flex items-center gap-2 py-3 px-2 border border-transparent  hover:border-primary rounded cursor-pointer  hover:bg-primary `}>
                                        <div>
                                            <Avatar
                                                userId={conv.userDetails._id}
                                                imageURL={conv.userDetails.profile_pic}
                                                name={conv.userDetails.name}
                                                width={50}
                                                height={50}

                                            />
                                        </div>
                                        <div className="ml-3">

                                            <h3 className=' text-ellipsis line-clamp-1 font-semibold text-base text-slate-100'>{conv.userDetails.name} {user._id === conv.userDetails._id && "(Tú)"}</h3>
                                            <div className='text-xs flex items-center gap-1 text-slate-300 '>
                                                <div className='flex items-center gap-1 '>
                                                    {
                                                        conv.lastMsg.imageURL && (
                                                            <div className='flex items-center gap-1'>
                                                                <span><FaImage /></span>
                                                                {!conv.lastMsg.text && <span>Imagen</span>}
                                                            </div>
                                                        )
                                                    }
                                                    {
                                                        conv.lastMsg.videoURL && (
                                                            <div className='flex items-center gap-1'>
                                                                <span><FaVideo /></span>
                                                                {!conv.lastMsg.text && <span>Video</span>}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <p className=' text-sm text-ellipsis line-clamp-1'>{conv.lastMsg.text}</p>
                                            </div>

                                        </div>

                                        {
                                            (conv.unseenMsg)
                                                ? <p className='text-xs w-6 h-6 flex justify-center items-center ml-auto p-1 bg-emerald-600 text-white font-semibold rounded-full'>{conv.unseenMsg}</p>
                                                : <p className="text-xs ml-auto text-slate-300">{moment(conv.lastMsg.createdAt).format('LT').toLocaleLowerCase()}</p>

                                        }

                                    </NavLink>
                                    <div className=" opacity-25 my-1">
                                        <Divider />
                                    </div>
                                </Fragment>
                            )

                        })
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
                    <SearchUser onClose={() => setOpenSearchUser(false)} />
                )
            }
        </div>
    )
}
