import { useEffect, useState } from 'react';
import { ItemType } from 'components/data.type';

import { toastAlert, swalAlert, confirmAlert } from 'helpers/alert';
import { useAppDispatch } from 'hooks/hooks';
import { setLoading } from 'actions/loading';
import { getCloseItems } from 'api/item';
import { toggleCloseItem } from 'api/item';

import Banner from 'components/Banner';
import bannerImg from 'assets/image/stop.jpeg';
import ItemsWrapper from 'components/ItemsWrapper';

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
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<ItemType[]>([]);

  // 模擬 api
  useEffect(() => {
    getCloseOriItems();
  }, []);

  const getCloseOriItems = () => {
    return getCloseItems()
      .then(res => {
        const { items: OriItems } = res;

        setItems(OriItems);
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });
  };

  const closeItem = (id: number, name: string) => {
    confirmAlert(`確定要解除「${name}」的封存嗎?`).then(result => {
      dispatch(setLoading(true));

      if (result.isConfirmed) {
        toggleCloseItem(id)
          .then(res => {
            if (res.status === 'success') {
              getCloseOriItems().then(() => {
                dispatch(setLoading(false));
                toastAlert(`已解除「${name}」的封存`);
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
      <Banner
        bannerImg={pageData.bannerImg}
        title={pageData.title}
        buttons={pageData.buttons}
        hasCart={true}
      ></Banner>

      <ItemsWrapper
        isInClosePage={true}
        itemsList={items}
        closeItem={closeItem}
      />
    </>
  );
}
