import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('/api').then((res) => {
      console.log(res.data)
    })
  })
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
