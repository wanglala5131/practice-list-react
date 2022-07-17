import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ResetStyle, GlobalStyle } from 'components/globalStyle';
import { theme } from 'components/variables';

// router
import Header from 'components/header/Header';
import Login from 'components/login/Login';

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/login">Ligin</Link>
      </nav>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <ResetStyle />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
