// * 날짜 관련
// 1월부터 12월까지
export const monthList = Array.from(Array(12), (_, i) => String(i + 1));

// 1부터 31까지
export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

// 2020년부터 1900년까지
export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

// * 방 등록하기 관련
// 숙소 큰 범위의 건물 유형
export const largeBuildingTypeList = [
  '아파트',
  '주택',
  '별채',
  '독특한 숙소',
  'B&B',
  '부티크 호텔',
];

// 아파트 건물 유형
export const apartmentBuildingTypeList = [
  '아파트',
  '공동주택',
  '별채',
  '카사 파르티쿨라르',
  '로프트',
  '레지던스',
];

// 주택 건물 유형
export const houstBuildingTypeList = [
  '주택',
  '방갈로',
  '통나무집',
  '카사',
  '파르티쿨라르',
  '살레',
  '전원주택',
  '담무소',
  '돔하우스',
  '땅 속 집',
  '팬션',
  '저택',
];

// 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
  '게스트용 별채',
  '게스트 스위트',
  '농장 체험 숙박',
];

// 독특한 숙소 건물 유형
export const uniqueSpaceBuildingTypeList = [
  '헛간',
  '보트',
  '버스',
  '캠핑카',
  '캠핑장',
  '성',
  '땅 속 집',
  '오두막',
  '이글루',
  '섬',
  '등대',
  '풍차',
  '마차',
];

// B&B 건물 유형
export const bnbBuildingTypeList = [
  'B&B',
  '카사 파르티쿨라르',
  '농장 체험 숙박',
  '민수',
  '산장',
  '료칸',
];

// 부티크 호텔 건물 유형
export const boutiqueHotelBuildingTypeList = [
  '부티크 호텔',
  '아파트 호텔',
  '헤리티지 호텔',
  '호스텔',
  '호텔',
  '산장',
  '객잔',
];
