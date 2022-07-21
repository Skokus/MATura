import React, { useState, useEffect } from 'react';

function Category(props){

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories();
            setCategory(categories);
        }

        getCategories();
    },[]);
    
    const fetchCategories = async () => {
        const res = await fetch('http://localhost:3000/kategorie')
        const data = await res.json()
    
        return data
    }
    
    return(
        <div>
            {categories.length > 0 ?
                <h3>{categories.length}</h3>
                : <h3>lmao</h3>
            }
        </div>
    );
}

export default Category;