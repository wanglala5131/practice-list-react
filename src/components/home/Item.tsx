import styled from 'styled-components';
import { ItemType } from 'components/data.type';
import { Link } from 'react-router-dom';
import { Star, AngleDown, AngleUp } from '@styled-icons/fa-solid';

import defaultImage from 'assets/image/no-img.jpeg';

const Card = styled.div`
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  z-index: 5;

  &:hover {
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease-out;
  }

  .card-link {
    position: absolute;
    z-index: 20;
    width: 100%;
    height: 100%;
  }

  &.open-nav {
    z-index: 10;
  }

  &.card {
    overflow: hidden;

    &:hover {
      transform: translateY(-10px);
    }
  }

  &.list {
    display: flex;
    position: relative;
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

  &.list {
    flex-grow: 1;
    display: flex;
    align-items: center;
    height: auto;

    img {
      display: none;
    }
  }
`;

const CardFixed = styled.div`
  position: absolute;
  z-index: 40;
  top: 0;
  right: 0px;
  padding: 0px 5px 5px 5px;
  cursor: pointer;
`;

// card 才有
const StarIcon = styled(Star)`
  width: 40px;
  height: 40px;

  &.active,
  &:hover {
    color: ${props => props.theme.starYellow};
  }

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-out;
  }
`;

// list 才有
const AngleDownIcon = styled(AngleDown)`
  width: 30px;
  height: 30px;
`;

// list 才有
const AngleUpIcon = styled(AngleUp)`
  width: 30px;
  height: 30px;
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

  &.list {
    flex-shrink: 0;
    position: relative;
    top: 0;
    left: 0;
    margin: 0 20px 0 10px;

    &.like {
      background-color: rgba(254, 242, 99, 0.6);
      border: 2px solid rgba(254, 242, 99, 1);
      color: ${props => props.theme.opBlack};
    }
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

  &.list {
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    background-image: none;
    padding: 15px 30px 15px 0;

    h3 {
      margin: 0 10px 0 0;
    }
  }
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

  &.list {
    justify-content: flex-start;

    span {
      margin: 5px 1px;
    }
  }
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  grid-template-rows: auto;

  &.close {
    grid-template-columns: 1fr 1fr;
  }

  &.list {
    display: none;

    &.active {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
      z-index: 25;

      > * {
        height: 40px;
        padding: 0 35px;
        line-height: 1;

        :not(:disabled) {
          cursor: pointer;

          &:hover,
          &:hover a {
            color: ${props => props.theme.fontGreen};
          }
        }
      }
    }
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
  itemDisplay?: string;
  listNavOpenId?: number;
  setListOpenId?: (value: number) => void;
  changeItemLike?: (id: number, isLike: boolean) => void | undefined;
  addItemToCart?: (id: number) => void | undefined;
  closeItem: (id: number, name: string) => void | undefined;
};

export default function Item(props: Props) {
  const {
    item,
    isInCart = false,
    isInClosePage = false,
    itemDisplay = '',
    listNavOpenId,
    setListOpenId,
    changeItemLike,
    addItemToCart,
    closeItem,
  } = props;

  const changeNavOpenId = (value: number) => {
    if (setListOpenId) {
      setListOpenId(value);
    }
  };

  return (
    <Card
      className={`
      ${itemDisplay} 
      ${listNavOpenId === item.id ? 'open-nav' : ''}`}
    >
      <CardHeader className={itemDisplay}>
        <Link className="card-link" to={`/${item.id}`}></Link>

        <CardFixed>
          {!isInClosePage && itemDisplay === 'card' && (
            <StarIcon
              onClick={() => {
                if (changeItemLike) {
                  changeItemLike(item.id, item.isLiked);
                }
              }}
              className={item.isLiked ? 'active' : ''}
            />
          )}

          {itemDisplay === 'list' &&
            (listNavOpenId === item.id ? (
              <AngleUpIcon
                onClick={() => {
                  changeNavOpenId(0);
                }}
              />
            ) : (
              <AngleDownIcon
                onClick={() => {
                  changeNavOpenId(item.id);
                }}
              />
            ))}
        </CardFixed>

        <img alt="card-img" src={item.image || defaultImage} />

        <CardCategory
          className={`${itemDisplay} ${item.isLiked ? 'like' : ''}`}
        >
          {item.Category.name}
        </CardCategory>

        <CardTitle className={itemDisplay}>
          <h3>{item.name}</h3>

          <CardSubcategories className={itemDisplay}>
            {item.Subcategories?.map(subcategory => (
              <span key={subcategory.id}>{subcategory.name}</span>
            ))}
          </CardSubcategories>
        </CardTitle>
      </CardHeader>

      <CardFooter
        className={`
        ${isInClosePage ? 'close' : ''} 
        ${itemDisplay} 
        ${listNavOpenId === item.id ? 'active' : ''}`}
      >
        {itemDisplay === 'list' && !isInClosePage && (
          <CardButton
            onClick={() => {
              if (changeItemLike) {
                changeItemLike(item.id, item.isLiked);
              }
            }}
          >
            {item.isLiked ? '移除最愛' : '加入最愛'}
          </CardButton>
        )}
        <CardButton
          onClick={() => {
            closeItem(item.id, item.name);
          }}
          className={itemDisplay === 'list' ? '' : 'close'}
        >
          {isInClosePage ? '解除封存' : '封存'}
        </CardButton>

        <CardButton className={itemDisplay === 'list' ? '' : 'edit'}>
          <Link to={`/${item.id}`}>編輯 </Link>
        </CardButton>

        {isInClosePage || (
          <CardButton
            className={itemDisplay === 'list' ? '' : 'cart'}
            disabled={isInCart}
            onClick={() => {
              if (addItemToCart) {
                addItemToCart(item.id);
              }
            }}
          >
            {isInCart ? '已加進暫定菜單' : ' 加到暫定菜單中'}
          </CardButton>
        )}
      </CardFooter>
    </Card>
  );
}
