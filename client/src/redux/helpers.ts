import axios from 'axios';

interface IAxiosErrorData {
  data?: {
    message?: string;
  };
}

export const handleError = (error: unknown): string => {
  let errorMessage = 'An unknown error occurred';

  if (axios.isAxiosError(error) && error.response) {
    const customData = error.response.data as IAxiosErrorData;

    errorMessage = customData?.data?.message || error.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return errorMessage;
};
