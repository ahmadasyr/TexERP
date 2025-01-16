import {
  createProductType,
  deleteProductType,
  getAllProductTypes,
  getProductTypeById,
  updateProductType,
} from "../services/productTypeServices";

export const getAllProductTypesController = async (req: any, res: any) => {
  try {
    const productTypes = await getAllProductTypes();
    res.status(200).json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getProductTypeByIdController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const productType = await getProductTypeById(Number(id));
    if (productType) {
      res.status(200).json(productType);
    } else {
      res.status(404).json({ message: "Product type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createProductTypeController = async (req: any, res: any) => {
  const { name, needsCutting, specsGroup } = req.body;
  try {
    const productType = await createProductType({
      name,
      needsCutting,
      specsGroup,
    });
    res.status(201).json(productType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const updateProductTypeController = async (req: any, res: any) => {
  const { id } = req.params;
  const { name, needsCutting, specsGroup } = req.body;
  try {
    const productType = await updateProductType(Number(id), {
      name,
      needsCutting,
      specsGroup,
    });
    res.status(200).json(productType);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteProductTypeController = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    await deleteProductType(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
