import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Styled, { ThemeProvider } from 'styled-components';
import { darktheme, lighttheme } from './themes/theme';
import { useState } from 'react';



const Container = Styled.div`
  display: flex;
`;

const Main = Styled.div`
  flex: 7; 
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = Styled.div`
  padding: 10px 65px;
`;

const MenuIconWrapper = Styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
`;

function App() {
  const [darkmode, setDarkmode] = useState(true);
  const [clickin, setClick] = useState(false);

  return (
    <ThemeProvider theme={darkmode ? darktheme : lighttheme}>
      <Container>
        <BrowserRouter>
          {/* Include Menu component outside the Routes */}
          {/** Other elements like header, sidebar, etc. can be added here */}
         

          <Main>
            {/* Routes for different pages */}
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/attendence' element={<Attendence />} />
              <Route path='/marks' element={<Marks />} />
              <Route path='/home' element={<Home />} />
              <Route path='/Register' element={<RegisterPage />} />
              <Route path='/Fee' element={<Fee />} />
              <Route path='/Transcript' element={<Transcript />} />
              
              {/* Add more routes as needed */}
            </Routes>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
