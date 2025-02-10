import { stockStatus } from "@prisma/client";

export function barcodeGenerator(stockStatus: stockStatus) {
  switch (stockStatus) {
    case "RAW_QUALITY":
      return "HK";
    case "COVER_QUALITY":
      return "DK";
    case "DYE_QUALITY":
      return "BK";
    case "DYE_PRE_QUALITY":
      return "KB";
    case "PRE_CUT":
      return "KK";
    case "RAW_PRE_QUALITY":
      return "KH";
    case "LAMINATED_PRE_QUALITY":
      return "KB";
    case "LAMINATED_QUALITY":
      return "BK";
    default:
      return "";
  }
}
