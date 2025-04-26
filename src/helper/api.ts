export const arr = [];
export const GOOGLE_MAP_API = "AIzaSyB2k_2Wcx9y7qjIg2M9OWZOuDpzwmeHNVU";
export const CAR_ICON_SVG =
  "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
// import axios, {
//   AxiosError,
//   AxiosRequestConfig,
//   AxiosRequestHeaders,
//   AxiosResponse,
// } from "axios";
// import { setAuthUser } from "../redux/actions/auth";
// import { AppThunkDispatch, RootState } from "../redux/types";
// // import { urlRegex } from "./regex";
// // import { getFormData } from './utility';

// const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

// export interface IApiParam {
//   path?: AxiosRequestConfig["url"];
//   method?: AxiosRequestConfig["method"];
//   data?: AxiosRequestConfig["data"];
//   params?: AxiosRequestConfig["params"];
//   cancelToken?: AxiosRequestConfig["cancelToken"];
//   onUploadProgress?: AxiosRequestConfig["onUploadProgress"];
//   onDownloadProgress?: AxiosRequestConfig["onDownloadProgress"];
//   headers?: AxiosRequestConfig["headers"];
//   responseType?:
//     | "arraybuffer"
//     | "document"
//     | "json"
//     | "text"
//     | "stream"
//     | "blob";
// }

// export const apiCall = (
//   params: IApiParam & { [key in string]: any },
//   onSuccess?: Function,
//   onFailure?: Function
// ) =>
//   new Promise<AxiosResponse["data"]>((resolve, reject) => {
//     if (params.method?.toUpperCase() == "POST") {
//       if (!params.data) params.data = {};

//       if (!(params.data instanceof FormData)) {
//         // params.data = getFormData(params.data);
//       }
//     }

//     if (params.method === "GET" || !params.method) {
//       params.params = Object.assign({}, params.params);
//     }

//     const requestingObject: AxiosRequestConfig = {
//       url: getURL(params),
//       headers: params.headers,
//       method: params.method ? params.method : "GET",
//       data: params.data || undefined,
//       params: params.params ? params.params : undefined,
//       responseType: params.responseType || "json",
//     };

//     if (params.cancelToken)
//       // injecting the cancel token
//       requestingObject.cancelToken = params.cancelToken;

//     if (params.onUploadProgress)
//       requestingObject.onUploadProgress = params.onUploadProgress;

//     if (params.onDownloadProgress)
//       requestingObject.onDownloadProgress = params.onDownloadProgress;

//     return axios(requestingObject)
//       .then((response: AxiosResponse) => {
//         // OnSuccess common validations

//         if (response.data instanceof Blob) {
//           response.data = new File(
//             [response.data],
//             params.path?.substring(params.path?.lastIndexOf("/") + 1) || "",
//             {
//               type: response.headers["content-type"],
//             }
//           );
//         }

//         if (onSuccess) onSuccess(response.data, params);
//         else ////////////console.loglog("onSuccess", requestingObject.url, response.data);
//         resolve(response.data);
//       })
//       .catch((err: AxiosError) => {
//         // onFailure common validations
//         if (onFailure) onFailure(err, params);
//         else
//           ////////////console.loglog(
//             "onFailure",
//             requestingObject.url,
//             err,
//             err.response?.data
//           );
//         reject(err);
//       });
//   });

// export const dispatchAPI =
//   (
//     params: IApiParam & { [key in string]: any },
//     onSuccess?: Function,
//     onFailure?: Function
//   ) =>
//   (dispatch: AppThunkDispatch, getState: () => RootState) => {
//     params.headers = dispatch(getHeaders(params));

//     return apiCall(params)
//       .then((response: any) => {
//         if (onSuccess) dispatch(onSuccess(response, params));
//         return response;
//       })
//       .catch((e: AxiosError) => {
//         if (e.response?.status == 401) {
//           dispatch(setAuthUser(null));
//         }
//         if (onFailure) dispatch(onFailure(e, params));
//         throw e;
//       });
//   };

// const getURL = (params: IApiParam) => {
//   if (params.path) {
//     // if (urlRegex.test(params.path)) {
//     //   return params.path;
//     // }
//     return `${API_URL}/${params.path}`;
//   } else throw new Error("Path is undefined");
// };

// const getHeaders =
//   (params: IApiParam) =>
//   (dispatch: AppThunkDispatch, getState: () => RootState) => {
//     // if (urlRegex.test(params.path || "")) return {};
//     // const access_token = getState().auth.user?.user_token
//     const access_token = "";
//     const a: AxiosRequestHeaders = {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     };

//     if (access_token) {
//       a["token"] = `${access_token}`;
//     }

//     if (Object.keys(a).length > 0) return a;
//     return undefined;
//   };
