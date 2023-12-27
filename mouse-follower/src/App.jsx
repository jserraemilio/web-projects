import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({x: 0, y: 0})
  const followBtnName = enabled ? 'Disable' : 'Enable'

  const handleClick = () => {
    setEnabled(!enabled)
  }

  useEffect(()=>{
    const handleMove = (event) => {
      const {clientX, clientY} = event
      setPosition({ x: clientX, y: clientY})
    }
    if(enabled){ 
      // Suscribe to the event
      window.addEventListener('pointermove', handleMove)
    }
    // Cleanup the event
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        border: '3px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -30,
        top: -30,
        width: 60,
        height: 60,
        transform: `translate(${position.x}px, ${position.y}px)`
      }} />
        <h1>Mouse Follower</h1>
        <button onClick={handleClick}>{followBtnName} follow</button>
    </main>
  )
}

export default App
