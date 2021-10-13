
import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";

import  {Switch} from "@mui/material";

import "react-image-picker/dist/index.css";
import CategoryImageList from "../components/CategoryImageList";
import EditCategoryImageList from "../components/EditCategoryImageList";






const CategoryList = ()=> {

    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.fetch);

    const deleteCategory  = useStore(state => state.deleteCategory);
    const [editMode, setEditMode] = useState(false);
    const [open, setOpen] = React.useState(false);
    const fetchImages = useStore(state => state.fetchImages)
    const imagesList = useStore(state => state.images);
    console.log(imagesList);

    useEffect(() => {
        fetchCategories();
        fetchImages();

    }, [])


    console.log(fetchImages);


    return (
        <>


          <div style={{display: 'flex', flexWrap: 'nowrap', minWidth: 300, width: '100%'}}>
              <div style={{flex: '0 1 auto', width: '50', textAlign: 'left', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6', paddingLeft: 15, alignSelf: "center"}}>Lista Kategorii</div>
              <div style={{flex: '0 1 auto', width: '50%', textAlign: 'right', fontSize: '1rem', color: 'rgba(0, 0, 0, 0.6',paddingRight: 15}}>Edytuj kategorie <Switch color="secondary" onChange={() => setEditMode(!editMode)}/></div>


          </div>
            {editMode ?
                  <EditCategoryImageList/>
                : <CategoryImageList/>
            }
       </>
    )
}
export default CategoryList;

// addCategory({
//     "url": "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//     "title": "new category",
//     "width": "33,3%",
//     "path": "dupa-dupa",
// })