import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { pad } from 'components/variables';

import { CartItem } from 'components/data.type';

const ListItemContainer = styled.div`
  &:first-child {
    margin-top: 20px;
  }

  input[type='checkbox'] {
    display: none;

    &:checked ~ .list-footer {
      height: auto;
      transform: scale(1, 1);
      transition: transform 0.2s ease-out;
    }
  }

  // 拖曳時，點擊項目下面那塊呈現的樣子
  &.dragging {
    .list-item-header {
      background-color: #fff;
      border: 3px solid ${props => props.theme.lightLogoGreen};
    }
  }
`;

const ListItemHeader = styled.label`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border-radius: 10px;
  border: 3px solid ${props => props.theme.lightLogoGreen};
  background-color: ${props => props.theme.lightLogoGreen};

  > * {
    margin: 0 10px;
  }
`;

const ItemContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;

  > * {
    margin: 5px 10px;
  }
`;

const ItemName = styled.p`
  display: flex;
  align-items: center;

  a {
    margin-left: 5px;
    font-size: 14px;
    background-color: ${props => props.theme.darkGreen};
    border-radius: 10px;
    padding: 3px;
    color: ${props => props.theme.white};
    line-height: 1;

    @media ${pad} {
      font-size: 16px;
    }

    &:hover {
      opacity: 0.8;
      transition: all 0.2s ease-in-out;
    }
  }
`;

const Category = styled.span`
  margin-right: 10px;
  color: ${props => props.theme.fontGreen};
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 1px;
  white-space: nowrap;

  @media ${pad} {
    font-size: 20px;
  }
`;

const Subcategories = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  @media ${pad} {
    margin-top: 3px;
    font-size: 18px;
  }

  span {
    display: inline-block;
    padding: 1px 3px;
    margin: 0 1px;
    border: 1px solid ${props => props.theme.darkGray};
    border-radius: 10px;
    color: ${props => props.theme.darkGray};
  }
`;

const ItemButton = styled.button`
  margin-right: 10px;
  font-size: 40px;
  color: ${props => props.theme.darkRed};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.red};
    text-shadow: 0px 2px 2px (rgba(0, 0, 0, 0.2));
  }
`;

const ListItemFooter = styled.div`
  padding: 5px 30px;
  height: 0;
  transform: scale(1, 0);
  transform-origin: top;
  transition: none;

  > div {
    padding: 10px;

    &:last-child {
      padding-bottom: 30px;
    }
  }
`;

type Props = {
  item: CartItem;
  changeValue: (id: number, type: 'reps' | 'remark', value: string) => void;
  deleteItem: (value: number) => void;
};

export default function ListItem(props: Props) {
  const { item, changeValue, deleteItem } = props;

  return (
    <ListItemContainer>
      <ListItemHeader className="list-item-header" htmlFor={`list-${item.id}`}>
        <ItemContent>
          <ItemName>
            {item.Item.name}
            <Link to={`/${item.ItemId}`}>查看項目</Link>
          </ItemName>

          <Category>{item.Item.Category.name}</Category>
          <Subcategories>
            {item.Item.Subcategories.map(subcategory => (
              <span key={subcategory.id}>{subcategory.name}</span>
            ))}
          </Subcategories>
        </ItemContent>

        <ItemButton onClick={() => deleteItem(item.id)}>&times;</ItemButton>
      </ListItemHeader>

      <input type="checkbox" id={`list-${item.id}`} />
      <ListItemFooter className="list-footer">
        <div>
          <label>組數：</label>
          <input
            type="text"
            placeholder="e.g.三組各10次、持續5分鐘"
            defaultValue={item.reps}
            onChange={e => changeValue(item.id, 'reps', e.target.value)}
          />
        </div>
        <div>
          <label>備註：</label>
          <input
            type="text"
            defaultValue={item.remark}
            onChange={e => changeValue(item.id, 'remark', e.target.value)}
          />
        </div>
      </ListItemFooter>
    </ListItemContainer>
  );
}
