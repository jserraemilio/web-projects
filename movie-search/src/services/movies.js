const API_KEY = '4287ad07'
export async function searchMovies({ search }) {
    if(search === '') return null

    try {
        const response = await fetch(`https://omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        const movies = json.Search

        return movies?.map((movie) => ( // mapeamos los datos de la API, por si algun dia la API cambia el nombre de las propiedades
          {
            id: movie.imdbID, 
            year: movie.Year,
            title: movie.Title,
            poser: movie.Poster
          }
        ))
    } catch (error) {
        throw new Error('Error searching movies')
    }        
}