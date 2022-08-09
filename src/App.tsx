import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetStyle, GlobalStyle } from 'components/globalStyle';
import { theme } from 'components/variables';

// router
import Header from 'components/header/Header';
import UserCard from 'components/user/UserCard'; // 登入註冊頁面
import Home from 'components/home/Home';
import Create from 'components/create/Create';
import Item from 'components/itemPage/ItemPage';
import Close from 'components/close/Close';
import Setting from 'components/setting/Setting';
import HowToUse from 'components/howToUse/HowToUse';

function App() {
  return (
    <div className="App">
      <ResetStyle />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserCard isLogin={true} />} />
            <Route path="/register" element={<UserCard isLogin={false} />} />
            <Route path="/create" element={<Create isCreate={true} />} />
            <Route path="/edit/:id" element={<Create isCreate={false} />} />
            <Route path="/:id" element={<Item />} />
            <Route path="/close" element={<Close />} />
            <Route
              path="/setting/category"
              element={<Setting settingType={'category'} />}
            />
            <Route
              path="/setting/subcategory"
              element={<Setting settingType={'subcategory'} />}
            />
            <Route path="/how-to-use" element={<HowToUse />} />
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
