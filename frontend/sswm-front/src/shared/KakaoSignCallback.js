import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoSignCallback = () => {
  console.log("여긴 callback");

  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();

  const getCallBack = async () => {
    console.log(code);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/kakao/signin`,
        { code: code },
        {
          headers: { "Content-Type": "application/json; charset=utf-8" },
        }
      )
      .then((jwtToken) => {
        console.log(2, jwtToken.data);
        // 데이터를 저장할 때는 JSON.stringify()를 사용하여
        // JavaScript 객체를 JSON 형식의 문자열로 변환하여 저장해야 합니다.
        localStorage.setItem(
          "accessToken",
          JSON.stringify(jwtToken.data.accessToken)
        );
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(jwtToken.data.refreshToken)
        );
        console.log(JSON.parse(localStorage.getItem("accessToken")));
        console.log(JSON.parse(localStorage.getItem("refreshToken")));
        navigate("/SignUpName");
      })
      .catch((error) => {
        // 오류 처리
        if (error.response.status === 400) {
          alert("이미 가입한 유저입니다.");
          // 400 에러가 발생하면 Login 페이지로 이동
          navigate("/Login");
        } else {
          alert("회원가입에 실패했습니다.");
          navigate("/SignUp");
        }
      });
  };

  useEffect(() => {
    getCallBack();
    // eslint-disable-next-line
  }, []);

  return null;
};
export default KakaoSignCallback;