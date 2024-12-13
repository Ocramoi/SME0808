import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Home } from './Home/Home';
import { About } from './About/About';
import { Report } from './Report/Report';
import { Analysis } from './Analysis/Analysis';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import TimelineIcon from '@mui/icons-material/Timeline';
import Typography from '@mui/material/Typography';
import { Box, Toolbar, IconButton, Container, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import './App.css';

function App(): JSX.Element {
  const [
    anchorElNav, setAnchorElNav
  ] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = [
    { name: "Início", path: "/" },
    { name: "Relatório", path: "/relatorio" },
    { name: "Sobre", path: "/sobre" },
    { name: "Análises", path: "/analises" },
  ];

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-main">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <TimelineIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              <Typography
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SME0808 - Séries Temporais
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
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
                  sx={{ display: { xs: 'block', md: 'none' } }}
                >
                  {
                    pages.map(page => (
                      <MenuItem onClick={handleCloseNavMenu} key={ page.name }>
                        <Typography sx={{ textAlign: 'center' }}>
                          <Link className="navbarLink box" to={ page.path }>{ page.name }</Link>
                        </Typography>
                      </MenuItem>
                    ))
                  }
                </Menu>
              </Box>

              <Typography
                noWrap
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                SME0808
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {
                  pages.map(page => (
                    <Typography sx={{ textAlign: 'center' }} key={ page.name }>
                      <Link className="navbarLink" to={ page.path }>{ page.name }</Link>
                    </Typography>
                  ))
                }
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <div className="content">
        <div className="inner">
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/relatorio" Component={Report} />
            <Route path="/sobre" Component={About} />
            <Route path="/analises" Component={Analysis} />
          </Routes>
        </div>

        <div className="footer">
          2024@USP-ICMC
        </div>
      </div>
    </Router>
  );
}

export default App;
