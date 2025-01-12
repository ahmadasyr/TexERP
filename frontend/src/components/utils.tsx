export const fetchData = async (setRows: any, URI: string) => {
  try {
    const response = await fetch("/api" + URI);
    const data = await response.json();

    setRows(data);
  } catch (error) {}
};
