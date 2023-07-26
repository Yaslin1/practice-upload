"use client"
import { useState } from "react"

export default function Home() {
  const [file, setFile] = useState()
  const handleFile = (e) => {
    console.log(e.target.files[0])
    setFile(e.target.files[0])
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
          {/* You can preview image before the upload */}
        </div>

      }
    </main>
  )
}
