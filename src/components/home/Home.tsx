import { useEffect, useState } from 'react';
import * as Data from 'components/home/home.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';

// fake data
import {
  // items as OriItems,
  categories as OriCate,
  subcategories as OriSub,
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
    },
    { name: '查看封存項目', url: 'close', class: 'default', type: 'button' },
  ],
};

export default function Home() {
  // 原始資料
  const [categories, setCategories] = useState<Data.CategoriesType>([]);
  const [subcategories, setSubcategories] = useState<Data.SubCategoriesType>(
    []
  );
  // const [items, setItems] = useState<Data.ItemsType>([]);

  // subcategories
  const [currentSub, setCurrentSub] = useState<number[]>([]);

  // 模擬 api
  useEffect(() => {
    setTimeout(() => {
      setCategories(OriCate);
      setSubcategories(OriSub);
      // setItems(OriItems);
    }, 500);
  }, []);

  // console.log(items);

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
      />
      <SearchBar
        categories={categories}
        subcategories={subcategories}
        setCurrentSub={setCurrentSub}
        currentSub={currentSub}
      />
    </>
  );
}
