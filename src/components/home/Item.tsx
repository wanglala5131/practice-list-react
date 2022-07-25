import styled from 'styled-components';
import { ItemType } from 'components/home/home.type';
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
  // border-top: 4px solid ${props => props.theme.opBlack};

  &.close {
    grid-template-columns: 1fr 1fr;
  }
`;

const CardButton = styled.button`
  padding: 10px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;

  &.close,
  &.edit {
    background-color: ${props => props.theme.yellow};

    &:hover {
      background-color: ${props => props.theme.darkYellow};
      transition: all 0.2s ease-out;
    }
  }

  &.cart {
    background-color: ${props => props.theme.lightLogoGreen};
    border-radius: 0 0 5px 0;

    &:hover {
      background-color: ${props => props.theme.logoGreen};
      transition: all 0.2s ease-out;
    }
  }
`;

type Props = {
  item: ItemType;
};

export default function Item(props: Props) {
  const { item } = props;
  return (
    <Card>
      <CardHeader>
        <Link className="card-link" to={''}></Link>
        <CardCategory>{item.Category.name}</CardCategory>
        <CardStar className={item.isLiked ? 'active' : ''} />
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
      <CardFooter>
        <CardButton className="close">封存</CardButton>
        <CardButton className="edit">編輯</CardButton>
        <CardButton className="cart">加到暫定菜單中</CardButton>
      </CardFooter>
    </Card>
  );
}