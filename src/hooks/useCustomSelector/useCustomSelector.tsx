import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { StoreReducerStateTypes } from '@/store/store.types';

export const useCustomSelector: TypedUseSelectorHook<StoreReducerStateTypes> =
  useSelector;
