import { PiUserCircle } from "react-icons/pi";
import { useAppSelector } from "../hooks/reduxHook";


interface AvatarProps {
    userId: string,
    name: string,
    imageURL: string,
    width: number,
    height: number,
    isOnlineIcon?: boolean
}


export default function Avatar({ userId, name, imageURL, width, height, isOnlineIcon = true }: AvatarProps) {

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


    const isOnline = onlineUser?.includes(userId)

    return (
        <div className={` text-white  flex justify-center items-center  rounded-full shadow  text-xl font-bold relative`} style={{ width: width + "px", height: height + "px" }}>
            {
                imageURL ? (
                    <img
                        src={imageURL}
                        width={width}
                        height={height}
                        alt={name}
                        className=" w-full h-full rounded-full object-cover object-center overflow-hidden"

                    />
                ) : (
                    name ? (
                        <div style={{ width: width + "px", height: height + "px" }} className={` overflow-hidden rounded-full flex justify-center items-center bg-primary-lighter`}>
                            {avatarName}
                        </div>
                    ) : (
                        <PiUserCircle size={80} />
                    )
                )
            }

            {
                isOnline && isOnlineIcon && (
                    <div className=" bg-slate-200 p-1 absolute bottom-1 -right-2.5  z-10 rounded-full">
                        <div className=" bg-green-500 p-1.5 relative bottom-0 right-0  z-10 rounded-full"></div>

                    </div>
                )
            }

        </div>
    )
}

// Usar React.memo para evitar renderizados innecesarios
//export default memo(Avatar);