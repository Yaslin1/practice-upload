"use client"
import { useState } from "react"
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBhDaInhGTjK07DdXlNzQnTYScxXpxOD6Y",
  authDomain: "my-first-firestore-yc.firebaseapp.com",
  projectId: "my-first-firestore-yc",
  storageBucket: "my-first-firestore-yc.appspot.com",
  messagingSenderId: "945020259931",
  appId: "1:945020259931:web:06a60ce6e4a84bdf92797e"
};

export default function Home() {
  const [file, setFile] = useState()
  const [uploadFile, setUploadedFile] = useState()

  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    //connect to storage:
    const app = initializeApp(firebaseConfig); //connects to project
    const storage = getStorage(app) // connects to storage
    //create a reference to our file in storage using the file name
    const fileName = e.target.files[0].name
    const imageRef = ref(storage, "photos/" + fileName)
    // use Todd's hack to get URL for that file
    const url = `https://firebasestorage.googleapis.com/v0/b/my-first-firestore-yc.appspot.com/o/photos%2F${fileName}?alt=media` //ALWAYS erase tokens
    // upload
    uploadBytes(imageRef, e.target.files[0])
      .then(() => setUploadedFile(url))
      .catch(alert)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='text-3xl font-bold'> Upload Photo</h1>
      <input type="file" accept="image/*" onChange={handleFile} />
      {/* multiple: allows multiple file types
          accept=images/* will only accept all image types */}
      {file &&
        <div className="w-32 h-32">
          <h2 className="text-xl semibold">Image from computer:</h2>
          <img src={URL.createObjectURL(file)} />
          {/* You can preview image before the upload. Only works with images */}
        </div>
      }
      {uploadFile &&
        <div className="w-32 h-32">
          <h2 className="text-xl semibold">Image from Storage:</h2>
          <img src={uploadFile} />
          {/* You can preview image before the upload. Only works with images */}
        </div>
      }
    </main>
  )
}
