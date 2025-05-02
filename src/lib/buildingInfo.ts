//These are the same building so all JSOM rooms become SOM rooms
export const mergedBuildings: { [key: string]: string } = {
  JSOM: 'SOM',
};

export const excludedBuildings = [
  //API errors
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
  //All labs
  'ML1',
  'BE',
  //Merged
  ...Object.keys(mergedBuildings),
];
export const excludedRooms = [
  //Cannot find where this room is
  'Student Services Addition (SSA) SSA Green Room',
  //Labs on map
  'ECSN 3.108',
  'ECSN 3.110',
  'ECSN 3.112',
  'ECSN 3.114',
  'ECSN 3.118',
  'ECSN 3.120',
  'ECSW 2.315',
  'ECSW 2.335',
  'ECSW 3.315',
  'ECSW 3.325',
  'ECSW 3.335',
  'ECSW 4.315',
  'ECSW 4.335',
  'GR 3.206',
  'GR 3.402A',
  'GR 3.402B',
  'GR 3.602',
  'JO 1.206',
  'JO 1.216',
  //Not labs on map but checked and are locked labs
  'SCI 1.119',
  'SCI 1.129',
  'SCI 1.139',
  'SCI 1.159',
  'SCI 1.169',
  'SCI 1.179',
  'SCI 1.188',
  'SLC 1.205',
  'SLC 1.206',
  'SLC 1.211',
  'SLC 1.214',
  'SLC 2.206',
  'SLC 2.207',
  'SLC 2.215',
  'SLC 2.216',
  'SLC 3.202',
  'SLC 3.203',
  'SLC 3.210',
  'SLC 3.215',
  'SLC 3.216',
];

const buildingNames: { [key: string]: string } = {
  AB: 'AB (Activity Center)',
  AD: 'AD (Administration Building)',
  BE: 'BE (Berkner Hall)',
  BSB: 'BSB (Bioengineering Sciences Building)',
  CR: 'CR (Callier Center Richardson)',
  CRA: 'CRA (Callier Center Richardson Addition)',
  GR: 'GR (Cecil H. Green Hall)',
  CB: 'CB (Classroom Building)',
  DGA: 'DGA (Davidson-Gundy Alumni Center)',
  APC1: "APC1 (Edith and Peter O'Donnell Jr. Athenaeum)",
  ATC: "ATC (Edith O'Donnell Arts and Technology Building)",
  ECSN: 'ECSN (Engineering and Computer Science North)',
  ECSS: 'ECSS (Engineering and Computer Science South)',
  ECSW: 'ECSW (Engineering and Computer Science West)',
  SG: 'SG (Environmental Health and Safety Building)',
  JO: 'JO (Erik Jonsson Academic Center)',
  MC: 'MC (Eugene McDermott Library)',
  FA: 'FA (Founders Annex)',
  FO: 'FO (Founders Building)',
  FN: 'FN (Founders North)',
  HH: 'HH (Hoblitzelle Hall)',
  ML1: 'ML1 (Modular Lab 1)',
  ML2: 'ML2 (Modular Lab 2)',
  RL: 'RL (Natural Science and Engineering Research Lab)',
  SOM: 'JSOM (Naveen Jindal School of Management)',
  NL: 'NL (North Lab)',
  PHA: 'PHA (Physics Annex)',
  PHY: 'PHY (Physics Building)',
  RHNW: 'RHNW (Residence Hall North West)',
  RHW: 'RHW (Residence Hall West)',
  ROC: 'ROC (Research Operations Center)',
  ROW: 'ROW (Research and Operations Center West)',
  SLC: 'SLC (Science Learning Center)',
  SCI: 'SCI (Sciences Building)',
  'Student Services Addition (SSA)': 'SSA (Student Services Addition)',
  'Student Union': 'SU (Student Union)',
  SPN: 'SPN (Synergy Park North)',
  SP2: 'SP2 (Synergy Park North 2)',
  TH: 'TH (University Theatre)',
  VCB: 'VCB (Visitor Center and University Bookstore)',
};

export default buildingNames;

//Map doesn't recognize these buildings
export const buildingMapLinkOverrides: {
  [key: string]: string;
} = {
  SOM: 'JSOM',
  TH: 'JO',
};

//Override specific room links
export const mapLinkOverrides: {
  [key: string]: string;
} = {
  'https://locator.utdallas.edu/ATC_1.910':
    'https://map.concept3d.com/?id=1772#!m/541788',
  'https://locator.utdallas.edu/ATC_2.705E':
    'https://map.concept3d.com/?id=1772#!m/579843',
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
  'https://locator.utdallas.edu/VCB_1.201':
    'https://map.concept3d.com/?id=1772#!m/954137',
  'https://locator.utdallas.edu/SCI_Atrium':
    'https://map.concept3d.com/?id=1772#!ce/52360?ct/42147,52360?m/510259?s/Sciences%20Building',
  'https://locator.utdallas.edu/SCI_Awning Area':
    'https://map.concept3d.com/?id=1772#!ce/52360?ct/42147,52360?m/510259?s/Sciences%20Building',
  'https://locator.utdallas.edu/SCI_Courtyard':
    'https://map.concept3d.com/?id=1772#!ce/52360?ct/42147,52360?m/510259?s/Sciences%20Building',
  'https://locator.utdallas.edu/ATC_2.908':
    'https://map.concept3d.com/?id=1772#!ce/42138?m/530477?s/ATC%202.908',
  'https://locator.utdallas.edu/ATC_3.805':
    'https://map.concept3d.com/?id=1772#!ce/42138?m/541848?s/ATC%203.805',
  'https://locator.utdallas.edu/FN_2.102':
    'https://map.concept3d.com/?id=1772#!m/533592?s/FN%202.102',
  'https://locator.utdallas.edu/SLC_1.206':
    'https://map.concept3d.com/?id=1772#!ce/43194?m/1023820?s/SLC%201.206',
  'https://locator.utdallas.edu/SPN_1.221':
    'https://map.concept3d.com/?id=1772#!ce/43194?m/550498?s/SPN%201.221',
  'https://locator.utdallas.edu/ATC_1.801A':
    'https://map.concept3d.com/?id=1772#!ce/43194?m/541763?s/ATC%201.801',
};
