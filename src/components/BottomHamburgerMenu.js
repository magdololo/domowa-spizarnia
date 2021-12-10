import * as React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {ListItemButton} from "@mui/material";
import {Link} from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import SendIcon from "@mui/icons-material/Send";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import useStore from "../store/useStore";
const BottomHamburgerMenu = () => {

    const [menuOpen, setMenuOpen] = React.useState(false);
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setMenuOpen(open);
    };
    const [open, setOpen] = React.useState(true);

    const handleClick = (e) => {
        e.stopPropagation();
        setOpen(!open);
    };
    const user = useStore(state=>state.loggedInUser);
  return (
      <React.Fragment key={"left"}>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}>
              <MenuIcon />
          </IconButton>
          <Drawer anchor={"left"} open={menuOpen} onClose={toggleDrawer(false)}>
              <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
              >
                  <List>
                      <ListItemButton component={Link} to={"/"} sx={{textDecoration: "none"}} >
                          <ListItemIcon>
                              <SendIcon />
                          </ListItemIcon>
                          <ListItemText primary="Lista kategorii" />
                      </ListItemButton>
                      <ListItemButton component={Link} to={"/products"} sx={{textDecoration: "none"}} >
                          <ListItemIcon>
                              <SendIcon />
                          </ListItemIcon>
                          <ListItemText primary="Lista produktów" />
                      </ListItemButton>
                  </List>
                  <Divider />
                  <List>
                      <ListItemButton onClick={handleClick}>
                          <ListItemIcon>
                              <Avatar src="/broken-image.jpg" />
                          </ListItemIcon>
                          <ListItemText primary="Moje konto" />

                          {open ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>

                                  <ListItemText secondary={user.email} sx={{paddingLeft: 6}}/>

                          </List>
                      </Collapse>


                      <ListItemButton>
                          <ListItemIcon>
                              <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary="Wyloguj się" />
                      </ListItemButton>
                  </List>
              </Box>
          </Drawer>
      </React.Fragment>
  )
}
export default BottomHamburgerMenu;