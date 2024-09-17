
import "./mainComponent.css";
import YandexWeather from "./sites/yandex";
import { useState, useEffect } from 'react';
import { useHttp } from './hooks/http.hook';


const MainComponent = () => {
  const [dataBase, setDataBase] = useState();
  const { request, process, setProcess } = useHttp();

  useEffect(() => {
    content('http://81.90.180.43:3030/DB?secretKey=YaUseR');
    // 81.90.180.43:3030/DB?secretKey=YaUseR
    // eslint-disable-next-line
  }, []);
  const content = (url) => {
    request(url)
      .then(res => setDataBase(res))
      .then(setProcess('ready'))
      .then(console.log(dataBase));
     
  }

  if (process === 'waiting') {
    return <div>Запрос отправлен</div>
  }
  if (process === 'loading') {
    return <div>Загрузка данных</div>
  }
  return (
    <main>
     {dataBase ? <YandexWeather state={dataBase} /> : 'loading...'}
    </main>)
}
export default MainComponent;

