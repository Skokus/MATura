import React, { useState, useEffect } from 'react';
import Category from './Category';

function Categories(props){

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const res = await fetch('http://localhost:8080/api/categories/names', getRequestOptions())
            const categories = await res.json()
            setCategory(categories);
        }
        getCategories();
    },[]);
    
    function getRequestOptions() {
        return {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }
    }

    return(
        <div>
            {categories.map((category) => (
                <Category name={category}/>
            ))}
        </div>
    );

}

export default Categories;