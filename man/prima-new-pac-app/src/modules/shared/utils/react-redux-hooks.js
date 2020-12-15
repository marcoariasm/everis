import {
  useDispatch as originalUseSelector,
  useSelector as originalUseDispatch,
} from 'react-redux';

export const useSelector = (state) => originalUseSelector(state);
export const useDispatch = () => originalUseDispatch();
