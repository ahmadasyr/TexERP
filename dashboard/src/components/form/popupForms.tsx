import React from "react";
// import Customer from "../../app/customer/form/page";
import Bank from "../../app/bank/form/page";
import Customer from "@/app/customer/form/page";
import TaxOffice from "@/app/tax-office/form/page";
import Page from "@/app/product/form/page";

interface PopupFormsProps {
  parsedString: string;
  popupHandler?: (data: any) => void;
  popupSetter?: (data: any) => void;
}

const PopupForms: React.FC<PopupFormsProps> = ({
  parsedString,
  popupHandler,
  popupSetter,
}) => {
  const renderContent = (content: string) => {
    switch (content) {
      case "bank":
        return <Bank popupSetter={popupSetter} popupHandler={popupHandler} />;
      case "customer":
        return (
          <Customer popupSetter={popupSetter} popupHandler={popupHandler} />
        );
      case "tax-office":
        return (
          <TaxOffice popupSetter={popupSetter} popupHandler={popupHandler} />
        );
      case "product":
        return <Page popupSetter={popupSetter} popupHandler={popupHandler} />;
      default:
        return <>No form found for {content}</>;
    }
  };

  return <div>{renderContent(parsedString)}</div>;
};

export default PopupForms;
