import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';
import WaringIcon from '../../public/static/svg/common/warning.svg';

const NormalSelectorStyle = css`
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
`;

// 방 등록하기에서 쓰이는 selector
const RegisterSelectorStyle = css`
  width: 100%;
  label {
    position: relative;
  }
  span {
    display: block;
    font-size: 16px;
    color: ${palette.gray_76};
    font-weight: 600;
    margin-bottom: 8px;
  }
  select {
    width: 100%;
    height: 56px;
    border-radius: 8px;
    border: 1px solid ${palette.gray_b0};
    padding: 0 14px 0 12px;
    appearance: none;
    outline: none;
    -webkit-appearance: none;
    background-image: url('/static/svg/common/selector/register_selector_down_arrow.svg');
    background-position: right 14px center;
    background-repeat: no-repeat;
  }
`;

interface SelectorContainerProps {
  isValid: boolean;
  validateMode: boolean;
  type: 'register' | 'normal';
}

const Container = styled.div<SelectorContainerProps>`
  ${({ type }) => type === 'normal' && NormalSelectorStyle};
  ${({ type }) => type === 'register' && RegisterSelectorStyle};
  /* type에 따라 동적으로 css 구성 */

  select {
    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow}};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}
    &:disabled {
      background-image: url('/static/svg/common/selector/disable_register_selector_down_arrow.svg');
      background-color: ${palette.gray_f7};
      border-color: ${palette.gray_eb};
      color: ${palette.gray_eb};
      cursor: not-allowed;
    }
  }

  .selector-warning {
    margin-top: 8px;
    display: flex;
    align-items: center;

    svg {
      margin-right: 4px;
    }
    p {
      font-size: 12px;
      color: ${palette.davidson_orange};
    }
  }
`;

// options, values 를 optional로 설정 -> undefined도 올 수 있게 됨
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'normal';
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  label,
  options = [],
  isValid,
  useValidation = true,
  errorMessage = '옵션을 선택하세요.',
  type = 'normal',
  disabledOptions = [],
  ...props
}) => {
  // 유효성 검사 모드인지 확인 (state.common)
  const validateMode = useSelector(state => state.common.validateMode);

  return (
    <Container
      type={type}
      isValid={!!isValid}
      validateMode={useValidation && validateMode}
    >
      <label>
        {label && <span>{label}</span>}
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
      </label>
      {useValidation && validateMode && !isValid && (
        <div className="selector-warning">
          <WaringIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Selector);
