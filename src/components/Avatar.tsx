import { memo, useMemo } from "react";
import { PiUserCircle } from "react-icons/pi";


interface AvatarProps {
    userId?: string,
    name: string,
    imageURL: string,
    width: number,
    height: number,
}


 function Avatar({ name, imageURL, width, height }: AvatarProps) {

    let avatarName = ""
    if (name) {
        const splitName = name.split(" ")
        if(splitName.length > 1){
            avatarName = splitName[0][0] + splitName[1][0]
        }else{
            avatarName  = splitName[0][0]
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

  return (
        <div className={` text-slate-800 flex justify-center items-center overflow-hidden rounded-full shadow border text-xl font-bold`}  style={{width: width+"px", height: height+"px"}}>
            {
                imageURL ? (
                    <img
                        src={imageURL}
                        width={width}
                        height={height}
                        alt={name}
                        
                    />
                ) : (
                    name ? (
                        <div style={{width: width+"px", height: height+"px"}} className={` overflow-hidden rounded-full flex justify-center items-center ${bgColor[ramdomNumber]}`}>
                            {avatarName}
                        </div>
                    ) : (
                        <PiUserCircle size={80}/>
                    )
                )
            }
        </div>
    )
}

// Usar React.memo para evitar renderizados innecesarios
export default memo(Avatar);