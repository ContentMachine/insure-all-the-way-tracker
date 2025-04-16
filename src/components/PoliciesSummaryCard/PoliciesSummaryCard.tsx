"use client";

import React from "react";
import ArrowRight from "@/assets/svgIcons/ArrowRight";
import {
  CardDecoration1,
  CardDecoration2,
} from "@/assets/svgIcons/PoliciesSummaryCardDecoration";
import { formatCurrency } from "@/helpers/formatAmount";
import classes from "./PoliciesSummaryCard.module.css";

type AmountDetailsCardTypes = {
  title: string;
  amount: number | string;
  cta?: {
    text: string;
    action: () => void;
  };
  notAmount?: boolean;
  backgroundColor?: string;
  noDecoration?: boolean;
};

const PoliciesSummaryCard = ({
  title,
  amount,
  cta,
  notAmount,
  backgroundColor,
  noDecoration,
}: AmountDetailsCardTypes) => {
  return (
    <div className={classes.container} style={{ backgroundColor }}>
      <div className={classes.overlay}></div>
      <span>{title}</span>
      <h2> {notAmount ? amount : `₦${formatCurrency(amount)}`}</h2>
      {cta && (
        <div>
          <span>{cta.text}</span>
          <button onClick={cta.action}>
            <ArrowRight />
          </button>
        </div>
      )}
      {!noDecoration && (
        <>
          <CardDecoration1 className={classes.decoration1} />
          <CardDecoration2 className={classes.decoration2} />
        </>
      )}
    </div>
  );
};

export default PoliciesSummaryCard;
