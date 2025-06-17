import { useState } from 'react'
import Formik from './component/Formik'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Formik />
    </>
  )
}

export default App
