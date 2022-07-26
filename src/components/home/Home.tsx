import { useEffect, useState } from 'react';
import styled from 'styled-components';

import * as Data from 'components/home/home.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';
import Item from 'components/home/Item';
import Cart from './Cart';

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
    },
    { name: '查看封存項目', url: 'close', class: 'default', type: 'button' },
  ],
};

export default function Home() {
  // 原始資料
  const [categories, setCategories] = useState<Data.CategoriesType[]>([]);
  const [subcategories, setSubcategories] = useState<Data.SubCategoriesType[]>(
    []
  );
  const [items, setItems] = useState<Data.ItemsType>([]);
  const [cartItems, setCartItems] = useState<Data.CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);

  // filter
  const [keyword, setKeyword] = useState<string>('');
  const [currentSub, setCurrentSub] = useState<number[]>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [currentShowItems, setCurrentShowItems] = useState<Data.ItemsType>([]);

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
  }, []);

  useEffect(() => {
    let oriItemsArr: Data.ItemsType = items;
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
      <div className="container">
        <CardsNumTxt className="cards-num">
          共有 {currentShowItems.length} 個結果
        </CardsNumTxt>
        <CardsWrapper>
          {currentShowItems.map(item => (
            <Item
              key={item.id}
              item={item}
              isInCart={cartItemsArr.includes(item.id)}
            />
          ))}
        </CardsWrapper>
      </div>
    </>
  );
}
