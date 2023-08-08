// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';

// export default function Auth(SpecificComponent, option) {
  
//   function AuthenticationCheck(props) {
    
//     let jwtToken = localStorage.getItem('jwtToken');
//     console.log(jwtToken === null);

//     //Not Loggined in Status
//     if (jwtToken === null) {
//       if (option) {
//         props.history.push('/Login');
//       }else{
//         props.history.push('/');
//       }
//       //Loggined in Status
//     } else {
//       if (option === false) {
//         props.history.push('/main');
//       }
//     }

//     return <SpecificComponent {...props}  />;
//   }
//   return AuthenticationCheck;
// }