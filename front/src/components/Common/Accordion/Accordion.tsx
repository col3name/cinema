'use client';

import React, {
} from 'react';

import AccordionItems from './AccordionItem';

import styles from './stylesAccordion.module.css';

interface AccordionItem {
  id: string | number;
  title: string,
  description: string,
}

interface AccordionPropsType {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionPropsType> = ({
  items,
}) => {
  // const [opened, setOpened] = useState<Record<string, boolean>>({});
  // const listContainerRef = useRef<HTMLUListElement>(null);
  // const mutationCb: MutationCallback = (list) => {
  //   const contentItem = (list[0].target.childNodes[1] as HTMLElement) ?? null;
  //   if (!contentItem) return;
  //   if (contentItem.className !== 'acc-content') return;
  //   const scrollHeight = contentItem.scrollHeight;
  //   contentItem.animate(
  //     { maxHeight: `${scrollHeight}px`, opacity: 1 },
  //     { duration: 100, easing: 'ease-in', fill: 'forwards' }
  //   );
  // };
  //
  // useEffect(() => {
  //   if (!listContainerRef.current) return;
  //   const observer = new MutationObserver(mutationCb);
  //   observer.observe(listContainerRef.current, {
  //     childList: true,
  //     subtree: true,
  //   });
  //
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);
  //
  // const closeAccordion = (id: string) => {
  //   const contentItem = document.getElementById(`acc-content-${ id }`);
  //   if (!contentItem) return;
  //   contentItem
  //     .animate(
  //       { maxHeight: 0, opacity: 0 },
  //       { duration: 100, easing: 'ease-out' }
  //     )
  //     .finished.then(() => {
  //     contentItem.style.display = 'none';
  //     setOpened((prv) => {
  //       const newObj = { ...prv };
  //       delete newObj[id];
  //       return newObj;
  //     });
  //   });
  // };
  //
  // const clickHandler = (e: MouseEvent | KeyboardEvent): void => {
  //   let element = e.target as HTMLElement;
  //
  //   if (element.parentElement?.tagName === 'LI') {
  //     element = element.parentElement;
  //   }
  //   if (element.tagName !== 'LI') return;
  //   const id = element.getAttribute('id');
  //   if (!id) return;
  //   const isOpen = opened[id];
  //   if (isOpen) {
  //     return closeAccordion(id);
  //   }
  //   setOpened((prv) => ({ ...prv, [id]: true }));
  //   if (!multiExpand) {
  //     const prvAccId = Object.keys(opened)[0];
  //     closeAccordion(prvAccId);
  //   }
  // };
  //
  // const ariaHandler = (e: KeyboardEvent) => {
  //   if (e.key === ' ' || e.key === 'Enter') {
  //     clickHandler(e);
  //     e.preventDefault();
  //   }
  // };

  return (
    <ul className={ styles.accordionContainer } role='list'>
      { items.map(({ id, ...data }) => (
        <AccordionItems
          id={ id }
          key={ id }
          title={ data.title }
          description={ data.description }
        />
      ))}
    </ul>
  );
};

export default Accordion;