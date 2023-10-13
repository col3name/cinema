import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';

import FilmActions from '@/components/Film/FilmActions';

import styles from './stylesFilmDetails.module.css';

import { FilmInfoPropsType } from '@/types/types';
import {Film} from '@/api/api';

const FilmInfo: React.FC<FilmInfoPropsType> = ({
  className,
  film,
  countOnCart= 0,
}) => {
  return <div className={ cn(styles.filmInfo, className) }>
    <Image className={ styles.filmInfoSmallPoster } src={ film.posterUrl } alt='film poster' width={320} height={240} />
    <div className={ styles.filmContent }>
      <div>
        <Link href={ `/film/${ film.id }` }><h2>{ film.title }</h2></Link>
        <p>{ film.genre }</p>
      </div>
      { film && (
        <FilmActions
          film={ film as Film }
          needRemove={ countOnCart === undefined }
        />
      )}
    </div>
  </div>
}

export default React.memo(FilmInfo);
