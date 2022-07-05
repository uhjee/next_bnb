## Chapter 11 숙소 등록하기 RegisterRoom

### 도메인 이해

- **숙소 등록하기**는 여러 페이지에 걸쳐 진행 => 따라서 **전역 상태 관리** 필요(redux)
- 숙소 등록에 필요한 값들 (11단계)
  1. 숙소: 집 종류, 건물 유형, 숙소 유형, 게스트용 확인
  2. 침대: 최대 숙박 인원, 침대 개수, 침대 유형 별 개수
  3. 욕실: 욕실 수, 공용 욕실 확인
  4. 위치: 숙소 위치, 국가/지역, 시/도, 시/군/구, 도로명 주소, 동호수, 우편 번호
  5. 제공하는 편의 시설들
  6. 제공하는 공용 공간들
  7. 숙소 사진
  8. 설명
  9. 제목
  10. 요금
  11. 날짜

---

## 🏠 11.1 숙소 등록하기 리덕스 설정

store/registerRoom.ts

store/registerRoom.ts

- 방 등록하기 리덕스 추가

pages/room/register/building.tsx

```tsx
import { NextPage } from 'next';

const building: NextPage = () => {
  return <RegisterRoombuilding />;
};

export default building;

```

- 페이지를 담당하기 때문에 `NextPage` 타입 사용

---

## 🏠 11.2 공통 셀렉트 컴포넌트에 ''숙소 등록하기'' UI 추가

- props에 `type` 추가

```tsx
interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options?: string[];
  value?: string;
  isValid: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  type?: 'register' | 'normal';
  disabledOptions?: string[];
}
```

- `type` 에 따라 selector css 분기처리

```tsx
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
  /* type에 따라 동적으로 css 구성 */
  ${({ type }) => type === 'normal' && NormalSelectorStyle};
  ${({ type }) => type === 'register' && RegisterSelectorStyle};

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
```

---

## 🏠 11.3 건물 유형 셀렉터

components/register/RegisterRoomBuilding.tsx

```tsx
const RegisterRoomBuilding: FC<RegisterRoomBuildingProps> = () => {
  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value="하나를 선택해주세요."
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledLargerBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={() => {}}
        />
      </div>
    </Container>
  );
};
```

