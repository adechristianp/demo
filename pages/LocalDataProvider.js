import { useEffect } from "react";
import { selectState } from "../reducer/collection.slice";
import { useAppSelector } from "../reducer/hooks";

export default function LocalDataProvider(props) {
  const state = useAppSelector(selectState);

  useEffect(() => {
    localStorage.setItem('LOCAL_STATE', JSON.stringify(state));
  }, [state])

  return props.children;
}
