import Papa, { ParseConfig, ParseResult } from "papaparse";
import { useCallback, useEffect, useState } from "react";

const useReadCSV = <T,>(filePath: string, config?: ParseConfig<T>) => {
  const [values, setValues] = useState<T[]>();
  const getCSV = useCallback(async () => {
    try {
      Papa.parse(filePath, {
        ...config,
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (results: ParseResult<T>) => {
          setValues(results.data);
        },
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  useEffect(() => {
    getCSV();
  }, [getCSV]);

  return values;
};

export default useReadCSV;
