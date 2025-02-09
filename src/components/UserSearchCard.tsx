import { Link } from "react-router";
import { UserState } from "../redux/userSlice";
import Avatar from "./Avatar";


interface UserSearchCardProps {
  user: UserState,
  onClose: () => void
}


export default function UserSearchCard({ user, onClose }: UserSearchCardProps) {
  return (
    <Link to={`/${user._id}`} onClick={onClose} className=" flex items-center gap-3 mt-2 p-2 border border-transparent  hover:border hover:border-b-2 hover:rounded-2xl hover:border-b-primary hover:bg-slate-300/40 cursor-pointer">
      <div>
        <Avatar
          width={50}
          height={50}
          name={user.name}
          imageURL={user.profile_pic}
          userId={user._id}
        />
      </div>

      <div>
        <div className=" font-semibold text-ellipsis line-clamp-1">
          {user.name}
        </div>
        <p className=" text-sm text-ellipsis line-clamp-1">{user.email}</p>
      </div>
    </Link>
  )
}
