import {useEffect, useState} from "react";
import throttle from "lodash/throttle";

export const MAX_AUTO_SCROLL = 5;

export const useLoadOnScrollEnd = ()  => {
    const [page, setPage] = useState<number>(0);

    const handleScroll = throttle(() => {
        const { scrollTop, clientHeight, scrollHeight } =
            document.documentElement;
        if (page >= MAX_AUTO_SCROLL) {
            return;
        }
        if (scrollTop + clientHeight >= scrollHeight - 20) {
            setPage((prev) => prev + 1);
        }
    }, 300);

    useEffect(() => {
        window?.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window?.removeEventListener("scroll", handleScroll);
        };
    }, [page, handleScroll]);

    return {
        page,
        setPage,
    };
};