import React, { useState, useEffect } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeatureMovie';
import Header from './components/header';

export default () => {
  const [movielist, setMovieList] = useState([]);
  const [featuredData, setFeaturedMovie] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.florr(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, ' tv');

      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(() =>{
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      }else{
        setBlackHeader(false);

      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">
      
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />
      }
      <section className='lists'>
        {movielist.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
        </section>

        <footer>

        </footer>

        {MovieList.length <= 0 && 
     < div className="loading">
       <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt='Carregando'/>

       </div>

       }
       </div>

  )

      }