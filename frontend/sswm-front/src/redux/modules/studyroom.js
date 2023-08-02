// // 초기 상태값(state) => const [sate, setState] = useState(0)
// const initialState = {
//   personnel: 1,
//   resttime: 90,
// };

// const studyroom = (state = initialState, action) => {
//   switch (action.type) {
//     case "PERSON_PLUS_ONE":
//       if (state.personnel < 9) {
//         return {
//           ...state,
//           // Reducer는 전체 state를 하나로 반환
//           // ...state로 이 액션과 상관없는 state값들을 보존
//           personnel: state.personnel + 1,
//         };
//       } else {
//         return state;
//       }
//     case "PERSON_MINUS_ONE":
//       if (state.personnel > 1) {
//         return {
//           ...state,
//           personnel: state.personnel - 1,
//         };
//       } else {
//         return state;
//       }
//     case "REST_PLUS_TEN":
//       if (state.resttime < 240) {
//         return {
//           ...state,
//           resttime: state.resttime + 10,
//         };
//       } else {
//         return state;
//       }
//     case "REST_MINUS_TEN":
//       if (state.resttime > 90) {
//         return {
//           ...state,
//           resttime: state.resttime - 10,
//         };
//       } else {
//         return state;
//       }
//     default:
//       return state;
//   }
// };

// export default studyroom;
