import { ChangeEvent, useState } from "react"
import { CounterState } from "../redux/userSlice"


interface EditUserDetailsProps {
    onClose: () => void,
    data: CounterState
}


export default function EditUserDetails({ onClose, data }: EditUserDetailsProps) {

    const [userEditdata, setUserEditData] = useState({
        name: data.name,
        profile_pic: data.profile_pic,
    })

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUserEditData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <div className=" fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center">
            <div className=" bg-white p-4 m-1 rounded w-full max-w-sm">
                <h2 className=" font-semibold">Detalles de Perfil</h2>
                <p className=" text-sm">Edita los datos del perfil</p>

                <form action="">
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={handleOnChange}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
