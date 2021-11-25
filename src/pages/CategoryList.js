import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";
import {Switch, useMediaQuery} from "@mui/material";
import "react-image-picker/dist/index.css";
import CategoryImageList from "../components/CategoryImageList";
import EditCategoryImageList from "../components/EditCategoryImageList";


const CategoryList = () => {
    const user = useStore(state=>state.loggedInUser)
    const categoryList = useStore(state => state.categories);
    console.log(categoryList);
    const fetchCategories = useStore(state => state.getUserCategories);

    const [editMode, setEditMode] = useState(false);

    const fetchImages = useStore(state => state.getImages)
    const imagesList = useStore(state => state.images);
    console.log(imagesList);
    const minWidth450 = useMediaQuery('(min-width:450px)');
    useEffect(() => {
        fetchCategories(user.id);
        fetchImages();

    }, [fetchImages, fetchCategories]);


    console.log(fetchImages);
    console.log(categoryList);

    return (
        <>


           <div style={{
                display: 'flex',
                flexWrap: 'nowrap',

                width: '100%',
                minHeight: '80px',
                alignItems: "space-between"
            }}>
                <div style={{
                    flex: '1 1 auto',
                    width:  '50%' ,
                    textAlign: 'left',
                    fontSize: '1rem',
                    color: 'rgba(0, 0, 0, 0.6',
                    paddingLeft: minWidth450 ?"10%" : '15px'
                }}>Lista Kategorii
                </div>
               <div style={{
                   display: 'flex',
                   flexWrap: 'nowrap',
                   width: '50%',
                   minHeight: '80px',
                   alignItems: "center",
                   paddingRight: minWidth450 ?"10%" : '15px'
               }}>
                <div style={{
                    flex: '1 1 auto',
                    width:  minWidth450 ?'35%' : '40%',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'rgba(0, 0, 0, 0.6'
                }}>Edytuj kategorie
                </div>
                <div style={{
                    flex: '1 1 auto',
                    width: minWidth450 ? '15%' : '10%',
                    textAlign: 'right',
                    fontSize: '1rem',
                    color: 'rgba(0, 0, 0, 0.6'
                }}><Switch color="primary" size="medium" onChange={() => setEditMode(!editMode)}/></div>
               </div>
            </div>
            {editMode ?
                <EditCategoryImageList/>
                : <CategoryImageList/>
            }
        </>
    )
}
export default CategoryList;
