import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pad } from 'components/variables';

const navList = [
  {
    path: '/items',
    name: '訓練項目',
  },
  {
    path: '/cart',
    name: '暫定菜單',
  },
  {
    path: '/lists',
    name: '已排菜單',
  },
  {
    path: '/setting/subcategory',
    name: '類別設定',
  },
  {
    path: '/howtouse',
    name: '使用說明',
  },
];

const NavListUl = styled.div`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.theme.white};
  transform: scale(1, 0);
  transform-origin: top;
  transition: transform 0.2s ease-out;

  @media ${pad} {
    display: flex;
    align-items: center;
    position: static;
    background-color: transparent;
    box-shadow: none;
    transform: scale(1, 1);
  }
`;

const NavItem = styled.li`
  text-align: center;

  @media ${pad} {
    font-size: 20px;
    padding: 0 10px;
  }

  a {
    position: relative;
    display: block;
    padding: 12px 0;
    letter-spacing: 2px;
    color: ${props => props.theme.darkGray};

    @media ${pad} {
      padding: 0;
      color: ${props => props.theme.lightGray};
    }

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 3px;
      width: calc(100% - 20px);
      margin: 0 10px;
      background-color: ${props => props.theme.lightGray};

      @media ${pad} {
        display: none;
      }
    }

    &:hover,
    &.active {
      background-color: ${props => props.theme.lightLogoGreen};
      transition: all 0.2s ease-in-out;

      @media ${pad} {
        background-color: transparent;
        color: ${props => props.theme.logoGreen};
      }
    }
  }

  // 登出按鈕
  button {
    display: block;
    width: 100%;
    padding: 12px 0;
    background-color: transparent;
    border-bottom: 0px solid ${props => props.theme.lightGray};
    color: ${props => props.theme.logoGreen};
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;

    @media ${pad} {
      padding: 0;
    }
  }

  &.logout {
    cursor: pointer;

    @media ${pad} {
      display: inline-block;
      margin: 0 20px 0 10px;
      padding: 2px 7px;
      border: 1px solid ${props => props.theme.logoGreen};
      border-radius: 5px;
    }

    &:hover {
      background-color: ${props => props.theme.logoGreen};
      transition: background-color 0.2s ease-in-out;

      button {
        color: ${props => props.theme.darkGray};
      }
    }
  }
`;

type Props = {
  clickNav: () => void;
};

export default function NavList(props: Props) {
  const { clickNav } = props;

  return (
    <NavListUl className="nav-list">
      {navList.map(item => (
        <NavItem key={item.path} onClick={clickNav}>
          <Link to={item.path}> {item.name}</Link>
        </NavItem>
      ))}
      <NavItem className="logout">
        <button>登出</button>
      </NavItem>
    </NavListUl>
  );
}
