import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, ButtonGroup} from "@mui/material";
import useStore from "../store/useStore";


  const ProductListItemActionsButton= ({product})=>{
      const incrementQuantity = useStore(state => state.incrementProduct);
      const decrementQuantity = useStore(state => state.decrementProduct);
      const deleteProduct = useStore(state => state.deleteProduct);
      const setEditProduct = useStore(state=>state.setEditProduct);
      const setEditProductModalOpen = useStore(state=>state.setEditProductModalOpen);

    return (
            <ButtonGroup variant="text"  aria-label="text button group" size="small"  direction="column"
                       sx={{color: "#01579b"}}>
              {/*<div style={{borderRight: "1px solid rgba(25, 118, 210, 0.5)"}}>*/}
                  <Button aria-label="remove" onClick={(e) => {
                      e.preventDefault();
                      decrementQuantity(product.id, product.quantity);
                  }}>
                      <RemoveIcon sx={{color: "#42a5f5"}}/>
                  </Button>
                  {/*<Typography style={{fontSize: "1.2em", textAlign: "center"}}>{product.quantity}</Typography>*/}
                  <Button aria-label="add" onClick={(e) => {
                      e.preventDefault();
                      incrementQuantity(product.id, product.quantity);
                  }}>
                      <AddIcon sx={{color: "#01579b"}}/>
                  </Button>
              {/*</div>*/}
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
    )
  };
export default  ProductListItemActionsButton;