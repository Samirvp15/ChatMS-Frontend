import { useEffect, useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import UserSearchCard from "./UserSearchCard";
import axios from "axios";
import toast from "react-hot-toast";
import { UserState } from "../redux/userSlice";


interface SearchUserProps {
    onClose: () => void
}


export default function SearchUser({ onClose }: SearchUserProps) {

    const [searchUser, setSearchUser] = useState<UserState[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')

    const handleSearchUser = async () => {

        const url = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`

        try {
            setLoading(true)
            const response = await axios.post(url, {
                search: search
            })
            setLoading(false)

            setSearchUser(response.data.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error((error.response?.data?.message))

            } else {
                toast.error('Ocurrio un error inesperado')
            }
        }
    }

    useEffect(() => {
        handleSearchUser()
    }, [search])


    return (
        <div className=" fixed top-0 bottom-0 right-0 left-0 bg-secondary/60 p-8 sm:p-2 z-50">
            <div className=" w-full max-w-lg mx-auto mt-10 ">
                <div className="bg-slate-200 rounded-xl p-1 overflow-hidden flex">
                    <input
                        type="text"
                        placeholder="Busca usuarios por nombre o correo"
                        className=" w-full outline-none py-1 h-full px-2"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />

                    <div className=" w-16 flex justify-center items-center">
                        <IoSearchOutline size={20} />
                    </div>
                </div>

                <div className=" bg-slate-200 mt-2 w-full p-4 rounded-xl">
                    {
                        searchUser.length === 0 && !loading && (
                            <p className=" text-center text-slate-600">Usuario no encontrado.</p>
                        )
                    }

                    {
                        loading && (
                            <Loading />
                        )
                    }

                    {
                        searchUser.length !== 0 && !loading && (
                            searchUser.map((user) => {
                                return (
                                    <UserSearchCard key={user?._id} user={user} onClose={onClose} />
                                )
                            })
                        )
                    }
                </div>
            </div>

            <div className=" absolute top-0 right-0 text-4xl mt-3 mx-3  lg:mx-30  bg-slate-300 rounded-3xl ">
                <button className="  p-2 hover:bg-slate-700 hover:text-white hover:rounded-3xl cursor-pointer" onClick={onClose}>
                    <IoClose size={30} />
                </button>
            </div>
        </div>
    )
}
