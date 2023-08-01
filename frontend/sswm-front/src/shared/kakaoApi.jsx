import url from "./url";

const CLIENT_ID = url.CLIENT_ID;

const REDIRECT_URI = url.REDIRECT_URI;

export const KAKAO_AUTH_URL =
`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;