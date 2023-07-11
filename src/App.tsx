import { useState, useRef } from 'react';

import { getDate } from './utils/getDate';

const api = {
  key: '63d2b57a200d513071b854d6f771d9f6',
  url: 'https://api.openweathermap.org/data/2.5/',
};

const App: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userInput = inputRef.current?.value;
    fetch(`${api.url}weather?q=${userInput}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject(res);
        }
      })
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(weather);
    inputRef.current!.value = '';
  };

  let classes = 'App';
  if (weather && weather.main.temp > 25) {
    classes += ' hot';
  }
  if (weather && weather.main.temp < 10) {
    classes += ' cold';
  }

  return (
    <div className={classes}>
      <main>
        <form className='search-box' onSubmit={submitSearch}>
          <input
            ref={inputRef}
            type='text'
            className='search-bar'
            placeholder='Search...'
          />
        </form>
        {weather && (
          <>
            <div className='info-box'>
              <p className='location'>
                {weather.name}, {weather.sys.country}
              </p>
              <p className='date'>{getDate(new Date())}</p>
            </div>
            <div className='weather-box'>
              <p className='temperature'>{Math.round(weather.main.temp)}°C</p>
              <p className='weather'>{weather.weather[0].main}</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default App;
