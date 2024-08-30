/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.large}
    ${({ theme }) => theme.spacing.medium};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.muted};
  position: relative; /* Ensures the footer is relative to its normal flow */
  bottom: 0;
  width: 100%; /* Full width to span across the bottom */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow to differentiate from content */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const FooterLinks = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin: 0 ${({ theme }) => theme.spacing.small};

  &:hover {
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterLinks>
          <FooterLink
            href="https://www.linkedin.com/in/zerubabel-jember-53b7552a2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </FooterLink>
          <FooterLink
            href="https://github.com/Zerubabel-J/Addis_song_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </FooterLink>
          <FooterLink
            href="https://zerubabel-dev-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Developed by Zerubabel
          </FooterLink>
        </FooterLinks>
        <FooterText>
          &copy; {new Date().getFullYear()} Music App. All rights reserved.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
