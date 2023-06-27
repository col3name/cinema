import React from "react";

import Paragraph from "@/components/Common/Paragraph/Paragraph";

import styles from '../stylesFilmDetail.module.css';

export type FilmDescriptionItemPropsType = {
  title: string,
  description?: string | number,
}

const FilmDescriptionItem: React.FC<FilmDescriptionItemPropsType> = ({
  title,
  description,
}) => {
  return <div className={ styles}>
    <Paragraph>
      <span className={ styles.filmDescriptionHeader }>{ title }</span>
      { description && description }
    </Paragraph>
  </div>
}

export default FilmDescriptionItem;