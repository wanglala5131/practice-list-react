import styled from 'styled-components';
import { ItemType } from 'components/data.type';
import { Link } from 'react-router-dom';
import { Star } from '@styled-icons/fa-solid';
import defaultImage from 'assets/image/no-img.jpeg';

const Card = styled.div`
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-out;
    transform: translateY(-10px);
  }

  .card-link {
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 100%;
  }
`;

const CardHeader = styled.div`
  display: block;
  position: relative;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CardTitle = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  padding: 18px 0 8px 0;
  width: 100%;
  background-image: linear-gradient(transparent, rgba(255, 255, 255, 0.7) 10%);

  h3 {
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 21px;
    text-align: center;
    color: ${props => props.theme.darkGreen};
    line-height: 1.2;
    letter-spacing: 1px;
  }
`;

const CardStar = styled(Star)`
  position: absolute;
  z-index: 40;
  top: 0;
  right: 0px;
  padding: 0px 5px 5px 5px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &.active,
  &:hover {
    color: ${props => props.theme.starYellow};
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-out;
  }
`;

const CardCategory = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  padding: 1px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(0, 0, 0, 0.6);
  border-radius: 20px;
  font-size: 18px;
  color: ${props => props.theme.lightGray};
  font-weight: 500;
`;

const CardSubcategories = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  span {
    padding: 1px 5px;
    margin: 1px;
    border: 1px solid ${props => props.theme.darkGreen};
    border-radius: 10px;
    color: ${props => props.theme.darkGreen};
  }
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: auto;

  &.close {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardButton = styled.button`
  position: relative;
  padding: 10px;
  font-weight: 700;
  font-size: 16px;

  a {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: black;
  }

  &.close,
  &.edit {
    background-color: ${props => props.theme.yellow};
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.darkYellow};
      transition: all 0.2s ease-out;
    }
  }

  &.cart {
    background-color: ${props => props.theme.lightLogoGreen};
    border-radius: 0 0 5px 0;

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.logoGreen};
      transition: all 0.2s ease-out;
      cursor: pointer;
    }
  }
`;

type Props = {
  item: ItemType;
  isInCart?: boolean;
  isInClosePage?: boolean;
};

export default function Item(props: Props) {
  const { item, isInCart = false, isInClosePage = false } = props;
  return (
    <Card>
      <CardHeader>
        <Link className="card-link" to={`/${item.id}`}></Link>
        <CardCategory>{item.Category.name}</CardCategory>
        {isInClosePage || <CardStar className={item.isLiked ? 'active' : ''} />}
        <img alt="card-img" src={item.image || defaultImage} />
        <CardTitle>
          <h3>{item.name}</h3>
          <CardSubcategories>
            {item.Subcategories?.map(subcategory => (
              <span key={subcategory.id}>{subcategory.name}</span>
            ))}
          </CardSubcategories>
        </CardTitle>
      </CardHeader>
      <CardFooter className={isInClosePage ? 'close' : ''}>
        <CardButton className="close">
          {isInClosePage ? '解除封存' : '封存'}
        </CardButton>

        <CardButton className="edit">
          <Link to={`/${item.id}`}>編輯 </Link>
        </CardButton>

        {isInClosePage || (
          <CardButton className="cart" disabled={isInCart}>
            {isInCart ? '已加進暫定菜單' : ' 加到暫定菜單中'}
          </CardButton>
        )}
      </CardFooter>
    </Card>
  );
}
