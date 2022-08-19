import { useEffect, useState } from 'react';
import { ItemType } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/stop.jpeg';
import ItemsWrapper from 'components/ItemsWrapper';

// fake data
import { closeItems as OriItems } from 'assets/fake-data/fake';

const pageData = {
  bannerImg,
  title: '已封存的項目',
  buttons: [
    {
      name: '返回首頁',
      url: '/',
      class: 'default',
      type: 'link',
      action: 'go-back',
      disabled: false,
    },
  ],
};

export default function Home() {
  const [items, setItems] = useState<ItemType[]>([]);

  // 模擬 api
  useEffect(() => {
    setTimeout(() => {
      setItems(OriItems);
    }, 500);
  }, []);

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
        hasCart={true}
      ></Banner>

      <ItemsWrapper isInClosePage={true} itemsList={items} />
    </>
  );
}
