import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ItemsType } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/stop.jpeg';
import Item from 'components/home/Item';

// fake data
import { closeItems as OriItems } from 'assets/fake-data/fake';

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
  const [items, setItems] = useState<ItemsType>([]);

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

      <div className="container">
        <CardsNumTxt className="cards-num">
          共有 {items.length} 個結果
        </CardsNumTxt>
        <CardsWrapper>
          {items.map(item => (
            <Item key={item.id} item={item} isInClosePage={true} />
          ))}
        </CardsWrapper>
      </div>
    </>
  );
}
