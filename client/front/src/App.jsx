import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('http://localhost:5555/cars').then((res) => {
      console.log(res.data)
    })
  })
  return (
    <>
      <div> hello</div>
    </>
  )
}

export default App
