const KakaoLogin = ({JS_KEY, REST_API_KEY, REDIRECT_URI}) => {
  const CLIENT_ID = REST_API_KEY;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

  return(
      <button onClick={() => window.location.href = kakaoURL}>카카오로그인</button>
  )
}

export default KakaoLogin;