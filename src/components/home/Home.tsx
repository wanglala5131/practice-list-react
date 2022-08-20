import { useEffect, useState } from 'react';
import { ItemType, CartItem } from 'components/data.type';

import { test } from 'api/user';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';
import Cart from 'components/Cart';
import ItemsWrapper from 'components/ItemsWrapper';

// fake data
import {
  items as OriItems,
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
  const [items, setItems] = useState<ItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);
  const [currentShowItems, setCurrentShowItems] = useState<ItemType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setItems(OriItems);
      setCurrentShowItems(OriItems);
      setCartItems(OriCartItems);
      setCartItemsArr(OriCartItemsArr);
    }, 1000);

    apiTest();
  }, []);

  const apiTest = () => {
    test().then(res => {
      console.log(res);
    });
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

      <SearchBar oriItems={items} setCurrentShowItems={setCurrentShowItems} />
      <ItemsWrapper
        isInClosePage={false}
        itemsList={currentShowItems}
        cartItemsArr={cartItemsArr}
      />
    </>
  );
}
