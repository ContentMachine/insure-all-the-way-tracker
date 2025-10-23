"use client";

import {
  LOCAL_STORAGE_AUTH_KEY,
  LOCAL_STORAGE_USER_ID,
} from "@/utilities/constants";

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  }
};

export const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_USER_ID);
  }
};
