import { useMemo } from 'react';

import { initializeStore, RootState } from 'store';

export default function useStore(
    initialState?: RootState
): ReturnType<typeof initializeStore> {
    const store = useMemo(() => initializeStore(initialState), [initialState]);
    return store;
}
