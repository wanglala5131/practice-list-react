import { useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pad } from 'components/variables';

import { useAppSelector } from 'hooks/hooks';

import logo from 'assets/image/logo.png';
import NavList from './NavList';

const HeaderArea = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  background-color: ${props => [props.theme.opBlack]};
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.5);
  z-index: 20;

  @media ${pad} {
    height: 50px;
  }
`;

const Logo = styled.div`
  width: 130px;
  height: 50px;

  @media ${pad} {
    width: 115px;
    height: 45px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    vertical-align: middle;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 20px;

  .nav-toggle {
    display: none;

    &:checked {
      & ~ .nav-list {
        transform: scale(1, 1);
      }

      & ~ .nav-modal {
        display: block;
      }

      & ~ .hamburger {
        span {
          background-color: transparent;

          &::after {
            transform: rotate(-45deg) translate(1px, -11px);
          }

          &::before {
            transform: rotate(45deg) translate(1px, 11px);
          }
        }
      }
    }
  }

  .nav-modal {
    display: none;
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.opLightBlack};
    z-index: -10;

    @media ${pad} {
      visibility: hidden;
    }
  }
`;

const HambuegerArea = styled.label`
  display: flex;
  align-items: center;
  height: 30px;
  width: 30px;
  margin-right: 15px;

  @media ${pad} {
    display: none;
  }

  span {
    display: block;
    width: 30px;
    height: 3px;
    background-color: ${props => props.theme.lightGray};

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 3px;
      background-color: ${props => props.theme.lightGray};
      transition: 0.2s ease-in-out;
    }

    &::before {
      top: 20px;
    }

    &::after {
      bottom: 20px;
    }
  }
`;

export default function Header() {
  const { isLogin } = useAppSelector(state => state.user);

  const hamburgerInput = useRef<HTMLInputElement>(null!);
  const clickNav = () => {
    if (isLogin) {
      hamburgerInput.current.checked = false;
    }
  };

  return (
    <HeaderArea>
      <Logo onClick={clickNav}>
        <Link to={isLogin ? '/' : '/login'}>
          <img src={logo} alt="practice-list-logo" />
        </Link>
      </Logo>
      {isLogin && (
        <Nav>
          <input
            type="checkbox"
            id="nav-toggle"
            className="nav-toggle"
            ref={hamburgerInput}
          />
          <label htmlFor="nav-toggle" className="nav-modal"></label>
          <NavList clickNav={clickNav} />
          <HambuegerArea htmlFor="nav-toggle" className="hamburger">
            <span></span>
          </HambuegerArea>
        </Nav>
      )}
    </HeaderArea>
  );
}
