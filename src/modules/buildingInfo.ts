export const excludedBuildings = [
  '',
  'See',
  'ONLINE',
  //At UT Southwestern
  'CBH',
  'CD1',
  'CD2',
  //Collin County
  'CCTC',
  //All offices
  'SSB',
];
export const excludedRooms = [
  //Cannot find where this room is
  'Student Services Addition (SSA) SSA Green Room',
];

//TODO: add names and show in table and filters
const buildingNames = {
  SCI: 'Sciences',
  //...
};

export default buildingNames;

export const mapLinkOverrides: {
  [key: string]: string;
} = {
  'https://locator.utdallas.edu/BSB_10.687':
    'https://map.concept3d.com/?id=1772#!m/587102',
  'https://locator.utdallas.edu/CB_1.102':
    'https://map.concept3d.com/?id=1772#!m/533494',
  'https://locator.utdallas.edu/CB_1.106':
    'https://map.concept3d.com/?id=1772#!m/533493',
  'https://locator.utdallas.edu/CB_1.202':
    'https://map.concept3d.com/?id=1772#!m/533492',
  'https://locator.utdallas.edu/CB_1.206':
    'https://map.concept3d.com/?id=1772#!m/533491',
  'https://locator.utdallas.edu/CB_1.210':
    'https://map.concept3d.com/?id=1772#!m/533490',
  'https://locator.utdallas.edu/CB_1.214':
    'https://map.concept3d.com/?id=1772#!m/533489',
  'https://locator.utdallas.edu/CB_1.219':
    'https://map.concept3d.com/?id=1772#!m/533485',
  'https://locator.utdallas.edu/CB_1.222':
    'https://map.concept3d.com/?id=1772#!m/533487',
  'https://locator.utdallas.edu/CB_1.223':
    'https://map.concept3d.com/?id=1772#!m/533486',
  'https://locator.utdallas.edu/Outdoors SU Mall_Chess Plaza':
    'https://map.concept3d.com/?id=1772#!m/434592',
  'https://locator.utdallas.edu/Outdoors SU Mall_Entire SU Mall':
    'https://map.concept3d.com/?id=1772#!m/434591',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth F1':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth F2':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth F3':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth F4':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth W1':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth W1&W2':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Mall Booth W2':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/Outdoors SU Mall_SU Plinth':
    'https://map.concept3d.com/?id=1772#!m/434590',
  'https://locator.utdallas.edu/RHNW_1.001':
    'https://map.concept3d.com/?id=1772#!m/434477',
  'https://locator.utdallas.edu/RHNW_2.002':
    'https://map.concept3d.com/?id=1772#!m/434477',
  'https://locator.utdallas.edu/RHW_2.400':
    'https://map.concept3d.com/?id=1772#!m/434478',
  'https://locator.utdallas.edu/RHW_2.401':
    'https://map.concept3d.com/?id=1772#!m/434478',
  'https://locator.utdallas.edu/RHW_2.402':
    'https://map.concept3d.com/?id=1772#!m/434478',
  'https://locator.utdallas.edu/RHW_3.100':
    'https://map.concept3d.com/?id=1772#!m/434478',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA 12.471':
    'https://locator.utdallas.edu/SSA_12.471',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA 14.244':
    'https://locator.utdallas.edu/SSA_14.244',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA 14.245':
    'https://locator.utdallas.edu/SSA_14.245',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA 14.510':
    'https://locator.utdallas.edu/SSA_14.510',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA Auditorium':
    'https://locator.utdallas.edu/SSA_13.330',
  'https://locator.utdallas.edu/Student Services Addition (SSA)_SSA Gaming Wall Lounge':
    'https://locator.utdallas.edu/SSA_12.120',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room  (A & B)':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room  (A, B, & C)':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room  (B & C)':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room - A':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room - B':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Galaxy  Room - C':
    'https://locator.utdallas.edu/SU_2.602',
  'https://locator.utdallas.edu/Student Union_Lower Level Booth 1':
    'https://map.concept3d.com/?id=1772#!m/435268',
  'https://locator.utdallas.edu/Student Union_Lower Level Booth 2':
    'https://map.concept3d.com/?id=1772#!m/435268',
  'https://locator.utdallas.edu/Student Union_Lower Level Booth 3':
    'https://map.concept3d.com/?id=1772#!m/435268',
  'https://locator.utdallas.edu/Student Union_SU Artemis Hall (I & II)':
    'https://locator.utdallas.edu/SU_2.905A',
  'https://locator.utdallas.edu/Student Union_SU Artemis Hall I':
    'https://locator.utdallas.edu/SU_2.905A',
  'https://locator.utdallas.edu/Student Union_SU Artemis Hall II':
    'https://locator.utdallas.edu/SU_2.905B',
  'https://locator.utdallas.edu/Student Union_SU First Floor':
    'https://map.concept3d.com/?id=1772#!m/545124',
  'https://locator.utdallas.edu/Student Union_Upper Level Booth 1':
    'https://map.concept3d.com/?id=1772#!m/545124',
  'https://locator.utdallas.edu/Student Union_Upper Level Booth 2':
    'https://map.concept3d.com/?id=1772#!m/545124',
  'https://locator.utdallas.edu/Student Union_Upper Level Booth 3':
    'https://map.concept3d.com/?id=1772#!m/545124',
  'https://locator.utdallas.edu/Student Union_Upper Level Booth 4':
    'https://map.concept3d.com/?id=1772#!m/545124',
  'https://locator.utdallas.edu/TH_2.702':
    'https://locator.utdallas.edu/JO_2.702',
  'https://locator.utdallas.edu/VCB_1.201':
    'https://map.concept3d.com/?id=1772#!m/954137',
};
