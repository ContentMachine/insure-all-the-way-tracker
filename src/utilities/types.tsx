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
