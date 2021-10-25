import {ButtonGroup, Divider, Grid, Typography} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@material-ui/core";
import dateFormat from "dateformat";
import useStore from "../store/useStore";


const ProductListItem = ({product}) => {
    const incrementQuantity = useStore(state => state.incrementProduct);
    const decrementQuantity = useStore(state => state.decrementProduct);
    const deleteProduct= useStore(state => state.deleteProduct);

    return(
        <>

        <Grid container spacing={0} sx={{maxWidth: '95vw', margin: "0 auto"}}>
            <Grid item xs={12}
                  color="#646670"
                  sx={{lineHeight: "0.9em", fontWeight: "bold", fontFamily: 'Sora', fontSize:"1rem", textTransform: "capitalize", padding : "10px 8px"}}>
                     {product.name}
            </Grid>
            <Grid item xs={12}
                  color="#bdc1c7"
                  sx={{lineHeight: "0.9em", fontWeight: "bold", fontFamily: 'Sora', fontSize:".8em", padding : "4px 8px"}}>
                {dateFormat(product.expireDate,'isoDate')}
            </Grid>
            {product.capacity !== 0 ?
            <Grid item xs={4} sm={6}
                  color="#bdc1c7"
                  sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize:".8em", padding : "3px 8px"}}>
                {product.capacity} {product.unit}
            </Grid>
                : <span>&nbsp;</span>}

            <Grid item xs={8} sm={6}
                  sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize:".8em", padding : "3px 8px"}}>

                <ButtonGroup variant="text" aria-label="text button group"  sx={{color: "#01579b)"}}>
                    <Button >
                        <Button  aria-label="remove" onClick={(e) => {
                                    e.preventDefault();
                                    decrementQuantity(product.id, product.quantity);
                                }}>
                            <RemoveIcon  sx={{color: "#42a5f5"}}/>
                        </Button>
                        <span style={{fontSize: "1.2em", textAlign: "center"}}>{product.quantity}</span>
                        <Button aria-label="add" style={{border: '0px'}}  onClick={(e)=>{
                                e.preventDefault();
                                incrementQuantity(product.id, product.quantity);
                            }} >
                            <AddIcon />
                        </Button>
                    </Button>
                    <Button  aria-label="delete" onClick={(e) =>{
                            e.preventDefault();
                            deleteProduct(product.id);
                        }}>
                        <DeleteIcon />
                    </Button>
                </ButtonGroup>

            </Grid>
        </Grid>

    <Divider variant="inset" component="li" sx={{width: '90%', marginTop: "3px"}} />
        </>
    )
}

export default ProductListItem;