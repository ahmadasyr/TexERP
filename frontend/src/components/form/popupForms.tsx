import React from "react";
// import Customer from "../../app/customer/form/page";
import Bank from "../../app/bank/form/page";
import Customer from "@/app/customer/form/page";
import TaxOffice from "@/app/tax-office/form/page";
import Product from "@/app/product/form/page";
import OutsourceGroup from "@/app/outsource-group/form/page";
interface PopupFormsProps {
  parsedString: string;
  popupHandler: (data: any) => void;
  popupSetter: (data: any) => void;
}

const PopupForms: React.FC<any> = ({
  parsedString,
  popupHandler,
  popupSetter,
}: PopupFormsProps) => {
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
        return (
          <Product popupSetter={popupSetter} popupHandler={popupHandler} />
        );
      case "outsource-group":
        return (
          <OutsourceGroup
            popupSetter={popupSetter}
            popupHandler={popupHandler}
          />
        );
      default:
        return <>No form found for {content}</>;
    }
  };

  return <div>{renderContent(parsedString)}</div>;
};

export default PopupForms;
