
import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";

import {Switch} from "@mui/material";

import "react-image-picker/dist/index.css";
import CategoryImageList from "../components/CategoryImageList";
import EditCategoryImageList from "../components/EditCategoryImageList";




const CategoryList = (props)=> {

    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.fetch);

    const [editMode, setEditMode] = useState(false);

    const fetchImages = useStore(state => state.fetchImages)
    const imagesList = useStore(state => state.images);
    console.log(imagesList);

    useEffect(() => {
        fetchCategories();
        fetchImages();

    },[fetchImages,fetchCategories]);


    console.log(fetchImages);


    return (
        <>


            <div style={{display: 'flex', flexWrap: 'nowrap', minWidth: 300, width: '100%', minHeight: '80px', alignItems: "center"}}>
                <div style={{flex: '1 1 auto', width: '40%', textAlign: 'left', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6', paddingLeft: "20px"}}>Lista Kategorii</div>
                <div style={{flex: '1 1 auto', width: '40%', textAlign: 'right', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6'}}>Edytuj kategorie</div>
                <div style={{flex: '1 1 auto', width: '20%', textAlign: 'left', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6'}}><Switch color="primary" size="medium" onChange={() => setEditMode(!editMode)}/></div>

            </div>
            {editMode ?
                  <EditCategoryImageList/>
                : <CategoryImageList/>
            }
       </>
    )
}
export default CategoryList;
