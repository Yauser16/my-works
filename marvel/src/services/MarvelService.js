
import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {

    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=c19c02a89897935339b64dccf69d666a';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);        
        };
    const getAllComics = async (offset = 0)  => {
        const res = await request (`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }
    const getComic = async(id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
        };
    const getCharacter = async(id) => {
            const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            return _transformCharacter(res.data.results[0]);
            };
    const getCharacterName = async(name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        if (res.data.total !== 0)  {
            return _transformCharacter(res.data.results[0]);
         }
         return 'sol';
        };        
    const _transformCharacter =  (char) => { 
            return  {
                id: char.id,
                description: char.description ? `${char.description.slice(0, 217)}...` : 'the character description is not provided',
                name: char.name, 
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,                                  
                homepage: char.urls[0].url,                
                wiki: char.urls[1].url,
                comics: char.comics.items
        }
    };
    const _transformComics = (comics) => {
            return {
                id: comics.id,
                description: comics.description || 'the comics description is not provided',
                title: comics.title, 
                pageCount: comics.pageCount ? `${comics.pageCount} p.`
				: "No information about the number of pages",
                thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
                language: comics.textObjects[0]?.language || "en-us",
			// optional chaining operator
                price: comics.prices[0].price ? comics.prices[0].price : "not available",
            };
        };
         
        return {loading, 
                error, 
                clearError, 
                process,
                setProcess,
                getAllCharacters, 
                getCharacter, 
                getAllComics, 
                getComic, 
                getCharacterName};
    } 
 
 export default useMarvelService;
