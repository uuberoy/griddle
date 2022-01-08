import { navContainerClass, headerClass } from "./styled";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

const Nav = () => {
  return (
    <AppBar position="static" className={navContainerClass}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <span className={headerClass}>griddle</span>
        <span className={headerClass}>?</span>
      </Box>
    </AppBar>
  );
}

Nav.displayName = 'Nav';

export default Nav;