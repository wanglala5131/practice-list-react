import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import { ReactSortable } from 'react-sortablejs';
import { pad, buttonStyle, inputStyle } from 'components/variables';
import { CartItem } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/cart-page.jpeg';
import ListItem from './ListItem';

// fake data
import { cartItems as oriCartItems } from 'assets/fake-data/fake';

const Container = styled.div`
  margin: 0 auto 80px auto;
  padding-top: 20px;
  width: 100%;
  max-width: 900px;
  font-size: 18px;

  @media ${pad} {
    margin-top: 40px;
    font-size: 20px;
  }

  input[type='text'] {
    ${inputStyle}

    width: 100%;
    margin-top: 10px;
  }
`;

const ListNote = styled.p`
  margin: 50px 0 10px;
  font-size: 16px;
  color: ${props => props.theme.darkGray};

  @media ${pad} {
    font-size: 20px;
  }
`;

const ListButtons = styled.div`
  margin-top: 30px;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  border-top: 2px solid ${props => props.theme.gray};

  @media ${pad} {
    flex-direction: row;
  }

  button {
    ${buttonStyle}

    margin: 10px;
    font-size: 21px;

    &.submit {
      background-color: ${props => props.theme.logoGreen};
    }

    &.save {
      background-color: ${props => props.theme.gray};
    }

    &:not(:disabled):hover {
      filter: brightness(0.8);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
    }
  }
`;

const pageData = {
  bannerImg,
  title: '暫定菜單',
  buttons: [
    {
      name: '回首頁',
      url: '/',
      class: 'default',
      type: 'link',
      action: 'back',
      disabled: false,
    },
  ],
};

export default function ListItems() {
  const [listItems, setListItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setListItems(oriCartItems);
    }, 1000);
  }, []);

  const submit = () => {
    const sortListtItem = listItems.map((item, index) => ({
      ...item,
      sort: index,
    }));

    console.log(sortListtItem);
  };

  const changeValue = (
    itemId: number,
    type: 'reps' | 'remark',
    value: string
  ) => {
    setListItems(
      listItems.map(item => {
        if (item.id === itemId) {
          item[type] = value;
        }
        return item;
      })
    );
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
      ></Banner>

      <Container className="container">
        <div>
          <label htmlFor="name-input">菜單名稱*：</label>
          <input type="text" placeholder="填入菜單名稱" id="name-input" />
        </div>
        <ListNote>請打開項目「填入資料」及「排列項目順序(拖曳)」</ListNote>
        <ReactSortable
          list={listItems}
          setList={setListItems}
          ghostClass="dragging"
          animation={100}
          swapThreshold={0.65}
        >
          {listItems.map(item => (
            <ListItem key={item.id} item={item} changeValue={changeValue} />
          ))}
        </ReactSortable>

        <ListButtons>
          <button className="save">儲存菜單名稱/項目資料</button>
          {/* TODO:save只有cart有 */}
          <button className="submit" onClick={submit}>
            送出
          </button>
          {/* TODO:有個modal可以在編輯已有菜單時增加項目 */}
        </ListButtons>
      </Container>
    </>
  );
}
