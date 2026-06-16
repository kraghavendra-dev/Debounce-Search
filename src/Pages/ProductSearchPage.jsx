import React, { useState, useEffect } from 'react'
import './ProductSearchPage.css'
import axios from 'axios'

const ProductSearchPage = () => {
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (query) => {
        const input = query ? query : "cocktail";
        try {
            setLoading(true);
            const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`);
            setData(response.data.drinks || []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(inputValue.trim() !== ""){
                fetchData(inputValue)
            }
        }, 500);
        return () => clearTimeout(timer)
    }, [inputValue]);

    
  return (
    <>
    <div className='search-page'>
        <div className='heading'>
            <h1>Search + Debounce</h1>
        </div>
       <div className='search-container'>
        <input
          className='search-input'
          type="text"
          placeholder='Search Product'
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
        
        />
       </div>
       <div className="status-container">
           {loading && <p className="status-text">Loading...</p>}
           {loading && <p>Here, function call delays until the user stops typing in the search box before making
            the API call, so we don't send a request on every keystroke.</p>}
           {error && <p className="status-text">{error}</p>}
        </div>
        <div className="products-container">
        {
            !loading && !error && data.length > 0 ? (
               
                data.map((drink)=>{
                    const {idDrink, strDrink, strDrinkThumb} = drink;
                    return (
                      <div key={idDrink} className="product-card">
                          <img src={strDrinkThumb} alt={strDrink} className="product-image" />
                          <h3  className="product-title">{strDrink}</h3>
                      </div>
                    )
                })
               
            ) : (
               !loading && !error && <p className="status-text">No Data found</p>
            )
        }
        </div>
       
    </div>
    
    </>
  )
}

export default ProductSearchPage