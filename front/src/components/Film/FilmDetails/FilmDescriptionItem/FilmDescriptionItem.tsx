import React from "react";
import cn from "classnames";

import Paragraph from "@/components/Common/Paragraph";

import styles from "../stylesFilmDetail.module.css";

export type FilmDescriptionItemPropsType = {
  className?: string;
  title: string;
  description?: string | number;
};

const FilmDescriptionItem: React.FC<FilmDescriptionItemPropsType> = ({
  className,
  title,
  description,
}) => {
  return (
    <div className={cn(className)}>
      <Paragraph>
        <span className={styles.filmDescriptionHeader}>{title}</span>
        {description && description}
      </Paragraph>
    </div>
  );
};

export default FilmDescriptionItem;
