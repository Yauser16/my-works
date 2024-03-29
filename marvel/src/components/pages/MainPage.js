
import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () => {

    const [selectedChar, setChar] = useState(null);
    const onSelectedChar = (id) => {
        setChar(id);
    }

    return (
        <>
        <Helmet>
        <meta
            name="description"
            content="Marvel information portal"
            />
        <title>Marvel information</title>
        </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onSelectedChar={onSelectedChar} />
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar} />
                </ErrorBoundary>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}
export default MainPage;