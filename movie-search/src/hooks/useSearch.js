import { useEffect, useRef, useState } from 'react'

export function useSearch(){
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
    const updateSearch = (newSearch) => {
      // Aqui se pueden hacer pre validaciones (validar antes de hacer el setState)
      if(newSearch.startsWith(' ')) return
      setSearch(newSearch)
    }
  
    useEffect(()=>{ // Validaciones del input
      if(isFirstInput.current){
        isFirstInput.current = search === '' // esto da true si no hay nada en el input, en caso de que el usuario haya introducido algo, sera false, por lo tanto podremos saber si es el primer input que hace o no.
        return
      }
  
      if(search === ''){
        setError('Search cannot be empty')
        return
      }
      if(search.match(/^\d+$/)){
        setError('Numbers not allowed')
        return
      }
  
      setError(null)
    },[search])
  
    return { search, error, updateSearch}
  }