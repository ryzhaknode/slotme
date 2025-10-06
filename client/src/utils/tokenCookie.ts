const ACCESS_COOKIE_NAME = 'slotme_access_token';

export const setAccessTokenCookie = (token: string, minutes = 15) => {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${ACCESS_COOKIE_NAME}=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax`;
};

export const clearAccessTokenCookie = () => {
  document.cookie = `${ACCESS_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
};

export const getAccessTokenFromCookie = (): string | null => {
  const name = `${ACCESS_COOKIE_NAME}=`;
  const parts = document.cookie.split(';');
  for (let part of parts) {
    const p = part.trim();
    if (p.startsWith(name)) return decodeURIComponent(p.substring(name.length));
  }
  return null;
};


