import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { pad, scrollType } from 'components/variables';
import { ListAlt } from '@styled-icons/fa-solid';
import { CartItem } from './home.type';

const Contaniner = styled.div`
  z-index: 50;
  position: fixed;
  top: 70px;
  left: 10px;
  width: 100%;

  @media ${pad} {
    top: 60px;
    border-radius: 20px;
  }

  .cart-simple-input {
    display: none;

    &:checked ~ .cart-simple-content {
      transform: scale(1, 1);
    }

    &:checked ~ .card-simple-modal {
      display: block;
    }
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 40%;
  background-color: ${props => props.theme.opBlack};
  box-shadow: 0 0 3px 2px rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.lightLogoGreen};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.logoGreen};
    color: ${props => props.theme.white};
    transition: all 0.1s ease-out;
  }

  @media ${pad} {
    width: 40px;
    height: 40px;
  }
`;

const ListIcon = styled(ListAlt)`
  width: 20px;
  height: 20px;
  color: ${props => props.theme.lightLogoGreen};

  @media ${pad} {
    width: 25px;
    height: 25px;
  }
`;

const Modal = styled.div`
  z-index: -20;
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  z-index: -10;
  position: absolute;
  top: -10px;
  left: -10px;
  width: 100%;
  height: 100vh;
  padding: 0px 15px 80px 15px;
  background-color: ${props => props.theme.white};
  overflow-y: scroll;
  transform: scale(0, 1);
  transform-origin: left;
  transition: transform 0.2s ease-out;

  ${scrollType}

  @media ${pad} {
    padding: 10px;
    width: 600px;
    height: 600px;
    border-radius: 10px;
    box-shadow: 0 0 3px 2px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.p`
  padding: 20px 0;
  border-bottom: 2px solid ${props => props.theme.fontGreen};
  font-size: 21px;
  font-weight: 500;
  color: ${props => props.theme.fontGreen};
  text-align: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: ${props => props.theme.lightLogoGreen};
  border-radius: 10px;

  &:hover {
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  }
`;

const ItemContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  position: relative;

  a {
    position: absolute;
    height: 100%;
    width: 100%;
  }
`;

const Name = styled.p`
  flex-basis: 40%;
  padding: 5px 20px;
  font-size: 19px;
  padding-bottom: 5px;
`;

const Category = styled.p`
  flex-basis: 15%;
  padding: 5px;
  color: ${props => props.theme.darkGray};
  font-size: 19px;
  font-weight: 700;
`;

const Subcategories = styled.div`
  flex-basis: 45%;
  padding: 5px;

  span {
    display: inline-block;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 8px;
    padding: 1px 3px;
    margin: 2px;
    color: ${props => props.theme.darkGray};
  }
`;

const RemoveButton = styled.button`
  margin-right: 10px;
  font-size: 40px;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.logoGreen};
    text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
    transition: all 0.1s ease-out;
  }
`;

type Props = {
  cartItems: CartItem[];
};

export default function Cart(props: Props) {
  const { cartItems } = props;

  return (
    <Contaniner>
      <Label htmlFor="cart-simple-input">
        <ListIcon />
      </Label>
      <input
        type="checkbox"
        className="cart-simple-input"
        id="cart-simple-input"
      />
      <Modal className="card-simple-modal"></Modal>
      <Content className="cart-simple-content">
        <Title>暫定菜單</Title>
        <ul>
          {cartItems.map(item => (
            <Item key={item.id}>
              <ItemContent>
                <Link to={''} className="cart-simple-link"></Link>
                <Name>{item.Item.name}</Name>
                <Category>{item.Item.Category.name}</Category>
                <Subcategories>
                  {item.Item.Subcategories.map(subcategory => (
                    <span key={subcategory.id}> {subcategory.name} </span>
                  ))}
                  {item.Item.Subcategories.map(subcategory => (
                    <span key={subcategory.id}> {subcategory.name} </span>
                  ))}
                  {item.Item.Subcategories.map(subcategory => (
                    <span key={subcategory.id}> {subcategory.name} </span>
                  ))}
                </Subcategories>
              </ItemContent>
              <RemoveButton className="cart-simple-button">
                &times;
              </RemoveButton>
            </Item>
          ))}
        </ul>
      </Content>
    </Contaniner>
  );
}
