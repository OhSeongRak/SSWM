// 초기 상태값(state) => const [sate, setState] = useState(0)
const initialState = {
  level: 0,
  studyMin: 0,
  restMin: 0,
  stretchScore: 0,
  default_seed: 
    {
      name: "",
      level: 1,
      exp: 0,
    }
};

// counter 리듀서 : 'state에 변화를 일으키는' 함수
// =>  state를 action의 type에 따라 변경하는 함수

// input : state와 action(type,value = state를 어떻게 사용할건지 action을 정함)
const profile = (state = initialState, action) => {
  switch (action.type) {
    case "LEVEL_PLUS_ONE":
      return{
        level: state.level + 1,
      };
    case "CREATE_SEED":
      return{
        default_seed: state.default_seed
      }
    default:
      return state; //변경 사항 state가 있으면 변경된 값 return
  }
};

export default profile;