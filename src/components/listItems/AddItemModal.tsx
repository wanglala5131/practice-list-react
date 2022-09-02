import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { pad, buttonStyle } from 'components/variables';

import { ItemType } from 'components/data.type';

import Modal from 'react-modal';
Modal.setAppElement('#root');

import { swalAlert } from 'helpers/alert';
import { getItems } from 'api/item';

import SearchBar from 'components/home/SearchBar';

// fake data
import { items as OriItems } from 'assets/fake-data/fake';

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
  color: ${props => props.theme.darkGray};
  cursor: pointer;

  @media ${pad} {
    font-size: 35px;
  }
`;

const ModalHeader = styled.div`
  position: relative;
  margin: 0 20px;
  border-bottom: 1px solid ${props => props.theme.gray};

  h2 {
    font-size: 20px;
    font-weight: 500;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;

    @media ${pad} {
      font-size: 25px;
      line-height: 50px;
    }
  }
`;

const ModalContent = styled.div`
  overflow: scroll;
  margin: 0 10px;
  padding-bottom: 40px;
  height: calc(100% - 50px);
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: ${props => props.theme.lightLogoGreen};
  border-radius: 20px;

  &:first-child {
    margin-top: 30px;
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${pad} {
    flex-direction: row;
  }
`;

const ItemName = styled.span`
  margin: 0 10px;
  font-size: 22px;
  font-weight: 500;
`;

const Category = styled.span`
  color: ${props => props.theme.fontGreen};
  font-size: 22px;
  font-weight: 500;
`;

const Subcategoris = styled.div`
  display: flex;
  flex-wrap: wrap;

  span {
    margin: 0 2px;
    padding: 1px 3px;
    font-size: 18px;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 10px;
  }
`;

const ItemButton = styled.button`
  ${buttonStyle}

  background-color: ${props => props.theme.logoGreen};

  &:not(:disabled):hover {
    filter: brightness(0.8);
    transition: all 0.1s ease-in-out;
    cursor: pointer;
  }
`;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  listItemsArr: number[];
  addItem: (item: ItemType, access: boolean) => void;
};

export default function AddItemModal(props: Props) {
  const { isModalOpen, setIsModalOpen, listItemsArr, addItem } = props;

  // 原始資料
  const [items, setItems] = useState<ItemType[]>([]);

  const [currentShowItems, setCurrentShowItems] = useState<ItemType[]>([]);

  useEffect(() => {
    getItems()
      .then(res => {
        const { items: OriItems } = res;

        setItems(OriItems);
        setCurrentShowItems(OriItems);
      })
      .catch(() => {
        swalAlert('發生錯誤，請重試一次');
      });
  }, []);

  const customStyles = {
    overlay: {
      zIndex: '50',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '80%',
      padding: '0',
    },
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <ModalHeader>
        <h2>添加項目</h2>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </ModalHeader>

      <ModalContent>
        <SearchBar oriItems={items} setCurrentShowItems={setCurrentShowItems} />

        <div className="container smaller">
          {currentShowItems.map(item => (
            <Item key={item.id}>
              <ItemInfo>
                <div>
                  <Category>{item.Category.name}</Category>
                  <ItemName>{item.name}</ItemName>
                </div>

                <Subcategoris>
                  {item.Subcategories.map(subcategory => (
                    <span key={subcategory.id}>{subcategory.name}</span>
                  ))}
                </Subcategoris>
              </ItemInfo>

              <ItemButton
                disabled={listItemsArr.includes(item.id)}
                onClick={() => addItem(item, !listItemsArr.includes(item.id))}
              >
                {listItemsArr.includes(item.id) ? '已添加' : '添加'}
              </ItemButton>
            </Item>
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
}
