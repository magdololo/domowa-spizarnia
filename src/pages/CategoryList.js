import * as React from "react";
import {useEffect, useState} from "react";
import useStore from "../store/useStore";
import {Switch, useMediaQuery} from "@mui/material";
import "react-image-picker/dist/index.css";
import CategoryImageList from "../components/CategoryImageList";
import EditCategoryImageList from "../components/EditCategoryImageList";


const CategoryList = () => {
    const categoryList = useStore(state => state.categories);
    const productDictionary = useStore(state=>state.productDictionary)
    const [editMode, setEditMode] = useState(false);
    const minWidth450 = useMediaQuery('(min-width:450px)');
    console.log(categoryList);

    return (
        <>
            <div style={{maxWidth: '1300px', margin: '0 auto'}} >
                <div style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    width: '100%',
                    minHeight: '80px',
                    alignItems: "center"

                }}>
               <div id="categoryPageLabel"
                   style={{
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
                    color: 'rgba(0, 0, 0, 0.6',
                    whiteSpace: "nowrap"
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
                : <CategoryImageList categoryList={categoryList} productDictionary={productDictionary}/>
                }
            </div>
        </>
    )
}
export default CategoryList;
