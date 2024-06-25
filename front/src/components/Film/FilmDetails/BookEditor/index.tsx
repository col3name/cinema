import React from "react";

import { useFetchBook } from "@/entities/film";

import styles from "./stylesBookEditor.module.css";

interface BookEditorProps {
  filmId: string;
  onClose: () => void;
}

const BookEditor: React.FC<BookEditorProps> = ({ filmId, onClose }) => {
  const { book, isLoading, nextPage, prevPage } = useFetchBook(filmId);

  return (
    <div>
      book editor
     
      <div>{book?.page}</div>
      <div>{JSON.stringify(book?.meta || {})}</div>
      <button onClick={prevPage}>prev]</button>
      <button onClick={nextPage}>next</button>
      { isLoading && (
        <div>Loading page</div>
      )}
      {/* { book && ( */}
        <div className={styles.bookEditorContainer}>
          <div className={styles.bookPage}>{book.text}</div>
          <div className={styles.bookPage}>{book.text2}</div>
        </div>
      {/* )} */}
      <button onClick={onClose}>X</button>
    </div>
  );
};

export default BookEditor;
