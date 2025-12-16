// src/hooks/useSearch.js

// Dependancies
import { useState, useMemo } from "react"

// Handles search, filter, and sort logic for any array and returns filtered results and controls
const useSearch = (items, searchableFields = []) => {
    
    // Set state searchterm, sort, and stock
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("")
    const [stockFilter, setStockFilter] = useState("all")

    //Filtered and sorted results
    const filteredItems = useMemo(() => {
        
        // Return empty array if items are null, undefined, or not loaded yet
        if (!items) return []

        // Create copy of array
        let result = [...items]

        // Apply search filter
        if (searchTerm) {
            result = result.filter(item =>
                searchableFields.some(field =>
                    item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }

        // Stock filter
        if (stockFilter === 'inStock') {
            result = result.filter(item => item.inStock)
        } else if (stockFilter === 'outOfStock') {
            result = result.filter(item => !item.inStock)
        }

        // Apply sorting
        if (sortBy) {
            result.sort((itemA, itemB) => {
                // Get the values to compare from both items
                const valueA = itemA[sortBy]
                const valueB = itemB[sortBy]

                // Sort strings alphabetically (case-insensitive)
                if (typeof valueA === 'string') {
                    return valueA.localeCompare(valueB)
                }
                
                // Sort numbers in ascending order (smallest to largest)
                if (typeof valueA === 'number') {
                    return valueA - valueB
                }
                
                // Sort booleans (true first, then false)
                if (typeof valueA === 'boolean') {
                    return valueB - valueA
                }
                
                // Default: no change in order
                return 0
            })
        }

        return result
    // Dependencies    
    }, [items, searchTerm, sortBy, stockFilter, searchableFields])

    return {
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        stockFilter,
        setStockFilter,
        filteredItems,
        resultCount: filteredItems.length,
        totalCount: items?.length || 0
    }
}

export default useSearch