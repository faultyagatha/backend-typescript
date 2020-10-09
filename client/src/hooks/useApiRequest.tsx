import React, { useState } from "react";
import axios, { AxiosPromise } from "axios";

type callback = (err?: Error) => void;
type ApiRequest = ({
  url,
  method,
  body,
}: {
  url: any;
  method: string;
  body: any;
  onSuccess?: callback;
}) => any;

type DoRequest = () => AxiosPromise;
// type response = await axios[method](url, body);
// AxiosInstance.get<any, AxiosResponse<any>>(url: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>>

export const useApiRequest: ApiRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState<any>(null);

  const doRequest: DoRequest = async () => {
    try {
      //clean up error notification before each new req
      setErrors(null);
      const response: any = await axios.post(url, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    } catch (err) {
      // TODO: check why errors remain on place after I resubmit + why I can't resubmit
      setErrors(
        <div className="alert alert-danger">
          <h4> Oopsy...something went wrong </h4>
          <ul className="my-0">
            {err.response.data.errors}
            {/* {err.response.data.errors.map((err: any) => (
              <li key={Math.random()}> {err.message} </li>
            ))} */}
          </ul>
        </div>
      );
    }
  };
  return { doRequest, errors };
};
