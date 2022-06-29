import React from 'react';
import styled, { css } from 'styled-components';
import { urlToHttpOptions } from 'url';
import { useSelector } from '../../store';
import palette from '../../styles/palette';

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    border: 1px solid ${palette.gray_eb};
    padding: 0 11px;
    border-radius: 4px;
    outline: none;
    /* select 요소의 화살표 제거 */
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/selector_down_arrow.svg');
    background-position: right 11px center;
    background-repeat: no-repeat;
    font-size: 16px;

    background-color: #fff;
    &:focus {
      border-color: ${palette.Amaranth};
    }
  }
  ${({ isValid, validateMode }) =>
    validateMode &&
    css`
      select {
        border-color: ${isValid ? palette.dark_cyan : palette.tawny} !important;
        background-color: ${isValid ? '#fff' : palette.snow};
      }
    `}
`;

// options, values 를 optional로 설정 -> undefined도 올 수 있게 됨
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  disabledOptions?: string[];
  isValid: boolean;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  isValid,
  ...props
}) => {
  // 유효성 검사 모드인지 확인 (state.common)
  const validateMode = useSelector(state => state.common.validateMode);

  return (
    <Container isValid={isValid} validateMode={validateMode}>
      <select {...props}>
        {/* 기본값 -> disabled 처리되어 있음 */}
        {disabledOptions &&
          disabledOptions.map((option, index) => (
            <option key={index} value={option} disabled>
              {option}
            </option>
          ))}
        {/* selectable Options */}
        {options &&
          options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
      </select>
    </Container>
  );
};

export default React.memo(Selector);
