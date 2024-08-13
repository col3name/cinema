import React, {useCallback} from "react";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

import Button from "@/shared/ui/Button";

import {useAppDispatch} from "@/shared/redux/hooks";
import {restartRacing} from "@/entities/typeRacing/slice";
import {wordsKey} from "@/entities/typeRacing/const";

type UpdateTextButtonProps = {
    onClick?: VoidFunction;
}

const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({
                                                                      onClick,
                                                                  }) => {
    const queryClient: QueryClient = useQueryClient();
    const dispatch = useAppDispatch();

    const onUpdateText = useCallback(async (e: any) => {
        e.stopPropagation();
        e.target.blur()
        onClick?.();

        dispatch(restartRacing());
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
    }, [onClick, dispatch, queryClient]);

    return (
        <Button onClick={onUpdateText}>update text</Button>
    );
};


export const UpdateTextButtonMemo = React.memo(UpdateTextButton);