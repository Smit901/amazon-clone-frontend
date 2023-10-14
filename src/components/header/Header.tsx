import * as React from 'react';
import { Container, AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Tooltip, Button, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import useUserContext from '../../utility/hooks/useUserContext';


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
  const navigate = useNavigate();
  const { token } = useUserContext()
  const pages = token ? ['home', 'product'] : ['home', 'product', 'login', 'register']
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: 'primary.light' }}>
      <Container maxWidth={false}>
        <Toolbar disableGutters>
          <Box sx={{ display: { md: 'flex', xs: 'none' }, mr: 1, mt: 1 }} onClick={() => navigate('/')}>
            <img src="/logo.svg" height={40} width={100} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <NavLink to={`/${page}`} key={page}>
                    <Typography textAlign="center">{page.toUpperCase()}</Typography>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, alignItems: 'center', mr: 1, mt: 1 }}>
            <img src="/logo.svg" height={50} width={100} alt='' />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink to={`/${page}`} className='header__link' key={page}>
                <Button
                  onClick={() => { }}
                  sx={{ my: 1, mx: 1, display: 'block', textDecoration: 'none', color: 'black' }}
                >
                  {page.toUpperCase()}
                </Button>
              </NavLink>

            ))}
          </Box>
          {token && <>
            <ShoppingCart sx={{ color: 'primary.main', mr: 2, height: 30, width: 35, cursor: 'pointer' }} onClick={() => navigate("/cart")} />
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/avatar.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                   <NavLink to={`/${setting.toLocaleLowerCase()}`} className='header__link' key={setting}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box></>}

        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;