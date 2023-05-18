
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import FormSearchChar from '../searchChar/searchChar';
import setContent from '../../Utils/setContent';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { process, setProcess, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        upDateChar();
        //eslint-disable-next-line
    }, [props.charId]);



    const onCharLoaded = (char) => {
        setChar(char);
    }

    const upDateChar = () => {
        const { charId } = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    /* const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null; */
    return (
        <div className="wrapper">
            <div className="char__info">
               {setContent(process, View, char)}
            </div>
            <FormSearchChar />
        </div>
    )
}

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let imgStyle = { "objectFit": "cover" };
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { "objectFit": "contain" };
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            {<ul className="char__comics-list">
                {comics.length > 0 ? null : 'comics not found'}
                {comics.map((item, i) => {
                    // eslint-disable-next-line
                    if (i > 9) return;
                    return (
                        <Link to={`/comics${item.resourceURI.match(/\W\d+/g)}`}>
                            <li key={item.id} className="char__comics-item" >
                                {item.name}

                            </li>
                        </Link>

                    )
                }
                )}
            </ul>}
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;