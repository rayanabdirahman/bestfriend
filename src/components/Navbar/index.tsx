import React from 'react';
import * as styled from './styled';

const Navbar: React.FC = (): JSX.Element => (
  <styled.container>
    <styled.logo>bestfriend</styled.logo>
    <styled.menu>
      <styled.menuItem>
        <a href="#">Features</a>
      </styled.menuItem>
      <styled.menuItem>
        <a href="#">Join waitlist</a>
      </styled.menuItem>
    </styled.menu>
  </styled.container>
);

export default Navbar;
