
import {lazy, Suspense} from 'react';
import Spinner from '../spinner/Spinner';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";
import useMarvelService from '../../services/MarvelService';

const Page404 = lazy(() => import('../pages/Page404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage'));

const App = () => {
    const {getCharacter, getComic} = useMarvelService();
        return (
        <Router>
            <div className="app">
            <AppHeader />
            <main>
                <Suspense fallback={<Spinner />}>
                    <Routes>
                        <Route path="/" element={<MainPage />}/>
                        <Route path="/comics" element={<ComicsPage />}/>
                        <Route path="/comics/:id" element={<SingleComicPage getContent={getComic} />}/>
                        <Route path="/characters/:id" element={<SingleComicPage getContent={getCharacter} />}/>
                        <Route path="*" element={<Page404 />}/>
                    </Routes>
                </Suspense>
            </main>
        </div>
        </Router>
        )
    }


export default App;