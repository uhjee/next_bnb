import styled from 'styled-components';
import { urlToHttpOptions } from 'url';
import palette from '../../styles/palette';

const Container = styled.div`
  width: 100%;
  height: 46px;

  select {
    width: 100%;
    height: 100%;
    background-color: #fff;
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

    &:focus {
      border-color: ${palette.Amaranth};
    }
  }
`;

// options, values 를 optional로 설정 -> undefined도 올 수 있게 됨
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  value?: string;
  disabledOptions?: string[];
}

const Selector: React.FC<IProps> = ({
  options = [],
  disabledOptions = [],
  ...props
}) => {
  return (
    <Container>
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

export default Selector;
