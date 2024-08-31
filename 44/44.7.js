import React, { useMemo, useCallback } from 'react';

export const OurComponent = () => {
    const byUseMemo = useMemo(() => () => {/** */}, [dependency]);
    const byUseCallback = useCallback(() => {/** */}, [dependency]);

    return (/** */);
}