import { ChangeEvent, useEffect, useRef, useState } from "react"
import { setUser, UserDetails } from "../redux/userSlice"
import Avatar from "./Avatar"
import Divider from "./Divider"
import uploadFile from "../helpers/uploadFile"
import axios from "axios"
import toast from "react-hot-toast"
import { useAppDispatch } from "../hooks/reduxHook"


interface EditUserDetailsProps {
    onClose: () => void,
    user: UserDetails
}


export default function EditUserDetails({ onClose, user }: EditUserDetailsProps) {

    const [data, setData] = useState({
        userId: user._id,
        name: user.name,
        profile_pic: user.profile_pic,
    })

    const dispatch = useAppDispatch()
    const uploadPhotoRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
            }
        })
    }, [])

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

        // Validar que el archivo sea una imagen (basado en su tipo MIME)
        if (!file.type.startsWith('image/')) {
            toast.error('Seleccione una imagen válida')
            return
        }


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
            if (response.data.success) {
                dispatch(setUser(response.data.data))
                onClose()
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error((error.response?.data?.message))

            } else {
                console.log(error)
                toast.error('Ocurrio un error inesperado')
            }
        }

    }



    return (
        <div className="fixed top-0 left-0 w-full h-full bg-secondary/60 z-50 flex items-center justify-center p-8 sm:p-2">
            <div className="bg-primary p-4 sm:p-5 rounded-3xl w-full max-w-lg border-2 border-white 
                  overflow-auto max-h-screen text-white">
                <h2 className="mb-1 font-semibold text-2xl sm:text-3xl">Detalles de Perfil</h2>
                <p className="mb-3 text-sm">Edita los datos del perfil</p>
                <Divider />

                <form className="bg-primary-lighter/40 rounded-3xl p-3 sm:p-5" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="mb-2 font-medium">Foto de Perfil:</div>
                        <div className="flex flex-col items-center">
                            <div className="bg-secondary/40 p-3 rounded-full">
                                <Avatar
                                    userId={data.userId}
                                    name={data.name}
                                    imageURL={data.profile_pic}
                                    height={150}
                                    width={150}
                                    isOnlineIcon={false}
                                />
                            </div>
                            <label htmlFor="profile_pic">
                                <button
                                    type="button"
                                    className="cursor-pointer font-semibold mt-2"
                                    onClick={handleOpenUploadPhoto}
                                >
                                    Cambiar Foto
                                </button>
                                <input
                                    type="file"
                                    name="profile_pic"
                                    id="profile_pic"
                                    onChange={handleUploadPhoto}
                                    ref={uploadPhotoRef}
                                    hidden
                                />
                            </label>
                        </div>
                    </div>

                    <Divider />

                    <div className="flex flex-col gap-1 mt-4 mb-5">
                        <label htmlFor="name" className="font-medium">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={handleOnChange}
                            className="w-full py-2 px-3 text-slate-200 border rounded-xl focus:outline-primary"
                        />
                    </div>

                    <Divider />

                    <div className="flex justify-end gap-2 mt-5">
                        <button
                            onClick={onClose}
                            className="border-primary-lighter transition-all cursor-pointer font-semibold
                     hover:bg-red-600 hover:text-white rounded-2xl border-2 px-4 py-2"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="border-primary-lighter transition-all cursor-pointer font-semibold
                     hover:bg-emerald-600 hover:text-white rounded-2xl border-2 px-4 py-2"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
