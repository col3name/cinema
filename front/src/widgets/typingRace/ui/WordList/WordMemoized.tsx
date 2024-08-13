import React, {forwardRef, memo, useMemo} from "react";
import styles from "@/widgets/typingRace/client.module.css";

type WordMemoizedProps = {
    isActive: boolean;
    word: string;
    children: React.ReactNode;
    renderLetterList: (word: string, isActiveWord: boolean) => React.ReactNode;
    renderCaret: () => React.ReactNode;
};

export const WordMemoized: React.FC<WordMemoizedProps> = memo(forwardRef<HTMLDivElement, WordMemoizedProps>(function WordMemoized({
                                                                                                                               isActive,
                                                                                                                               word,
                                                                                                                               renderLetterList,
                                                                                                                               children,
                                                                                                                               renderCaret,
                                                                                                                           }, ref) {
        const renderLetterList1 = useMemo(() => renderLetterList(word, isActive), [renderLetterList, word, isActive]);
        return (
            <div
                // @ts-ignore
                ref={isActive ? ref : null}
                className={styles.word}
            >
                {renderLetterList1}
                {isActive && (
                    <>
                        {children}
                        {renderCaret()}
                    </>
                )}
            </div>
        );
    }), (prevProps, nextProps) =>
        prevProps.isActive === nextProps.isActive &&
        prevProps.word === nextProps.word &&
        prevProps.children === nextProps.children
);