import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { largeBuildingTypeList } from '../../lib/staticData';
import { useSelector } from '../../store';
import { registerRoomActions } from '../../store/registerRoom';
import palette from '../../styles/palette';
import Selector from '../common/Selector';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }

  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
`;

const disabledLargerBuildingTypeOptions = ['하나를 선택해주세요.'];

interface RegisterRoomBuildingProps {}

const RegisterRoomBuilding: FC<RegisterRoomBuildingProps> = () => {
  const largeBuildingType = useSelector(
    state => state.registerRoom.largeBuildingTypes,
  );

  const dispatch = useDispatch();

  // 큰 범주 건물 change Handler
  const onChangeLargeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    // redux 변경
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className="register-room-building-selector-wrapper">
        <Selector
          type="register"
          value={largeBuildingType || undefined}
          defaultValue="하나를 선택해주세요."
          disabledOptions={disabledLargerBuildingTypeOptions}
          label="우선 범위를 좁혀볼까요?"
          options={largeBuildingTypeList}
          onChange={onChangeLargeBuildingType}
        />
      </div>
    </Container>
  );
};

export default RegisterRoomBuilding;
