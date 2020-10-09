import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "../redux/actions";
import axios, { AxiosPromise } from "axios";

type ApiRequest = ({
  url,
  method,
  body,
}: {
  url: any;
  method: string;
  body: any;
}) => any;

type DoRequest = () => AxiosPromise;
// type response = await axios[method](url, body);
// AxiosInstance.get<any, AxiosResponse<any>>(url: string, config?: AxiosRequestConfig | undefined): Promise<AxiosResponse<any>>

type callback = (err?: Error) => void;

export const useApiRequest: ApiRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState<any>([]);
  const dispatch = useDispatch();

  const doRequest: DoRequest = async () => {
    try {
      const response: any = await axios.post(url, body);
      return response.data;
    } catch (err) {
      setErrors(
        err.response.data.errors
        // <div className="alert alert-danger">
        //   <h4> Oopsy... </h4>
        //   <ul className="my-0">
        //     {err.response.data.errors.map((err: any) => (
        //       <li key={Math.random()}> {err.message} </li>
        //     ))}
        //   </ul>
        // </div>
      );
    }
  };

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  return { doRequest, errors };
};
