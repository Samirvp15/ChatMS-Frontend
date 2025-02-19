import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"
import { Link, useLocation, useParams } from "react-router"
import { useAppSelector } from "../hooks/reduxHook"
import Avatar from "./Avatar"
import { HiDotsVertical } from 'react-icons/hi'
import { FaAngleLeft } from "react-icons/fa"
import { IoMdSend } from "react-icons/io";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5"
import Loading from './Loading'
import uploadFile from "../helpers/uploadFile"
import moment from 'moment'

export default function MessagePage() {

  const initialDataUser = {
    _id: '',
    name: '',
    email: '',
    profile_pic: '',
    online: false
  }

  interface messageData  {
    text: string,
    imageURL: string,
    videoURL: string,
    createdAt?: string,
    msgByUserId?: string,
  }

  const location = useLocation()
  const params = useParams()
  const user = useAppSelector(state => state.user)
  const socketConnection = useAppSelector(state => state.user.socketConnection)
  const [dataUser, setDataUser] = useState(initialDataUser)



  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [message, setMessage] = useState<messageData>({
    text: "",
    imageURL: "",
    videoURL: "",
    
  })
  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([{
    text: "",
    imageURL: "",
    videoURL: "",
    createdAt: "",
    msgByUserId: "",

  }])
  const currentMessage = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const handleUploadImageVideoOpen = () => {
    setOpenImageVideoUpload(preve => !preve)
  }

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)


    setMessage(preve => {
      return {
        ...preve,
        imageURL: uploadPhoto.url
      }
    })
  }
  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve,
        imageURL: ""
      }
    })
  }

  const handleUploadVideo = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    setLoading(true)
    const uploadPhoto = await uploadFile(file)
    setLoading(false)
    setOpenImageVideoUpload(false)

    setMessage(preve => {
      return {
        ...preve,
        videoURL: uploadPhoto.url
      }
    })
  }
  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve,
        videoURL: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.emit('seen', params.userId)

      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })

      socketConnection.on('message', (data) => {
        console.log('messages data: ', data)
        setAllMessage(data) 
      })


    }
  }, [socketConnection, params?.userId, user])

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setMessage(preve => {
      return {
        ...preve,
        text: value
      }
    })
  }

  const handleSendMessage = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (message.text || message.imageURL || message.videoURL) {
      if (socketConnection) {
        socketConnection.emit('new-message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageURL: message.imageURL,
          videoURL: message.videoURL,
          msgByUserId: user?._id
        })
        setMessage({
          text: "",
          imageURL: "",
          videoURL: "",
          createdAt: "",
          msgByUserId: ""
        })
      }
    }
  }
  const isCurrentUser = useMemo(
    () => location.pathname === "/" + user._id,
    [location.pathname,user._id]
  );
  

  return (
    <div className="flex flex-col h-full max-h-screen" >
      <header className="sticky top-0 h-16 bg-primary z-10 flex justify-between items-center px-8">
        <div className=" flex items-center gap-5 text-white">
          <Link to={'/'} className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar
              width={50}
              height={50}
              name={dataUser.name}
              imageURL={dataUser.profile_pic}
              userId={dataUser._id}
            />
          </div>

          <div>
            <h3 className=" font-semibold text-lg ">{dataUser.name}  {isCurrentUser && "(Tú)"}</h3>
            <p className="  text-sm">{
              dataUser.online ? <span className=" text-emerald-300">En linea</span> : <span className=" text-slate-400">Desconectado</span>
            }</p>
          </div>
        </div>

        <div>
          <button className=" cursor-pointer text-slate-300 hover:text-white">
            <HiDotsVertical size={20} />
          </button>
        </div>
      </header>


      {/***show all message */}
      <section className="flex-1  overflow-y-scroll scrollbar bg-opacity-50 h-[calc(100vh-8rem)]   bg-center bg-cover" style={{
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/chatWallpaper.jpg')"
  }}>

        {/**all message show here */}
        <div className='flex flex-col gap-2 py-4 mx-8' ref={currentMessage}>
          {allMessage &&
            allMessage.map((msg, index) => {
              return (
                <div key={index} className={` p-3 py-1.5 rounded-2xl w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? "ml-auto bg-emerald-800 rounded-tr-none " : "bg-primary rounded-tl-none"}`}>
                  <div className='w-full relative'>
                    {
                      msg?.imageURL && (
                        <img
                          src={msg?.imageURL}
                          className='w-full h-full object-scale-down'
                        />
                      )
                    }
                    {
                      msg?.videoURL && (
                        <video
                          src={msg.videoURL}
                          className='w-full h-full object-scale-down'
                          controls
                        />
                      )
                    }
                  </div>
                  <p className=' text-white'>{msg.text}</p>
                  <p className=' text-slate-300 text-xs ml-auto w-fit'>{moment(msg.createdAt).format('LT').toLocaleLowerCase()}</p>
                </div>
              )
            })
          }
        </div>


        {/**upload Image display */}
        {
          message.imageURL && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <img
                  src={message.imageURL}
                  alt='uploadImage'
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {/**upload video display */}
        {
          message.videoURL && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <video
                  src={message.videoURL}
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
              <Loading />
            </div>
          )
        }
      </section>

      {/**send message */}
      <section className='h-16 bg-primary flex items-center px-5 gap-4 '>
        <div className='relative  '>
          <button onClick={handleUploadImageVideoOpen} className='flex justify-center items-center w-11 h-11 rounded-full cursor-pointer hover:bg-secondary/40 text-slate-400 hover:text-white'>
            <FaPlus size={20} />
          </button>

          {/**video and image */}
          {
            openImageVideoUpload && (
              <div className='bg-primary-lighter rounded absolute bottom-16 w-36 p-2'>
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-primary hover:rounded cursor-pointer'>
                    <div className='text-blue-600'>
                      <FaImage size={18} />
                    </div>
                    <p className=" text-slate-200">Imagen</p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-primary hover:rounded cursor-pointer'>
                    <div className='text-purple-500'>
                      <FaVideo size={18} />
                    </div>
                    <p className=" text-slate-200">Video</p>
                  </label>

                  <input
                    type='file'
                    id='uploadImage'
                    onChange={handleUploadImage}
                    className='hidden'
                  />

                  <input
                    type='file'
                    id='uploadVideo'
                    onChange={handleUploadVideo}
                    className='hidden'
                  />
                </form>
              </div>
            )
          }

        </div>

        {/**input box */}
        <form className='h-full w-full flex gap-2 ' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Escribe un mensaje ...'
            className='w-full lg:mx-12 rounded-2xl outline-none text-slate-200 bg-primary-lighter p-5 my-2'
            value={message.text}
            onChange={handleOnChange}
          />
          <button className='text-slate-400 cursor-pointer hover:text-white'>
            <IoMdSend size={28} />
          </button>
        </form>

      </section>

    </div>
  )
}
