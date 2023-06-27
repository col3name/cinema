import React from 'react';

import cn from 'classnames';

import FilmActions from '@/components/Film/FilmActions';

import styles from './stylesFilmDetails.module.css';

import { FilmInfoPropsType } from '@/types/types';
import Link from "next/link";

const FilmInfo: React.FC<FilmInfoPropsType> = ({
  className,
  film,
  countOnCart= 0,
}) => {
  return <div className={ cn(styles.filmInfo, className) }>
    <img className={ styles.filmInfoSmallPoster } src={ film.posterUrl } alt='film poster' />
    <div className={ styles.filmContent }>
      <div>
        <Link href={ `/film/${ film.id }` }><h2>{ film.title }</h2></Link>
        <p>{ film.genre }</p>
      </div>
      <FilmActions
        film={ film }
        countOnCart={ countOnCart! }
      />
    </div>
  </div>
}

export default FilmInfo;
