import './App.css'
import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/...'
function App () {
  const [fact, setFact] = useState()
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        const firstThreeWords = fact.split(' ', 3) // tmb se puede hacer asi -> fact.split(' ').slice(0, 3).join(' ')
        fetch(`https://cataas.com/cat/says/${firstThreeWords}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
          })
      })
  }, [])
  return (
    <main>
      <h1>Random Cat fact with an image</h1>
      {fact && <p>{fact}</p>}
    </main>
  )
}

export default App
