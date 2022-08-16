import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { List, ThLarge } from '@styled-icons/fa-solid';

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

  const [itemDisplay, setItemDisplay] = useState<string>('');
  const [listNavOpenId, setListOpenId] = useState<number>(0);

  // 模擬 api
  useEffect(() => {
    setTimeout(() => {
      setItems(OriItems);
    }, 500);

    const saveTxt = localStorage.getItem('itemDisplay') || 'card';
    setItemDisplay(saveTxt);
  }, []);

  const changeItemDisplay = (value: 'list' | 'card') => {
    setItemDisplay(value);
    localStorage.setItem('itemDisplay', value);
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
        hasCart={true}
      ></Banner>

      <div className={`container ${itemDisplay === 'list' ? 'smaller' : ''}`}>
        <CardsNumTxt className="cards-num">
          共有 {items.length} 個結果
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
          {items.map(item => (
            <Item
              key={item.id}
              item={item}
              isInClosePage={true}
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
