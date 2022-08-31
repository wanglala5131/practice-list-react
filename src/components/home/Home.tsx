import { useEffect, useState } from 'react';
import { ItemType, CartItem } from 'components/data.type';

import { toastAlert, swalAlert, confirmAlert } from 'helpers/alert';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { getItems, changeLike, toggleCloseItem } from 'api/item';
import { addToCart, deleteCartItem } from 'api/cart';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';
import SearchBar from 'components/home/SearchBar';
import Cart from 'components/Cart';
import ItemsWrapper from 'components/ItemsWrapper';

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
  const dispatch = useAppDispatch();

  // 原始資料
  const [items, setItems] = useState<ItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);
  const [currentShowItems, setCurrentShowItems] = useState<ItemType[]>([]);

  useEffect(() => {
    getOriItems();
  }, []);

  const getOriItems = () => {
    return getItems()
      .then(res => {
        const {
          items: OriItems,
          cartItemsArr: OriCartItemsArr,
          cartItems: OriCartItems,
        } = res;

        setItems(OriItems);
        setCurrentShowItems(OriItems);
        setCartItems(OriCartItems);
        setCartItemsArr(OriCartItemsArr);
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const changeItemLike = (id: number, isLike: boolean) => {
    const currentLike = !isLike;
    dispatch(setLoading(true));

    changeLike(id)
      .then(res => {
        if (res.status === 'success') {
          setItems(
            items.map(item => {
              if (item.id === id) {
                item.isLiked = currentLike;
              }
              return item;
            })
          );

          toastAlert(currentLike ? '加星號成功' : '已移除星號');
        }
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const addItemToCart = (id: number) => {
    dispatch(setLoading(true));

    addToCart(id)
      .then(res => {
        if (res.status === 'success') {
          getOriItems().then(() => {
            dispatch(setLoading(false));
            toastAlert('已加入暫定清單');
          });
        } else {
          dispatch(setLoading(false));
          swalAlert(res.message || '發生錯誤，請重試一次');
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const deleteItemInCart = (id: number) => {
    dispatch(setLoading(true));

    deleteCartItem(id)
      .then(res => {
        if (res.status === 'success') {
          getOriItems().then(() => {
            dispatch(setLoading(false));
            toastAlert('已將此項目自暫定清單中移除');
          });
        }
      })
      .catch(() => {
        dispatch(setLoading(false));
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const closeItem = (id: number, name: string) => {
    confirmAlert(`確定要「${name}」進行封存嗎?`).then(result => {
      if (result.isConfirmed) {
        dispatch(setLoading(true));
        toggleCloseItem(id)
          .then(res => {
            if (res.status === 'success') {
              getOriItems().then(() => {
                dispatch(setLoading(false));
                toastAlert(`已將「${name}」封存`);
              });
            }
          })
          .catch(() => {
            dispatch(setLoading(false));
            swalAlert('發生錯誤，請重試一次');
          });
      }
    });
  };

  return (
    <>
      <Cart cartItems={cartItems} deleteItemInCart={deleteItemInCart} />
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
        changeItemLike={changeItemLike}
        addItemToCart={addItemToCart}
        closeItem={closeItem}
      />
    </>
  );
}
