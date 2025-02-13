import { ChangeEvent, useEffect, useRef, useState } from "react"
import { setUser, UserState } from "../redux/userSlice"
import Avatar from "./Avatar"
import Divider from "./Divider"
import uploadFile from "../helpers/uploadFile"
import axios from "axios"
import toast from "react-hot-toast"
import { useAppDispatch } from "../hooks/reduxHook"


interface EditUserDetailsProps {
    onClose: () => void,
    user: UserState
}


export default function EditUserDetails({ onClose, user }: EditUserDetailsProps) {

    const [data, setData] = useState({
        name: user.name,
        profile_pic: user.profile_pic,
    })

    const dispatch = useAppDispatch()
    const uploadPhotoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                ...user
            }
        })
    }, [user])

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleOpenUploadPhoto = () => {

        uploadPhotoRef.current?.click()

    }

    const handleUploadPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (!file) return

        const uploadPhoto = await uploadFile(file)

        setData((prev) => {
            return {
                ...prev,
                profile_pic: uploadPhoto.url
            }
        })
    }



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`

        try {

            const response = await axios.post(url, data, {
                withCredentials: true
            })
            toast.success(response.data.message)
              if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
              }     

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error((error.response?.data?.message))

            } else {
                toast.error('Ocurrio un error inesperado')
            }
        }

    }



    return (
        <div className=" fixed top-0 bottom-0 left-0 right-0 bg-gray-700/40  flex justify-center items-center">
            <div className=" bg-white p-4 m-1 rounded w-full max-w-sm">
                <h2 className=" font-semibold text-3xl">Detalles de Perfil</h2>
                <p className=" text-sm">Edita los datos del perfil</p>

                <form className="grid gap-5 mt-3" onSubmit={handleSubmit} >

                    <div>
                        <div>Foto de Perfil:</div>
                        <div className="w-fit mx-auto mb-2 flex justify-center items-center flex-col">
                            <Avatar
                                name={data.name}
                                imageURL={data.profile_pic}
                                height={150}
                                width={150} />
                            <label htmlFor="profile_pic">
                                <button type="button" className=" cursor-pointer font-semibold" onClick={handleOpenUploadPhoto}>Cambiar Foto</button>


                                <input type="file"
                                    name="profile_pic"
                                    id="profile_pic"
                                    onChange={handleUploadPhoto}
                                    ref={uploadPhotoRef}
                                    hidden
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={handleOnChange}
                            className=" w-full py-1 px-2 focus:outline-primary border rounded-xl"
                        />
                    </div>

                    <Divider />

                    <div className="flex justify-end gap-2 mt-5">
                        <button onClick={onClose} className="border-red-500 cursor-pointer font-semibold hover:bg-red-500 hover:text-white rounded-2xl border px-4 py-2">Cancelar</button>
                        <button onClick={handleSubmit} className="border-primary cursor-pointer font-semibold hover:bg-primary hover:text-white rounded-2xl border px-4 py-2">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
