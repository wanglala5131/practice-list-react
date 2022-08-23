import { useEffect, useState } from 'react';
import { ItemType, CartItem } from 'components/data.type';

import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { getItems, changeLike } from 'api/item';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

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
  const swalAlert = withReactContent(Swal);

  // 原始資料
  const [items, setItems] = useState<ItemType[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsArr, setCartItemsArr] = useState<number[]>([]);
  const [currentShowItems, setCurrentShowItems] = useState<ItemType[]>([]);

  useEffect(() => {
    getItems()
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
      .catch(err => {
        console.log(err);

        swalAlert.fire({
          icon: 'error',
          text: '發生錯誤，請重試一次',
        });
      });
  }, []);

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

          swalAlert.fire({
            icon: 'success',
            html: `<p class="toast-txt">
            ${currentLike ? '加星號成功' : '已移除星號'}<p>`,
            toast: true,
            position: 'top',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            color: '#6fa96f', // fontGreen
          });
        }
      })
      .catch(err => {
        console.log(err);

        swalAlert.fire({
          icon: 'error',
          text: '發生錯誤，請重試一次',
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
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
        changeItemLike={changeItemLike}
      />
    </>
  );
}
