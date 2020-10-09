import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchProducts } from "../redux/actions";
import axios from "axios";

export function useApiRequest() {
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
}
