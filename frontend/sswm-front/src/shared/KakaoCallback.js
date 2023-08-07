import axios from "axios"

const KakaoCallback  = ({REST_API_KEY,REDIRECT_URI}) => {
    const getCallBack=() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        console.log(code);
        axios.post(
            `https://localhost:8080/api/auth/kakao/signin`,
              {"code":code},
              { headers: {"Content-Type": "application/json; charset=utf-8"} }
          )
        .then((res) => { 
            console.log(res);
            
        })
        .catch((Error) => {
            console.log(Error)
        })
  
    };
    
    return(
        <>
            <button onClick={()=>getCallBack()}>버트느느느느는</button>
        </>
    )
}
export default KakaoCallback ;

/*
      axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
      .then((res) => {
          console.log(res);
          const { access_token } = res.data;
          axios.post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                  headers: {
                      Authorization: `Bearer ${access_token}`,
                      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                  }
              }
          )
          .then((res) => {
              console.log('2번쨰', res);
          })
      })
      .catch((Error) => {
          console.log(Error)
      })
*/