import React, { useState, useEffect } from 'react';
import Category from './Category';

function Categories(props){

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories();
            setCategory(categories);
        }

        getCategories();
    },[]);
    
    const fetchCategories = async () => {
        const res = await fetch('http://localhost:8080/categories/names', getRequestOptions())
        const data = await res.json()
    
        return data
    }
    
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
            {categories.map(() => (
                <Category/>
            ))}
        </div>
    );

}


export default Categories;