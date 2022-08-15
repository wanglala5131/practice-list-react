import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { List, ThLarge } from '@styled-icons/fa-solid';

import {
  CategoriesType,
  SubCategoriesType,
  ItemsType,
  CartItem,
} from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';
import Item from 'components/home/Item';
import Cart from 'components/Cart';

// fake data
import {
  items as OriItems,
  categories as OriCate,
  subcategories as OriSub,
  cartItems as OriCartItems,
  cartItemsArr as OriCartItemsArr,
} from 'assets/fake-data/fake';

const CardsNumTxt = styled.p`
  margin: 20px 0;
  text-align: center;
  font-size: 20px;
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  grid-gap: 40px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  padding-bottom: 50px;
  min-height: 320px;

  &.list {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    grid-gap: 20px;

    > * {
      flex-grow: 1;
    }
  }
`;

const IconArea = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-column: 1 / -1;
`;

const IconClass = css`
  width: 30px;
  height: 30px;
  color: ${props => props.theme.gray};

  &.active {
    color: ${props => props.theme.fontGreen};
  }
`;

const ThLargeIcon = styled(ThLarge)`
  ${IconClass}
`;

const ListIcon = styled(List)`
  ${IconClass}
  margin-left: 20px;
`;

const pageData = {
  bannerImg,
  title: '訓練項目',
  buttons: [
    {
      name: '新增項目',
      url: '/create',
      class: 'default add-link',
      type: 'link',
      action: 'create',
      disabled: false,
    },
    {
      name: '查看封存項目',
      url: '/close',
      class: 'default',
      type: 'link',
      action: 'go-close',
      disabled: false,
    },
  ],
};

export default function Home() {
  // 原始資料
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [subcategories, setSubcategories] = useState<SubCategoriesType[]>([]);
  const [items, setItems] = useState<ItemsType>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);

  // filter
  const [keyword, setKeyword] = useState<string>('');
  const [currentSub, setCurrentSub] = useState<number[]>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [currentShowItems, setCurrentShowItems] = useState<ItemsType>([]);

  const [itemDisplay, setItemDisplay] = useState<string>('');
  const [listNavOpenId, setListOpenId] = useState<number>(0);

  // 模擬 api
  useEffect(() => {
    setTimeout(() => {
      setCategories(OriCate);
      setSubcategories(OriSub);
      setItems(OriItems);
      setCurrentShowItems(OriItems);
      setCartItems(OriCartItems);
      setCartItemsArr(OriCartItemsArr);
    }, 500);

    const saveTxt = localStorage.getItem('itemDisplay') || 'card';
    setItemDisplay(saveTxt);
  }, []);

  useEffect(() => {
    let oriItemsArr: ItemsType = items;
    if (isLike) {
      oriItemsArr = oriItemsArr.filter(item => item.isLiked);
    }

    if (keyword) {
      oriItemsArr = oriItemsArr.filter(item => item.name.includes(keyword));
    }

    oriItemsArr = oriItemsArr.filter(item =>
      item.Subcategories.some(subcategory =>
        currentSub.includes(subcategory.id)
      )
    );
    setCurrentShowItems(oriItemsArr);
  }, [currentSub, isLike, keyword]);

  const changeItemDisplay = (value: 'list' | 'card') => {
    setItemDisplay(value);
    localStorage.setItem('itemDisplay', value);
  };

  return (
    <>
      <Cart cartItems={cartItems} />
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
        hasCart={true}
      ></Banner>

      <SearchBar
        categories={categories}
        subcategories={subcategories}
        setCurrentSub={setCurrentSub}
        currentSub={currentSub}
        isLike={isLike}
        setIsLike={setIsLike}
        setKeyword={setKeyword}
      />
      <div className={`container ${itemDisplay === 'list' ? 'smaller' : ''}`}>
        <CardsNumTxt className="cards-num">
          共有 {currentShowItems.length} 個結果
        </CardsNumTxt>
        <CardsWrapper className={itemDisplay}>
          <IconArea>
            <ThLargeIcon
              className={itemDisplay === 'card' ? 'active' : ''}
              title="卡片顯示"
              onClick={() => changeItemDisplay('card')}
            />
            <ListIcon
              className={itemDisplay === 'list' ? 'active' : ''}
              title="列表顯示"
              onClick={() => changeItemDisplay('list')}
            />
          </IconArea>
          {currentShowItems.map(item => (
            <Item
              key={item.id}
              item={item}
              isInCart={cartItemsArr.includes(item.id)}
              itemDisplay={itemDisplay}
              listNavOpenId={listNavOpenId}
              setListOpenId={setListOpenId}
            />
          ))}
        </CardsWrapper>
      </div>
    </>
  );
}
