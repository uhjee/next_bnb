import { FC, InputHTMLAttributes, memo } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from '../../store';
import palette from '../../styles/palette';
import WarningIcon from '../../public/static/svg/common/warning.svg';

const Container = styled.div<{ isValid: boolean; validateMode: boolean }>`
  .radio-label {
    font-size: 16px;
    font-weight: 600;
    color: ${palette.gray_76};
    margin-bottom: 32px;
  }
  .radio-list-wrapper {
    &:after {
      display: block;
      content: '';
      clear: both;
    }
  }
  label {
    float: left;
    margin-bottom: 24px;
    font-size: 16px;
    line-height: 1.2;
    cursor: pointer;
    clear: both;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input[type='radio'] {
    width: 16px;
    height: 16px;
    margin: 0 12px 0 0;
    position: relative;
    flex-shrink: 0;
    font-size: 16px;
    -webkit-appearance: none;
    border: 1px solid ${palette.gray_b0};
    border-radius: 50%;
    outline: none;
    cursor: pointer;

    ${({ validateMode, isValid }) => {
      if (validateMode) {
        if (!isValid) {
          return css`
            border-color: ${palette.tawny};
            background-color: ${palette.snow};
          `;
        }
        return css`
          border-color: ${palette.dark_cyan};
        `;
      }
      return undefined;
    }}
  }

  input[type='radio']:checked {
    background-color: ${palette.dark_cyan};
    border: 0;
  }

  input[type='radio']:checked:after {
    content: '';
    width: 6px;
    height: 6px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    border-radius: 50%;
    display: block;
  }

  .radio-description {
    display: block;
    margin-top: 5px;
    margin-left: 28px;
  }

  .radio-group-warning {
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

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 라디오 그룹에 대한 라벨
  value?: any; // 라디오가 비교해 같으면 true 반환할 값
  onChange?: (value: any) => void;
  options?: { label: string; value: any; description?: string }[]; // 하위 라디오
  isValid?: boolean;
  errorMessage?: string;
}

/**
 * [공통] 라디오 그룹 컴포넌트
 * @returns
 */
const RadioGroup: FC<IProps> = ({
  label,
  value,
  options = [],
  onChange,
  isValid,
  errorMessage = '옵션을 선택해주세요.',
}) => {
  // redux의 state
  const validateMode = useSelector(state => state.common.validateMode);

  return (
    <Container isValid={!!isValid} validateMode={validateMode}>
      <p className="radio-label">{label}</p>
      <div className="radio-list-wrapper">
        {options.map((option, index) => (
          <label key={index}>
            <input
              type="radio"
              checked={value === option.value}
              onChange={() => onChange && onChange(option.value)}
            />
            <span>
              {option.label}
              <span className="radio-description">{option.description}</span>
            </span>
          </label>
        ))}
      </div>
      {validateMode && !isValid && (
        <div className="radio-group-warning">
          <WarningIcon />
          <p>{errorMessage}</p>
        </div>
      )}
    </Container>
  );
};

export default memo(RadioGroup);
