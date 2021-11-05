import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Typography, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const ReturnToCategoryList = () => {

    return(
      <>
          <Grid container item xs={12} spacing={1} color={"gray"} component={Link} to={"/"} sx={{textDecoration: "none"}}>
              <Grid item ><ArrowBackIcon/></Grid>

          <Grid item ><Typography variant={"span"}>Wróć do listy kategorii</Typography></Grid>
          </Grid>
      </>
    );

};

export default ReturnToCategoryList;