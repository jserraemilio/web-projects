import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters(){
    const minPriceId = useId()
    const categoryId = useId()
    const {filters, setFilters} = useFilters()

    const handleRangeChange = (event) => {
        const newMinPrice = event.target.value
        setFilters(prevState => ({
            ...prevState,
            minPrice: newMinPrice
        }))
    }
    const handleCategoryChange = (event) => {
        const newCategory = event.target.value
        setFilters(prevState => ({
            ...prevState,
            category: newCategory
        }))
    }
    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceId}>Min price</label>
                <input onChange={handleRangeChange} value={filters.minPrice} id={minPriceId} type="range" min={0} max={1000}/>
                <span>{filters.minPrice}€</span>
            </div>
            <div>
                <label htmlFor={categoryId}>Category</label>
                <select onChange={handleCategoryChange} value={filters.category} id={categoryId}>
                    <option value={'all'}>All</option>
                    <option value={'laptops'}>Laptops</option>
                    <option value={'smartphones'}>Smartphones</option>
                </select>
            </div>
        </section>
    )
}