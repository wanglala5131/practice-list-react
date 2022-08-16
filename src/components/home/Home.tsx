import { useEffect, useState } from 'react';

import {
  CategoriesType,
  SubCategoriesType,
  ItemsType,
  CartItem,
} from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';
import Cart from 'components/Cart';
import ItemsWrapper from 'components/ItemsWrapper';

// fake data
import {
  items as OriItems,
  categories as OriCate,
  subcategories as OriSub,
  cartItems as OriCartItems,
  cartItemsArr as OriCartItemsArr,
} from 'assets/fake-data/fake';

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
      <ItemsWrapper
        isInClosePage={false}
        itemsList={currentShowItems}
        cartItemsArr={cartItemsArr}
      />
    </>
  );
}
