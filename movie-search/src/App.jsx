import { useCallback, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App() {
  const [titleSort, setTitleSort] = useState(false)
  const { search, error, updateSearch} = useSearch()
  const {movies, getMovies, loading} = useMovies({search, titleSort})
  
  // Hay que hacer un useCallback, ya que sino, cada vez que se renderiza el componente, se vuelve a crear un debounce
  const debouncedGetMovies = useCallback(debounce((search) => {
    getMovies(search) // Para hacer el debounce, he tenido que hacer que getMovies se cree una sola vez con useCallback, sino, no funciona el debounce
  }, 500) ,[])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }
  const handleChange = (event) => {
    const newQuery = event.target.value
    updateSearch(newQuery)
    debouncedGetMovies(newQuery)
  }
  const handleTitleSortChange = () => {
    setTitleSort(!titleSort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input value={search} onChange={handleChange} placeholder='Star Wars, Avengers, The Matrix...'></input>
          <button type='submit'>Search</button>
          <input onChange={handleTitleSortChange} value={titleSort} type='checkbox'></input>
        </form>
        { error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Loading results...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
