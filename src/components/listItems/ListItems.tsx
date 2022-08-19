import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import { pad, buttonStyle, inputStyle } from 'components/variables';
import { CartItem, ItemType } from 'components/data.type';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/cart-page.jpeg';
import ListItem from './ListItem';
import AddItemModal from 'components/listItems/AddItemModal';

// fake data
import {
  cartItems as oriCartItems,
  lists as oriLists,
} from 'assets/fake-data/fake';

const Container = styled.div`
  margin: 0 auto 80px auto;
  padding: 20px 20px 0;
  width: 100%;
  max-width: 850px;
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

    &.default {
      background-color: ${props => props.theme.gray};
    }

    &:not(:disabled):hover {
      filter: brightness(0.8);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
    }
  }
`;

type Props = {
  isCart: boolean;
};

export default function ListItems(props: Props) {
  const { isCart } = props;

  const location = useLocation();
  const { pathname } = location;

  const pageData = {
    bannerImg,
    title: isCart ? '暫定菜單' : '編輯菜單',
    buttons: [],
  };

  const [listName, setListName] = useState<string>('');
  const [listItems, setListItems] = useState<CartItem[]>([]);
  const [listItemsArr, setListItemsArr] = useState<number[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 先清空
    setListItems([]);
    setListItemsArr([]);
    setListName('');

    setTimeout(() => {
      // list items 轉換成 CartItem 的形式
      let item = isCart
        ? oriCartItems
        : oriLists[1].Items.map(item => ({
            id: item.id,
            Item: item,
            itemId: item.id,
            reps: item.ListItem.reps,
            sort: item.ListItem.sort,
            remark: item.ListItem.remark,
          }));

      setListItems(item);
      setListItemsArr(item.map(item => item.id));

      if (!isCart) {
        setListName(oriLists[1].name);
      } else {
        setListName(localStorage.getItem('cartName') || '');
      }
    }, 1000);
  }, [pathname]);

  const submit = () => {
    const sortListtItem = listItems.map((item, index) => ({
      ...item,
      sort: index,
    }));

    console.log(listName);
    console.log(sortListtItem);
  };

  const saveCart = () => {
    if (isCart) {
      if (listName) {
        localStorage.setItem('cartName', listName);
      } else {
        localStorage.removeItem('cartName');
      }
    }
    // TODO: 發api儲存暫定菜單
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

  const [tempAddItemIds, setItempAddItemIds] = useState<number[]>([]); // 暫時添加的項目

  const addItem = (item: ItemType, access: boolean) => {
    if (access) {
      setListItemsArr([...listItemsArr, item.id]);
      setListItems(prevVal => {
        return [
          ...prevVal,
          {
            id: item.id,
            Item: item,
            itemId: item.id,
            reps: '',
            sort: 100,
            remark: '',
          },
        ];
      });
      setItempAddItemIds([...tempAddItemIds, item.id]);
    }
  };
  const deleteItem = (id: number) => {
    if (tempAddItemIds.includes(id)) {
      setListItemsArr(prevVar => {
        return prevVar.filter(item => item !== id);
      });
      setListItems(prevVar => {
        return prevVar.filter(item => item.id !== id);
      });

      return;
    }
  };

  return (
    <>
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
      ></Banner>

      <Container>
        <div>
          <label htmlFor="name-input">菜單名稱*：</label>
          <input
            type="text"
            placeholder="填入菜單名稱"
            id="name-input"
            defaultValue={listName}
            onChange={e => setListName(e.target.value)}
          />
        </div>
        <ListNote>請點擊打開項目「填入資料」及「排列項目順序(拖曳)」</ListNote>
        <ReactSortable
          list={listItems}
          setList={setListItems}
          ghostClass="dragging"
          animation={100}
          swapThreshold={0.65}
        >
          {listItems.map(item => (
            <ListItem
              key={item.id}
              item={item}
              changeValue={changeValue}
              deleteItem={deleteItem}
            />
          ))}
        </ReactSortable>

        <ListButtons>
          {isCart && (
            <button className="default" onClick={saveCart}>
              儲存資料
            </button>
          )}
          {isCart || (
            <button className="default" onClick={() => setIsModalOpen(true)}>
              增加項目
            </button>
          )}

          <button className="submit" onClick={submit}>
            {isCart ? '送出' : '儲存'}
          </button>
        </ListButtons>

        <AddItemModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          listItemsArr={listItemsArr}
          addItem={addItem}
        />
      </Container>
    </>
  );
}
