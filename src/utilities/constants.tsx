import moment from "moment";

export const LOCAL_STORAGE_AUTH_KEY = "iatw-auth-tracker-token";
export const LOCAL_STORAGE_USER_ID = "iatw-auth-tracker-userId";

export const TABLE_LENGTH = 5;

export const TODAY = moment().format("YYYY-MM-DD");
export const MAX_DATE_FILTER = moment()
  .subtract(14, "days")
  .format("YYYY-MM-DD");

export const GENDERS = ["male", "female", "prefer not to say"];

export const STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];
