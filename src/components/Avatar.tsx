import { memo, useMemo } from "react";
import { PiUserCircle } from "react-icons/pi";
import { useAppSelector } from "../hooks/reduxHook";


interface AvatarProps {
    userId: string,
    name: string,
    imageURL: string,
    width: number,
    height: number,
}


function Avatar({ userId, name, imageURL, width, height }: AvatarProps) {

    const onlineUser = useAppSelector(state => state.user.onlineUser)

    let avatarName = ""
    if (name) {
        const splitName = name.split(" ")
        if (splitName.length > 1) {
            avatarName = splitName[0][0] + splitName[1][0]
        } else {
            avatarName = splitName[0][0]
        }
    }

    const bgColor = [
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-red-200",
        "bg-indigo-200",
        "bg-pink-200",
        "bg-purple-200",
        "bg-gray-200",
        "bg-teal-200",
        "bg-cyan-200",
        "bg-rose-200",
        "bg-fuchsia-200",
        "bg-emerald-200",
        "bg-gray-200",
        "bg-lime-200",
        "bg-amber-200",
        "bg-orange-200",
        "bg-violet-200",
        "bg-lightBlue-200",
        "bg-warmGray-200",
        "bg-trueGray-200",
        "bg-coolGray-200",
    ]

    // Fijar el color de fondo con base en el nombre
    const ramdomNumber = useMemo(() => {
        return Math.floor(Math.random() * bgColor.length);
    }, []) // Solo se calcula una vez cuando el componente se monta.

    const isOnline = onlineUser?.includes(userId)

    return (
        <div className={`  flex justify-center items-center  rounded-full shadow  text-xl font-bold relative`} style={{ width: width + "px", height: height + "px" }}>
            {
                imageURL ? (
                    <img
                        src={imageURL}
                        width={width}
                        height={height}
                        alt={name}
                        className=" overflow-hidden rounded-full"

                    />
                ) : (
                    name ? (
                        <div style={{ width: width + "px", height: height + "px" }} className={` overflow-hidden rounded-full flex justify-center items-center ${bgColor[ramdomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        <PiUserCircle size={80} />
                    )
                )
            }

            {
                isOnline && (
                    <div className=" bg-slate-200 p-1 absolute bottom-1 -right-2.5  z-10 rounded-full">
                        <div className=" bg-green-500 p-1.5 relative bottom-0 right-0  z-10 rounded-full"></div>

                    </div>
                )
            }

        </div>
    )
}

// Usar React.memo para evitar renderizados innecesarios
export default memo(Avatar);