import styled from 'styled-components';
import { Link } from 'react-router-dom';

// image
import indexMobile from 'assets/image/how-to-use/index-m.jpg';
import index from 'assets/image/how-to-use/index.jpeg';
import cartMobile from 'assets/image/how-to-use/cart-m.jpg';
import cart from 'assets/image/how-to-use/cart.jpeg';
import listMobile from 'assets/image/how-to-use/list-m.jpg';
import list from 'assets/image/how-to-use/list.jpeg';
import settingMobile from 'assets/image/how-to-use/setting-m.jpg';
import setting from 'assets/image/how-to-use/setting.jpeg';

const Container = styled.div`
  margin: 100px auto;
  padding-bottom: 50px;
  width: 90%;
  max-width: 800px;
`;

const Item = styled.div`
  margin-top: 20px;
  padding: 20px;
  color: ${props => props.theme.darkGray};
  font-size: 18px;
  line-height: 1.2;

  &:not(:last-child) {
    border-bottom: 2px solid ${props => props.theme.fontGreen};
  }

  a {
    color: blue;
  }

  p,
  li {
    margin-bottom: 10px;
  }

  li {
    list-style-type: decimal;
    margin-left: 25px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: ${props => props.theme.fontGreen};
  font-size: 24px;
  font-weight: 500;
`;

export default function HowToUse() {
  return (
    <Container>
      <Item>
        <Title>初次使用時，建議流程</Title>
        <ol>
          <li>
            去<Link to="/setting/subcategory">設定頁</Link>
            設定運動項目與項目類型
          </li>
          <li>
            開始<Link to="/items/create">新增項目</Link>
            ，請至少新增三項
          </li>
          <li>
            可以開始加入暫定菜單囉！請至
            <Link to="/cart">暫定菜單</Link>調整順序與填入資料
          </li>
          <li>送出菜單，若菜單已使用可選擇刪除或標示為已使用</li>
        </ol>
      </Item>
      <Item>
        <Title>首頁</Title>
        <p>※不使用的卡片請用封存，封存狀態的卡片無法加入暫定菜單</p>
        <p>※沒有刪除功能</p>
        <picture>
          <source media="(max-width: 768px)" srcSet={indexMobile} />
          <img src={index} alt="practice-list-index" />
        </picture>
      </Item>

      <Item>
        <Title>暫定菜單</Title>
        <p>※菜單名稱為必填，組數和備註為選填</p>
        <p>※可用拖曳移動項目順序</p>
        <p>※送出的菜單至少要三項 (兩項就感覺沒意義啦~)</p>
        <picture>
          <source media="(max-width: 768px)" srcSet={cartMobile} />
          <img src={cart} alt="practice-list-index-cart" />
        </picture>
      </Item>

      <Item>
        <Title>已排菜單</Title>
        <picture>
          <source media="(max-width: 768px)" srcSet={listMobile} />
          <img src={list} alt="practice-list-lists" />
        </picture>
      </Item>

      <Item>
        <Title>設定頁</Title>
        <picture>
          <source media="(max-width: 768px)" srcSet={settingMobile} />
          <img src={setting} alt="practice-list-setting" />
        </picture>
      </Item>
    </Container>
  );
}
