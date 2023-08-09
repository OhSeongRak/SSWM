import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLoginCallback = () => {
  console.log("여긴 callback");

  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();

  const getCallBack = async () => {
    console.log(code);
    axios
      .post(
        "/api/auth/kakao/login",
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
        // navigate("/StudyRoom");
        window.location.replace("/StudyRoom");
      })
      .catch((error) => {
        alert("회원정보가 존재 하지 않습니다.");
        navigate("/Login");
      });
  };

  useEffect(() => {
    getCallBack();
    // eslint-disable-next-line
  }, []);

  return null;
};
export default KakaoLoginCallback;
