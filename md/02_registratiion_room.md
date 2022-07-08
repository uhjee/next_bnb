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

- 큰 범주 건물 유형 : `largeBuildingType`
- 기본 건물 유형: `buildingType`

components/register/RegisterRoomBuilding.tsx

- 큰 범주 selector 가 변경되면 작은 범주 selector의 options가 변경되어야 함

  - useMemo()를 통해 값을 기억하도록 처리

  - deps에는 largetBuildingType  세팅

    ```tsx
    // 선택된 건물 유형 options
      const detailBuildingOptions: [] = useMemo(() => {
        switch (largeBuildingType) {
          case '아파트':
            const { apartmentBuildingTypeList } = require('../../lib/staticData');
            dispatch(
              registerRoomActions.setBuildingType(apartmentBuildingTypeList[0]),
            );
            return apartmentBuildingTypeList;
          case '주택':
            const { houstBuildingTypeList } = require('../../lib/staticData');
            dispatch(registerRoomActions.setBuildingType(houstBuildingTypeList[0]));
            return houstBuildingTypeList;
          case '별채':
            const {
              secondaryUnitBuildingTypeList,
            } = require('../../lib/staticData');
            dispatch(
              registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0]),
            );
            return secondaryUnitBuildingTypeList;
          case '독특한 숙소':
            const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');
            dispatch(
              registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0]),
            );
            return uniqueSpaceBuildingTypeList;
          case 'B&B':
            const { bnbBuildingTypeList } = require('../../lib/staticData');
            dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
            return bnbBuildingTypeList;
          case '부티크 호텔':
            const {
              boutiqueHotelBuildingTypeList,
            } = require('../../lib/staticData');
            dispatch(
              registerRoomActions.setBuildingType(boutiqueHotelBuildingTypeList[0]),
            );
            return boutiqueHotelBuildingTypeList;
          default:
            return [];
        }
      }, [largeBuildingType]);

---

## 11.4 라디오 공통 컴포넌트

components/common/RadioGroup.tsx

- 다수의 라디오를 갖고 있는 그룹 컴포넌트

- interface는 `InputHTMLAttributes<HTMLInpuElement>` 를 상속

  ```tsx
  interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string; // 라디오 그룹에 대한 라벨
    value?: any; // 라디오가 비교해 같으면 true 반환할 값
    onChange?: (value: any) => void;
    options?: { label: string; value: any; description?: string }[]; // 하위 라디오
    isValid?: boolean;
    errorMessage?: string;
  }
  ```

  

---

## 11.5 숙소 유형 라디오 컴포넌트

- 집 전체 value = 'entire'
- 개인실  value = 'private'
- 다인실 value = 'public'



- 타입 단언 -> 이벤트 객체에서 value를 가져왔을 때, Typescript가 타입을 알 수 없으므로 힌트를 준다는 느낌으로 타입 단언

  ```tsx
    // 숙소 유형 change handler
    const onChangeRoomtType = (event: string) => {
      const selected = event;
      dispatch(
        registerRoomActions.setRoomType(
          selected as 'entire' | 'private' | 'public', // 타입 단언
        ),
      );
    };
  ```


---

## 11.6 숙소 등록하기 공통 footer

components/register/RegisterRoomFooter.tsx

- next, prev 버튼 존재
- next 버튼 클릭 시, 해당 화면 validation check
  - useValidateMode() 훅 사용

