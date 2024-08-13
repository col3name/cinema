import React, {useCallback} from "react";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

import Button from "@/shared/ui/Button";

import {wordsKey} from "@/entities/race/const";

type UpdateTextButtonProps = {
    onClick?: VoidFunction;
}

export const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({
                                                                      onClick,
                                                                  }) => {
    const queryClient: QueryClient = useQueryClient();

    const onUpdateText = useCallback(async () => {
        onClick?.();
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
    }, [onClick, queryClient]);

    return (
        <Button onClick={onUpdateText}>update text</Button>
    );
};
