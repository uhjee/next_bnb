import { useDispatch } from 'react-redux';
import { useSelector } from '../store';
import { commonActions } from '../store/common';

/**
 * store.state.common 의 validateMode 의 값과 해당 setter 반환
 *
 * @return  {[object]}  [return description]
 */
export default () => {
  const dispatch = useDispatch();
  const validateMode = useSelector(state => state.common.validateMode);

  const setValidateMode = (value: boolean) =>
    dispatch(commonActions.setValidateMode(value));

  return { validateMode, setValidateMode };
};
