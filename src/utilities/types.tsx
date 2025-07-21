export type modalGenericType = {
  [key: string]: boolean;
};

export type requestType = {
  isLoading: boolean;
  data: any;
  error: any;
  id?: string;
};

export type insuranceTypes = {
  title: string;
  route: string;
  descriptions: string[] | null;
  list: null | string[];
  image: string;
};

export type navItemTypes = {
  title: string;
  route?: string;
  isActive?: boolean;
  description?: string;
  id: string;
  isBordered?: boolean;
};

export type tableOptionsType = {
  text: string;
  action: (insuranceId?: string) => void;
};

export type policyType = {
  id: string;
  name: string;
  types: policySubtypeType[];
};

export type policySubtypeType = {
  id: string;
  plans: policySubTypePlansType[];
  name: string;
  features: string[];
  description: string;
  price: string;
};

export type policySubTypePlansType = {
  name: string;
  price: number;
  features: string[];
  description: string;
};

export type thirdPartyInsuranceFormTypes = userType & {
  product: string;
  registrationNumber: string;
  chasisNumber: string;
  vehicleColor: string;
  roadWorthiness: string;
  startDate: string;
  endDate: string;
  makeOfVehicle: string;
  yearOfMake: string;
  modelOfVehicle: string;
};

export type enhancedThirdPartyInsuranceFormTypes = userType & {
  makeOfVehicle: string;
  yearOfMake: string;
  modelOfVehicle: string;
  startDate: string;
  endDate: string;
  registrationNumber: string;
  engineNumber: string;
  chasisNumber: string;
  color: string;
  vehicleType: string;
  proofOfOwnership: null | File;
  plan: string;
  id: null | File;
  inspectionState: string;
  inspectionAddress: string;
  dateForInspection: string;
  contactName: string;
  contactPhone: string;
};

export type comprehensiveeFormDataTypes = userType & {
  registrationNumber: string;
  coverPeriod: string;
  vehicleValue: string;
  premium: string;
  address: string;
  startDate: string;
  endDate: string;
  makeOfVehicle: string;
  yearOfMake: string;
  modelOfVehicle: string;
  chasisNumber: string;
};

export type fleetFormDataTypes = userType & {
  propertyType: string;
  comment: string;
  startDate: string;
  endDate: string;
};

export type corporateFormDataType = userType & {
  nameOfOrganization: string;
  numberOfPeopleInOrganization: string;
  comments: string;
  startDate: string;
  endDate: string;
};

export type userType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  firstLogin?: string;
  address: string;
  state: string;
  _id: string;
  gender: string;
  occupation: string;
};

export type userPoliciesType = {
  chasisNumber: string;
  createdAt: string;
  endDate: string;
  insuranceType: string;
  plan: string;
  registrationNumber: string;
  roadWorthiness: string;
  startDate: string;
  user: string;
  _id: string;
  status: string;
  agent: "string";
  isTrackerInstalled?: boolean;
  gender: string;
  occupation: string;
};

export type claimsDataType = {
  dateAndTime: string;
  registrationNumber: string;
  location: string;
  narration: string;
};

export type allRiskDataTypes = userType & {
  deviceType: string;
  valueOfDevice: string;
  quantityOfDevice: string;
  premium: string;
  startDate: string;
  endDate: string;
};

export type buildingDataTypes = userType & {
  locationOfProperty: string;
  valueOfProperty: string;
  startDate: string;
  endDate: string;
};

export type queryObjectType = { [key: string]: string | number };

export type policyFormType = thirdPartyInsuranceFormTypes &
  comprehensiveeFormDataTypes;

export type loginDataRequestBody = {
  name: string;
  password: string;
  timeZoneSecond: number;
  lang: string;
};

export type ResponseType<T> = {
  message: string | undefined;
  description: string;
  code: string;
  success: boolean;
  data: T;
  status: number;
};

export type loginResponseType = {
  address: string;
  available: boolean;
  clientType: string;
  email: string;
  indexParentLink: string;
  joinTime: string;
  lang: string;
  linkMan: string;
  linkPhone: string;
  major: boolean;
  mapStatus: string;
  mobileNumbers: string;
  name: string;
  parentId: number;
  parentLink: string;
  postcode: string;
  rechargeURL: string;
  remark: string;
  subAlarm: boolean;
  timeScale: string;
  timeZoneSecond: number;
  token: string;
  updateTime: string;
  userId: string;
  userName: string;
  userType: number;
};

export type getUserRequestBodyType = {
  token: string;
  userId: string;
};

export type getUserVehicleRequestBodyType = {
  UserId: string;
  token?: string;
};

export type vehicleType = {
  activeTime: string;
  carId: number;
  carNO: string;
  carType: number;
  clientServiceStatus: number;
  deviceType: number;
  iccid: string;
  imei: string;
  joinTime: string;
  machineName: string;
  machineType: number;
  packVersion: number;
  password: string;
  platformTime: string;
  remark: string;
  serviceState: number;
  serviceTime: string;
  serviceTimeOrigin: string;
  simNO: string;
  updateTime: string;
  userId: number;
  isActive?: boolean;
};

export type vehicleStatusRequestBodyType = {
  carId: string;
  mapType: string;
  token?: string;
};

export type vehicleHistoryStatusRequestBodyType = {
  carId?: string;
  startTime: string;
  endTime?: string;
  token?: string;
};

export type carStatusType = {
  accStatus: number;
  accTime: number;
  alarm: string;
  carId: number;
  carPathPlanAlarmPopUpVos: [];
  dir: number;
  distance: number;
  duration: number;
  exData: string;
  gateType: string;
  heartTime: number;
  lat: number;
  latc: number;
  lon: number;
  lonc: number;
  machineType: number;
  online: number;
  orginalSpeed: number;
  pointTime: number;
  pointType: number;
  run: number;
  show: string;
  speed: number;
  staticTime: number;
  status: string;
};

export type carGroupType = {
  allCount: number;
  carGroupId: number;
  notActiveCount: number;
  offlineCount: number;
  onlineCount: number;
  userId: number;
};

export type vehicleDataWithStatus = {
  activeTime: string;
  carGroups: carGroupType[];
  carId: number;
  carNO: string;
  carStatus: carStatusType;
  carType: number;
  clientServiceStatus: number;
  deviceType: number;
  iccid: string;
  imei: string;
  joinTime: string;
  machineName: string;
  machineType: string;
  machineTypeAscription: string;
  overSpeedSwitch: boolean;
  overSpeedValue: number;
  packVersion: number;
  password: string;
  platformTime: string;
  remark: string;
  serviceState: string;
  serviceTime: string;
  serviceTimeOrigin: string;
  simNO: string;
  updateTime: string;
  userId: number;
  wireless: boolean;
  deviceName?: string;
  simCard?: string;
  model?: string;
  isActive?: string;
  lastActivityTime?: string;
};

export type vehicleHistoryType = {
  alarm: string;
  altitude: number;
  dir: number;
  exData: string;
  imei: string;
  isStop: boolean;
  lat: number;
  latc: number;
  lon: number;
  lonc: number;
  mileage: number;
  pointDt: string;
  pointType: number;
  remark: string;
  signalMile: number;
  speed: number;
  status: string;
  stopTime: number;
};

export type vehicleTableDataTyoe = {
  deviceName: string;
  simCard: string;
  model: string;
  isActive: string;
  lastActivityTime: string;
};

export type vehicleTableStatsType = {
  allDevices: number;
  offlineDevices: number;
  onlineDevices: number;
  expiredDevices: number;
};
