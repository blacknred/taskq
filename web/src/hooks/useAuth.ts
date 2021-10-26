import useSWR from "swr/immutable";
import { IAuth, IResponse } from "../typings";
import { HOST } from "../utils";

export default function useAuth() {
  const { data, mutate, error } = useSWR<IResponse<IAuth>>(
    `${HOST}auth`,
    null,
    {
      // refreshInterval: 10 * 60 * 1000,
      shouldRetryOnError: false,
      // revalidateIfStale: true,
      // revalidateOnFocus: true,
      // errorRetryCount: 0,
      // revalidateOnMount: false,
      onError: () => null,
      // errorRetryInterval: 10000,
      // fallbackData: {} as any,
    }
  );

  return {
    loading: !data && !error,
    // loggedOut: error && error.status === 403,
    session: data?.data,
    mutate,
  };
}
