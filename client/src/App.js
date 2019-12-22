import React, { useState } from 'react'
import logo from './logo.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [image, setImage] = useState(null)

  const handleSubmit = async e => {
    console.log('submitting')
    e.preventDefault()
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const fd = new FormData()
    fd.append('file', image)

    try {
      const results = await axios.post(
        'http://localhost:5000/upload',
        fd,
        config
      )
      console.log(results)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          onChange={e => setImage(e.target.files[0])}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
