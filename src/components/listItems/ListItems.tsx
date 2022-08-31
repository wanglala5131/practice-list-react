import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ReactSortable } from 'react-sortablejs';
import { pad, buttonStyle, inputStyle } from 'components/variables';

import { toastAlert, swalAlert, confirmAlert } from 'helpers/alert';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { CartItem, ItemType } from 'components/data.type';
import { getCart, saveCart, deleteCartItem, submitCartItems } from 'api/cart';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/cart-page.jpeg';
import ListItem from './ListItem';
import AddItemModal from 'components/listItems/AddItemModal';

// fake data
import { item, items, lists as oriLists } from 'assets/fake-data/fake';

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

const ListNoteTxt = styled.p`
  margin-top: 10px;
  color: ${props => props.theme.red};
  font-size: 16px;

  @media ${pad} {
    font-size: 20px;
  }
`;

type Props = {
  isCart: boolean;
};

export default function ListItems(props: Props) {
  const dispatch = useAppDispatch();
  const { isCart } = props;

  const navigate = useNavigate();
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

    getListItems();

    if (!isCart) {
      setListName(oriLists[1].name);
    } else {
      setListName(localStorage.getItem('cartName') || '');
    }
  }, [pathname]);

  const getListItems = () => {
    // TODO: 編輯時做區分
    return getCart()
      .then(res => {
        setListItems(res);
        setListItemsArr(res.map(item => item.id));
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });

    // TODO: list items 轉換成 CartItem 的形式
    // let item = isCart
    //   ? res
    //   : oriLists[1].Items.map(item => ({
    //       id: item.id,
    //       Item: item,
    //       itemId: item.id,
    //       reps: item.ListItem.reps,
    //       sort: item.ListItem.sort,
    //       remark: item.ListItem.remark,
    //     }));
  };

  // 加上排序
  const sortItems = (items: CartItem[]) => {
    return items.map((item, index) => ({
      sort: index,
      ItemId: item.Item.id,
      reps: item.reps,
      remark: item.remark,
    }));
  };

  const submit = () => {
    if (listItems.length < 3) {
      swalAlert('請至少選擇三個項目');
      return;
    }

    if (!listName) {
      swalAlert('請填入菜單名稱');
      return;
    }

    const sortListtItems = sortItems(listItems);

    // TODO: 建立菜單導轉後，看新的有沒有出來
    submitCartItems({ updateItems: sortListtItems, listName })
      .then(res => {
        if (res.status === 'success') {
          localStorage.removeItem('cartName');
          toastAlert('成功建立菜單');
          navigate('/lists');
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const save = () => {
    if (isCart) {
      if (listName) {
        localStorage.setItem('cartName', listName);
      } else {
        localStorage.removeItem('cartName');
      }
    }

    dispatch(setLoading(true));
    const sortListtItems = sortItems(listItems);
    saveCart({ updateItems: sortListtItems })
      .then(res => {
        if (res.status === 'success') {
          toastAlert('儲存成功');
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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
  const deleteItem = (id: number, name: string) => {
    confirmAlert(`確定要刪除「${name}」嗎?`).then(result => {
      if (result.isConfirmed) {
        if (isCart) {
          deleteInCart(id);
        } else {
          console.log(id);
          // TODO: listItems method
          // if (tempAddItemIds.includes(id)) {
          //   setListItemsArr(prevVar => {
          //     return prevVar.filter(item => item !== id);
          //   });
          //   setListItems(prevVar => {
          //     return prevVar.filter(item => item.id !== id);
          //   });

          //   return;
          // }
        }
      }
    });
  };

  const deleteInCart = (id: number) => {
    const deleteCartItemId = listItems.find(
      cartItem => cartItem.Item.id === id
    )?.id;

    if (!deleteCartItemId) {
      swalAlert('發生錯誤，請重新整理');
      return;
    }

    dispatch(setLoading(true));
    deleteCartItem(deleteCartItemId)
      .then(res => {
        if (res.status === 'success') {
          getListItems().then(() => {
            toastAlert('刪除成功');
          });
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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

        {listItems.length < 3 && (
          <ListNoteTxt>至少三個項目才可送出表單</ListNoteTxt>
        )}

        <ListButtons>
          {isCart && (
            <button className="default" onClick={save}>
              儲存資料
            </button>
          )}
          {isCart || (
            <button className="default" onClick={() => setIsModalOpen(true)}>
              增加項目
            </button>
          )}

          <button
            className="submit"
            disabled={listItems.length < 3 || !listName}
            onClick={submit}
          >
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
