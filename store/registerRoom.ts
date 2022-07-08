import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * 방 등록하기 redux
 */

type RegisterRoomState = {
  largeBuildingTypes: string | null;
  buildingType: string | null;
  roomType: string | null;
  isSetUpForGuest: boolean | null;
};

// * 초기 상태
const initialState: RegisterRoomState = {
  largeBuildingTypes: null, // 건물 유형 큰 범주
  buildingType: null, // 건물 유형
  roomType: null, // 숙소 유형
  isSetUpForGuest: null, // 게스트만을 위해 만들어진 숙소인지 여부
};

const registerRoom = createSlice({
  name: 'registerRoom',
  initialState,
  reducers: {
    // 큰 범주 건물 유형 변경
    setLargeBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.largeBuildingTypes = null;
      }
      state.largeBuildingTypes = action.payload;
      return state;
    },
    // 기본 범주 건물 유형 변경
    setBuildingType(state, action: PayloadAction<string>) {
      if (action.payload === '') {
        state.buildingType = null;
      }
      state.buildingType = action.payload;
      return state;
    },
    // 숙소 유형 변경
    setRoomType(state, action: PayloadAction<'entire' | 'private' | 'public'>) {
      state.roomType = action.payload;
      return state;
    },
    // '게스트용 숙소인지' 변경하기
    setIsSetUpForGuest(state, action: PayloadAction<boolean>) {
      state.isSetUpForGuest = action.payload;
      return state;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
