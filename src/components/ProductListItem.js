import * as React from "react";
import {useState} from "react";
import {ButtonGroup, Divider, Grid, useMediaQuery} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button} from "@mui/material";
import dateFormat from "dateformat";
import useStore from "../store/useStore";


const ProductListItem = ({product}) => {
    const incrementQuantity = useStore(state => state.incrementProduct);
    const decrementQuantity = useStore(state => state.decrementProduct);
    const deleteProduct = useStore(state => state.deleteProduct);
    const minWidth900 = useMediaQuery('(min-width:900px)');
    let   [todayDate] = useState(new Date());
    const expireDate = product.expireDate;
   // console.log(`dzis ${todayDate.toISOString()} data waznosci ${expireDate}`);
    const setEditProduct = useStore(state=>state.setEditProduct);
    const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);

    return (
        <>
            <Grid container spacing={0} sx={{ margin: "0 auto", width: minWidth900 ? '800px' : '90%'}}>

                <Grid item xs={12}
                      style={(expireDate > todayDate.toISOString()) ? {color: "#646670"} : {color: "red"}}
                      sx={{
                          lineHeight: "0.9em",
                          fontWeight: "bold",
                          fontFamily: 'Sora',
                          fontSize: "1rem",
                          textTransform: "capitalize",
                          padding: "10px 8px",
                      }}>
                      {product.name}
                </Grid>
                <Grid item xs={12}
                      style={(expireDate > todayDate.toISOString()) ? {color: "#bdc1c7"} : {color: "red", fontWeight: "normal"}}
                      sx={{
                          lineHeight: "0.9em",
                          fontWeight: "bold",
                          fontFamily: 'Sora',
                          fontSize: ".8em",
                          padding: "4px 8px"
                      }}>
                      {dateFormat(product.expireDate, 'isoDate')}
                </Grid>

                   {product.capacity !== 0 ?
                    <Grid item xs={12} sm={4}
                          color="#bdc1c7"
                          sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 8px"}}>
                        {product.capacity} {product.unit}
                    </Grid>
                    :
                    <Grid item xs={12} sm={4}
                          color="#bdc1c7"
                          sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 8px"}}>
                        <span>&nbsp;</span>
                    </Grid>}

                <Grid item container xs={12} sm={8} justifyContent="flex-end"
                      sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 4px"}}>

                    <ButtonGroup variant="text"  aria-label="text button group" size="small"  direction="column"
                                 sx={{color: "#01579b"}}>
                        <div style={{borderRight: "1px solid rgba(25, 118, 210, 0.5)"}}>
                            <Button aria-label="remove" onClick={(e) => {
                                e.preventDefault();
                                decrementQuantity(product.id, product.quantity);
                            }}>
                                <RemoveIcon sx={{color: "#42a5f5"}}/>
                            </Button>
                            <span style={{fontSize: "1.2em", textAlign: "center"}}>{product.quantity}</span>
                            <Button aria-label="add" onClick={(e) => {
                                e.preventDefault();
                                incrementQuantity(product.id, product.quantity);
                            }}>
                                <AddIcon sx={{color: "#01579b"}}/>
                            </Button>
                        </div>
                        <Button aria-label="delete" placement="right-end" onClick={(e) => {
                            e.preventDefault();
                            deleteProduct(product.id);
                        }}>
                            <DeleteIcon sx={{color: "#01579b"}}/>
                        </Button>
                    <Button aria-label="edit" placement="right-end" onClick={(e) => {
                        e.preventDefault();
                        setEditProduct(product.id, product.name, product.categoryPath, product.capacity, product.unit, product.quantity, product.expireDate);
                        setEditProductModalOpen(true);
                    }}>
                        <EditIcon sx={{color: "#01579b"}}/>
                    </Button>
                </ButtonGroup>
                </Grid>
            </Grid>

            <Divider variant="middle" component="li"/>
        </>
    )
}

export default ProductListItem;