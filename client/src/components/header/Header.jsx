import {
  AppBar,
  Toolbar,
  styled,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { Menu, Close, LogoutOutlined } from "@mui/icons-material";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";

// ── AppBar ───────────────────────────────────────────────
const Component = styled(AppBar)`
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`;

const Container = styled(Toolbar)`
  justify-content: space-between;
  padding: 0 40px;

  @media (max-width: 600px) {
    padding: 0 16px;
  }
`;

const Logo = styled("span")`
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;

  span {
    color: #7c6fff;
  }
`;

// ── Desktop Nav ──────────────────────────────────────────
const NavLinks = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavButton = styled(Button)`
  color: rgba(255, 255, 255, 0.75);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 18px;
  border-radius: 6px;
  text-transform: uppercase;
  position: relative;
  transition: all 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: #7c6fff;
    border-radius: 2px;
    transition: width 0.25s ease;
  }

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.06);
    &::after {
      width: 60%;
    }
  }

  &.active {
    color: #ffffff;
    &::after {
      width: 60%;
    }
  }
`;

const LogoutButton = styled(Button)`
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  padding: 8px 22px;
  border-radius: 20px;
  text-transform: uppercase;
  transition: all 0.25s ease;
  margin-left: 12px;

  &:hover {
    background: linear-gradient(135deg, #6b5fff, #4a3ffe);
    box-shadow: 0 4px 15px rgba(124, 111, 255, 0.5);
    transform: translateY(-1px);
  }
`;

// ── Hamburger ────────────────────────────────────────────
const HamburgerBtn = styled(IconButton)`
  display: none;
  color: #fff;

  @media (max-width: 768px) {
    display: flex;
  }
`;

// ── Mobile Drawer ────────────────────────────────────────
const DrawerWrapper = styled(Box)`
  width: 280px;
  height: 100%;
  background: linear-gradient(160deg, #0f0c29, #302b63);
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const DrawerLogo = styled("span")`
  font-size: 20px;
  font-weight: 800;
  color: #fff;
  letter-spacing: 2px;

  span {
    color: #7c6fff;
  }
`;

const DrawerNavItem = styled(ListItem)`
  padding: 0;
`;

const DrawerNavButton = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  padding: 14px 24px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 0;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #fff;
    border-left-color: #7c6fff;
  }

  &.active {
    color: #fff;
    background: rgba(124, 111, 255, 0.12);
    border-left-color: #7c6fff;
  }
`;

const DrawerLogout = styled(Button)`
  margin: 16px 20px;
  padding: 13px;
  border-radius: 12px;
  background: linear-gradient(135deg, #7c6fff, #5b4fff);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.25s ease;
  display: flex;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #6b5fff, #4a3ffe);
    box-shadow: 0 4px 15px rgba(124, 111, 255, 0.4);
  }
`;

const DrawerFooter = styled(Box)`
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const DrawerFooterText = styled(Box)`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  letter-spacing: 1px;
`;

// ── Nav items ────────────────────────────────────────────
const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// ── Component ────────────────────────────────────────────
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsAuthenticated, setAccount } = useContext(DataContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const logout = async () => {
    try {
      const token = sessionStorage.getItem("refreshToken");
      if (token) await API.userLogout({ token });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.clear();
      setIsAuthenticated(false);
      setAccount({ name: "", username: "" });
      navigate("/account");
    }
  };

  const handleLogout = () => {
    setDrawerOpen(false);
    logout();
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <>
      <Component position="sticky">
        <Container>
          {/* Logo */}
          <Logo onClick={() => navigate("/")}>
            ENG<span>BLOG</span>
          </Logo>

          {/* Desktop Nav */}
          <NavLinks>
            {navItems.map(({ label, path }) => (
              <NavButton
                key={path}
                component={Link}
                to={path}
                className={isActive(path)}
              >
                {label}
              </NavButton>
            ))}
            <LogoutButton onClick={logout}>Logout</LogoutButton>
          </NavLinks>

          {/* Hamburger */}
          <HamburgerBtn onClick={() => setDrawerOpen(true)}>
            <Menu />
          </HamburgerBtn>
        </Container>
      </Component>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: "transparent", boxShadow: "none" } }}
      >
        <DrawerWrapper>
          {/* Drawer Header */}
          <DrawerHeader>
            <DrawerLogo>
              MY<span>BLOG</span>
            </DrawerLogo>
            <IconButton
              onClick={() => setDrawerOpen(false)}
              sx={{ color: "rgba(255,255,255,0.7)" }}
            >
              <Close />
            </IconButton>
          </DrawerHeader>

          {/* Nav Items */}
          <List sx={{ pt: 1 }}>
            {navItems.map(({ label, path }) => (
              <DrawerNavItem key={path}>
                <DrawerNavButton
                  component={Link}
                  to={path}
                  className={isActive(path)}
                  onClick={() => setDrawerOpen(false)}
                >
                  {label}
                </DrawerNavButton>
              </DrawerNavItem>
            ))}
          </List>

          {/* Logout */}
          <DrawerLogout onClick={handleLogout} fullWidth>
            <LogoutOutlined sx={{ fontSize: 18 }} /> Logout
          </DrawerLogout>

          {/* Footer */}
          <DrawerFooter>
            <DrawerFooterText>ENGINEERS BLOG</DrawerFooterText>
          </DrawerFooter>
        </DrawerWrapper>
      </Drawer>
    </>
  );
};

export default Header;
