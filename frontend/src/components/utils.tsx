export const fetchData = async (
  setRows: (data: any) => void,
  URI: string,
  retries = 10,
  interval = 5000
): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch("/api" + URI);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setRows(data); // Update rows with the fetched data
      return; // Exit the function if the fetch is successful
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `Fetch attempt ${attempt} failed. Retrying in ${interval}ms...`,
          error
        );
        await new Promise((resolve) => setTimeout(resolve, interval)); // Wait before retrying
      } else {
        setRows([]); // Clear rows if the fetch fails
      }
    }
  }
};
