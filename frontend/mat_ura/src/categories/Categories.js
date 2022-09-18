import React, { useState, useEffect } from 'react';
import Category from './Category';
import { getCategoryNames } from '../api/CategoryService';
function Categories(props){

    const [categories, setCategory] = useState([]);

    useEffect(() => {
        async function fetchData(){
            var test = await getCategoryNames();
            setCategory(test);
        }
        fetchData();
    },[]);
    
    return(
        <div>
            {categories.map((category) => (
                <Category name={category}/>
            ))}
        </div>
    );

}

export default Categories;