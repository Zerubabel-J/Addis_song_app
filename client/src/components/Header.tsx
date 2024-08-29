import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Nav = styled.nav`
  margin-bottom: ${({ theme }) => theme.spacing.large};
`;

const NavList = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  const theme = useTheme();

  return (
    <header
      style={{
        padding: theme.spacing.large,
        backgroundColor: theme.colors.background,
      }}
    >
      <h1 style={{ color: theme.colors.primary }}>Music App</h1>
      <Nav>
        <NavList>
          <NavItem>
            <NavLink to="/">Songs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/statistics">Statistics</NavLink>
          </NavItem>
        </NavList>
      </Nav>
    </header>
  );
};

export default Header;
