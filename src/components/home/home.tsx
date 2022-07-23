import Banner from 'components/Banner';
import bannerImg from 'assets/image/index-page.jpeg';

export default function Home() {
  const pageData = {
    bannerImg,
    title: '訓練項目',
    buttons: [
      {
        name: '新增項目',
        url: '/create',
        class: 'default add-link',
        type: 'link',
      },
      { name: '查看封存項目', url: 'close', class: 'default', type: 'button' },
    ],
  };
  return (
    <Banner
      bannerImg={pageData.bannerImg}
      title={pageData.title}
      buttons={pageData.buttons}
    />
  );
}
