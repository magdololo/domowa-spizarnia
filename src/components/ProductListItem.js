import * as React from "react";
import {useState} from "react";
import {Divider, Grid} from "@mui/material";
import ProductListItemActions from "./ProductListItemActions";


const ProductListItem = ({product}) => {

    let   [todayDate] = useState(new Date());
    let expireDate = product.expireDate;

    return (
        <>
            <Grid container spacing={0} >
                <Grid item xs={12}
                      style={( expireDate  > todayDate) || expireDate === null  ? {color: "#646670"} : {color: "red"}}
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
                      style={(expireDate === null || expireDate > todayDate ) ? {color: "#bdc1c7"} : {color: "red", fontWeight: "normal"}}
                      sx={{
                          lineHeight: "0.9em",
                          fontWeight: "bold",
                          fontFamily: 'Sora',
                          fontSize: ".8em",
                          padding: "4px 8px"
                      }}>
                    {product.expireDate ? product.expireDate.toISOString().substring(0,10) : ""}
                </Grid>
                   {product.capacity !== 0 ?
                    <Grid item xs={12} sm={4} md={6}
                          color="#bdc1c7"
                          sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 8px"}}>
                        {product.capacity} {product.unit}
                    </Grid>
                    :
                    <Grid item xs={12} sm={4} md={6}
                          color="#bdc1c7"
                          sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 8px"}}>
                        <span>&nbsp;</span>
                    </Grid>}
                <Grid item container xs={12} sm={8} md={6} justifyContent={"flex-end"}
                      sx={{lineHeight: "0.9em", fontFamily: 'Sora', fontSize: ".8em", padding: "3px 4px"}}>
                    <ProductListItemActions product={product}/>
                </Grid>
            </Grid>

            <Divider variant="middle" component="li"/>
        </>
    )
}

export default ProductListItem;