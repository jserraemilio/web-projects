import {useRef, useState, useMemo, useCallback} from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({search, titleSort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const previousSearch = useRef(search)
    
    const getMovies = useCallback( // Para hacer el debounce, he tenido que hacer que getMovies se cree una sola vez con useCallback, sino, no funciona el debounce
      async (search) => {
        if(previousSearch.current === search) return
        try {
          setLoading(true)
          previousSearch.current = search
          const newMovies = await searchMovies({search})
          setMovies(newMovies) 
        } catch (error) {
          throw new Error('Error getting movies')
        } finally {
          setLoading(false)
        }
      }
      , [])
    // recordar de hacer una copia del state movies! los estados deben ser imutables!
    const sorttedMovies = useMemo(()=> {
      console.log('recalculando')
      return titleSort && movies?.length > 0 ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) : movies
    }, [titleSort, movies])
    return { movies: sorttedMovies, getMovies, loading}
  }