// src/hooks/useFetch.js

// Dependancies
import { useState, useEffect } from "react";

// Custom hook for fetching data from an API
const useFetch = (url) => {

    // Data state
    const [data, setData] = useState(null);
    
    // Loading state
    const [loading, setLoading] = useState(true);
    
    // Error state
    const [error, setError] = useState(null);

    // useEffect on mount or when the url changes
    useEffect(() => {
        
        // Fetch data from the API
        const fetchData = async () => {
            
            // Reset states
            setLoading(true);
            setError(null);
            
            try {
                // Make the fetch request
                const response = await fetch(url);
                
                // Check if the response was successful
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                // Parse the JSON response
                const json = await response.json();
                
                // Update state with the fetched data
                setData(json);

            } catch (err) {
                // If an error occurs, store the error message
                setError(err.message);
                console.error("Fetch error:", err);
            } finally {
                // Set loading
                setLoading(false);
            }
        };

        // Call fetch function
        fetchData();

    // Re-run effect if url changes
    }, [url]);

    // Return the states
    return { data, loading, error };
};

export default useFetch;