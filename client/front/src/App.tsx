import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {


  useEffect(() => {
    axios.get('http://localhost:5555/cars').then(
      res => console.log(res)
    )
  }, [])
  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
