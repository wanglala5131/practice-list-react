import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { List, ThLarge } from '@styled-icons/fa-solid';

import { ItemType } from 'components/data.type';
import Item from 'components/home/Item';

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
    justify-content: flex-start;
    grid-gap: 20px;
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
  cursor: pointer;

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

type Props = {
  isInClosePage: boolean;
  itemsList: ItemType[];
  cartItemsArr?: number[];
  changeItemLike?: (id: number, isLike: boolean) => void | undefined;
  addItemToCart?: (id: number) => void | undefined;
  closeItem: (id: number, name: string) => void | undefined;
};

export default function ItemsWrapper(props: Props) {
  const {
    isInClosePage,
    itemsList,
    cartItemsArr,
    changeItemLike,
    addItemToCart,
    closeItem,
  } = props;

  const [itemDisplay, setItemDisplay] = useState<string>('');
  const [listNavOpenId, setListOpenId] = useState<number>(0);

  useEffect(() => {
    const saveTxt = localStorage.getItem('itemDisplay') || 'card';
    setItemDisplay(saveTxt);
  }, []);

  const changeItemDisplay = (value: 'list' | 'card') => {
    setItemDisplay(value);
    localStorage.setItem('itemDisplay', value);
  };

  return (
    <div className={`container ${itemDisplay === 'list' ? 'smaller' : ''}`}>
      <CardsNumTxt className="cards-num">
        - 共有 {itemsList.length} 個結果 -
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
        {itemsList.map(item => (
          <Item
            key={item.id}
            item={item}
            isInClosePage={isInClosePage}
            isInCart={cartItemsArr?.includes(item.id)}
            itemDisplay={itemDisplay}
            listNavOpenId={listNavOpenId}
            setListOpenId={setListOpenId}
            changeItemLike={changeItemLike}
            addItemToCart={addItemToCart}
            closeItem={closeItem}
          />
        ))}
      </CardsWrapper>
    </div>
  );
}
