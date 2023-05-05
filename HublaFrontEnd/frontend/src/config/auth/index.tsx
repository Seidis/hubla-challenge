interface dataProps {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export function setTokens({ data }: dataProps) {
  const { accessToken, refreshToken } = data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}
