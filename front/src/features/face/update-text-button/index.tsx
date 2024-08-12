import React, {useCallback} from "react";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

import Button from "@/shared/ui/Button";

import {wordsKey} from "@/entities/race/const";

type UpdateTextButtonProps = {
    children?: React.ReactNode;
    onClick: VoidFunction;
}

export const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({
                                                               onClick,
                                                               children = undefined
                                                           }) => {
    const queryClient: QueryClient = useQueryClient();

    const onUpdateText = useCallback(async () => {
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
        onClick();
    }, [queryClient]);

    return (
        <Button onClick={onUpdateText}>update text{children && children}</Button>
    );
};
