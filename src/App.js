import './App.css';
import HomePage from './components/users/home/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/loginComponent/loginPage/loginPage';
import CompanyMasterPage from './components/admin/master/companyMaster/companyMaster';
import Sidebar from './components/admin/sidebar/sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Gallery from './components/admin/master/gallery/gallery';
import ContactPage from './components/users/contact/contact';
import AboutPage from './components/users/about/about';
import UserMasterPage from './components/admin/master/userMaster/user';
import TrashBin from './components/admin/master/trashBin/trashBin';
import { ConfirmDialogProvider } from './components/confirmDialog/ConfirmDialogContext';
import Menus from './components/admin/master/menus/menus';

function App() {
  return (
    <ConfirmDialogProvider>
      <Router>
        <div>
          <ToastContainer />
          <Routes>
            {/* Default Route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Module Routes with AuthGuard */}
            <Route path="/" element={<Sidebar />}>
              <Route path="/company" element={<CompanyMasterPage />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/user" element={<UserMasterPage />} />
              <Route path="/trash-bin" element={<TrashBin />} />
              <Route path="/menus" element={<Menus />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ConfirmDialogProvider>
  );
}
export default App;
