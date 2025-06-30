import { Route, Routes } from 'react-router-dom';

import Answer from './pages/Answer/Answer.jsx';
import AskQuestion from './pages/AskQuestion/AskQuestion.jsx';
import AuthPage from './pages/Auth/AuthPage.jsx';
import { Context } from './Components/Context.jsx';
import EditQuestion from './Pages/EditQuestion/EditQuestion.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Header from './Components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import Howitwork from './Pages/Howitwork/Howitwork.jsx';
import Profile from './Pages/Profile/Profile.jsx';
import Protected from './Components/Protected.jsx';
import { Spinner } from 'react-bootstrap';
import { useContext } from 'react';

function Router() {
  const [{ loading }] = useContext(Context);

  if (loading) {
    return (
      <div className="loadingContainer">
        <Spinner animation="border" variant="warning" size="lg" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/answer/:qid"
          element={
            <Protected>
              <Answer />
            </Protected>
          }
        />
        <Route
          path="/askquestion"
          element={
            <Protected>
              <AskQuestion />
            </Protected>
          }
        />
        <Route path="/howitwork" element={<Howitwork />} />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/editquestion/:question_id" element={<EditQuestion />} />
      </Routes>
      <Footer />
    </>
  );
}

export default Router;
