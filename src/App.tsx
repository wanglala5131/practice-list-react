import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetStyle, GlobalStyle } from 'components/globalStyle';
import { theme } from 'components/variables';

// router
import Header from 'components/header/Header';
import UserCard from 'components/user/UserCard'; // 登入註冊頁面
import Home from 'components/home/home';

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
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
