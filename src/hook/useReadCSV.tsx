import Papa, { ParseResult } from "papaparse";
import { useCallback, useEffect, useState } from "react";

const useReadCSV = (file: string) => {
  const [values, setValues] = useState<any>();
  console.log('hook');
  

  const getCSV = useCallback(() => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      delimiter: ",",
      complete: (results: ParseResult<any>) => {
        // onDataParsed(results.data);
        console.log('complete', results);
        
        setValues(results);
      },
    });
  }, [file]);

  useEffect(() => {
    getCSV();
  }, [getCSV])

  return values;
};

export default useReadCSV;
