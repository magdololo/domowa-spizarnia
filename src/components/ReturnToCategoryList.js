import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Typography, Grid} from "@mui/material";

const ReturnToCategoryList = () => {

    return(
      <>
          <Grid container xs={12} spacing={1} sx={{color: "lightgray"}}>
              <Grid item ><ArrowBackIcon/></Grid>

          <Grid item ><Typography variant={"span"}>Wróć do listy kategorii</Typography></Grid>
          </Grid>
      </>
    );

};

export default ReturnToCategoryList;