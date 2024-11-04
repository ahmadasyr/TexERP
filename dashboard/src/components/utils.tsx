export const fetchData = async (setRows: any, URI: string) => {
  try {
    const response = await fetch("http://localhost:3001/api" + URI);
    const data = await response.json();

    setRows(data);
  } catch (error) {
    console.error("Fetch error: ", error);
  }
};
