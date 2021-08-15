import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useEffect } from 'react';
import Loading from './components/Loading';
import Home from './pages/Home';
import SinglePost from './pages/SinglePost';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import AddProfile from './pages/AddProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ActivateUser from './pages/ActivateUser';
import SettProfile from './pages/SettProfile';
import SettInfos from './pages/SettInfos';
import Write from './pages/Write';
import RessetPass from './pages/RessetPass';
import ConfirmNewUserEmail from './pages/ConfirmNewUserEmail';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPosts from './pages/admin/AdminPosts';
import AdminSinglePost from './pages/admin/AdminSinglePost';
import AdminCategories from './pages/admin/AdminCategories';
import UpdatePost from './pages/UpdatePost';
import NotFound from './pages/NotFound';
import {useSelector, useDispatch} from 'react-redux';
import {loadUser, clearMsg} from './redux/actions/authActions';
import {clearErrors} from './redux/actions/errorsAction';

function App() {
  const isAuth = useSelector(state=> state.auth.isAuth);
  const dispatch = useDispatch();
  const isLoaded = useSelector(state => state.auth.isLoaded);
  const user = useSelector(state => state.auth.user)
  //const isLoadedPost = useSelector(state => state.posts.isLoaded);

  const checkAdmin = (page) => {
    if(user && user.role === 'admin'){
      return page
    }else{
      return <NotFound/>
    }
  }

  useEffect(() => {
    dispatch(clearMsg());
    dispatch(clearErrors());
    dispatch(loadUser());
  }, [])
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route path='/posts/:id' exact>
                <SinglePost/>
            </Route>
            <Route path='/profile/:id'>
              {!isLoaded ? <h1>loading</h1> : (
                <Profile/>
              )}
            </Route>
            <Route path='/about'>
              <AboutUs/>
            </Route>
            <Route path='/addProfile'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <AddProfile/>
              )}
            </Route>
            <Route path='/login'>
              <Login/>
            </Route>
            <Route path='/signup'>
              <Signup/>
            </Route>
            <Route path='/activateAccount/:activeToken'>
              <ActivateUser/>
            </Route>
            <Route path='/settings/profile'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <SettProfile/>
              )}
            </Route>
            <Route path='/settings/infos'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <SettInfos/>
              )}
            </Route>
            <Route path='/write'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <Write/>
              )}
            </Route>
            <Route path='/ressetPassword/:token'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <RessetPass/>
              )}
            </Route>
            <Route path='/confirmNewEmail/:token'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <ConfirmNewUserEmail/>
              )}
            </Route>
            <Route path='/admin/users'>
              {!isLoaded ? <Loading text='Loading'/> : (
                checkAdmin(<AdminUsers/>)
              )}
            </Route>
            <Route path='/admin/posts' exact>
              {!isLoaded ? <Loading text='Loading'/> : (
                checkAdmin(<AdminPosts/>)
              )}
            </Route>
            <Route path='/admin/posts/:id'>
              {!isLoaded ? <Loading text='Loading'/> : (
                checkAdmin(<AdminSinglePost/>)
              )}
            </Route>
            <Route path='/admin/categories'>
              {!isLoaded ? <Loading text='Loading'/> : (
                checkAdmin(<AdminCategories/>)
              )}
            </Route>
            <Route path='/posts/:id/update'>
              {!isLoaded ? <Loading text='Loading'/> : (
                <UpdatePost/>
              )}
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
