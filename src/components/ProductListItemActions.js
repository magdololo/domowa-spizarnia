import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Grid} from "@mui/material";
import useStore from "../store/useStore";
import Typography from "@mui/material/Typography";

const ProductListItemActions = ({product}) => {
    const incrementQuantity = useStore(state => state.incrementProduct);
    const decrementQuantity = useStore(state => state.decrementProduct);
    const deleteProduct = useStore(state => state.deleteProduct);
    const setEditProduct = useStore(state=>state.setEditProduct);
    const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);

    return (
        <>
         <Grid container item xs={10} sm={12}>
             <Grid item xs={2} sx={{color: "#01579b", textAlign: "center", cursor: "pointer"}}>
             <RemoveIcon sx={{color: "#42a5f5"}} onClick={(e) =>{
                e.preventDefault();
                decrementQuantity(product.id, product.quantity);
             }}
             />
        </Grid>
        <Grid item xs={2} sx={{color: "#01579b"}}>
        <Typography style={{fontSize: "1.2em", textAlign: "center"}}>{product.quantity}</Typography>
        </Grid>
        <Grid item xs={2} sx={{color: "#01579b", borderRight: "1px solid rgba(25, 118, 210, 0.5)",textAlign: "center", cursor: "pointer"}}>
        <AddIcon sx={{color: "#42a5f5"}} onClick={(e) => {
            e.preventDefault();
            incrementQuantity(product.id, product.quantity);
        }}
        />
        </Grid>
        <Grid item xs={3} sx={{color: "#01579b", borderRight: "1px solid rgba(25, 118, 210, 0.5)", textAlign: "center", cursor: "pointer"}}>
        <DeleteIcon sx={{color: "#01579b"}} onClick={(e) => {
            e.preventDefault();
            deleteProduct(product.id);
        }}
        />
        </Grid>
        <Grid item xs={3} sx={{color: "#01579b", textAlign: "center", cursor: "pointer"}}>
        <EditIcon sx={{color: "#01579b"}} onClick={(e) => {
            e.preventDefault();
            setEditProduct(product.id, product.name, product.capacity, product.unit, product.quantity, product.expireDate, product.categoryId, product.productId, product.userId);
            setEditProductModalOpen(true);
        }}
        />
        </Grid>
         </Grid>
        </>
    )
};
export default ProductListItemActions;