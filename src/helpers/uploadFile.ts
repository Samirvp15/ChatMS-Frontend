import dotenv from 'dotenv'
dotenv.config()

const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`


 const uploadFile = async (file: File) => {
    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', 'ChatMS')

    const response = await fetch(url, {
        body: data
    })
    const responseData = await response.json()
    return responseData
}

export default uploadFile