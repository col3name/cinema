"use client";
import React from "react";

import Layout from "@/shared/ui/Layout";
import PageContent from "@/shared/ui/PageContent";
import Accordion from "@/shared/ui/Accordion";

const faqList = [
  {
    id: 1,
    title: "Что такое Билетопоиск?",
    description:
      "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
  },
  {
    id: 2,
    title: "Как купить билет на Билетопоиск?",
    description:
      "Перейдите на официальный сайт Билетопоиска, выберите место отправления и назначения, дату поездки, заполните пассажирскую информацию и выполните оплату.",
  },
  {
    id: 3,
    title: "Как оставить отзыв на Билетопоиск?",
    description:
      'Чтобы оставить отзыв на Билетопоиск, зайдите на их сайт, найдите раздел "Отзывы" или "Оценки", выберите соответствующую функцию, заполните форму с вашим отзывом и оценкой, и отправьте.',
  },
];
const FAQ = () => {
  return (
    <Layout>
      <PageContent>
        <Accordion items={faqList} />
        <Accordion items={faqList} />
      </PageContent>
    </Layout>
  );
};

export default FAQ;
