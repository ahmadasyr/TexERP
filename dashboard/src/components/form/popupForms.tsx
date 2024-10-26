import React from "react";
// import Customer from "../../app/customer/form/page";
import Bank from "../../app/bank/form/page";
import Customer from "@/app/customer/form/page";

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
  console.log(parsedString);
  const renderContent = (content: string) => {
    switch (content) {
      case "bank":
        return <Bank popupSetter={popupSetter} popupHandler={popupHandler} />;
      case "customer":
        return (
          <Customer popupSetter={popupSetter} popupHandler={popupHandler} />
        );
      default:
        return <>EMPTY</>;
    }
  };

  return <div>{renderContent(parsedString)}</div>;
};

export default PopupForms;
