// import { Layout } from "components/common";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
// import { useFormik } from "formik";
// import {
//   Alert,
//   Button,
//   FormControl,
//   Heading,
//   Input,
//   Text,
//   VStack,
// } from "native-base";
// import React, { useRef, useState } from "react";
// import * as yup from "yup";

// import firebase from "firebase";
// import { useNavigation } from "@react-navigation/native";
// import { formatPhoneNumber } from "lib";
// import * as userApi from "lib/userApi";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { setPhoneNumber, setVerificationId } from "redux-store/slices/user";
// import { useAppDispatch } from "hooks/redux";

// const schema = yup.object().shape({
//   number: yup.string().required("Please enter your phone number!"),
// });

// const PhoneLogin = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const recaptchaRef = useRef(null);
//   const nav = useNavigation();
//   const dispatch = useAppDispatch();

//   const formik = useFormik({
//     validationSchema: schema,
//     initialValues: {
//       number: "",
//     },
//     onSubmit: async (values) => {
//       setLoading(true);
//       try {
//         const data = await userApi.sendPhoneCode(
//           `+1 ${formik.values.number}`,
//           recaptchaRef.current
//         );
//         dispatch(setPhoneNumber(values.number));
//         dispatch(setVerificationId(data));
//         setLoading(false);
//         nav.navigate("SecurityCode");
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     },
//   });

//   return (
//     <Layout>
//       <KeyboardAwareScrollView
//         contentContainerStyle={{
//           flex: 1,
//           justifyContent: "space-evenly",
//         }}
//       >
//         <VStack space={5} alignItems="center" px={5}>
//           <Heading size="2xl">Verification</Heading>
//           <Text textAlign="center" bold color="muted.500">
//             We will send you a one time security code to verify your number!
//           </Text>
//         </VStack>
//         <VStack space={10} px={5}>
//           {error && (
//             <Alert status="error">
//               <Alert.Icon />
//               <Alert.Title flexShrink={1}>{error}</Alert.Title>
//             </Alert>
//           )}
//           <FormControl isInvalid={!!formik.errors.number}>
//             <FormControl.Label>Phone Number</FormControl.Label>
//             <Input
//               value={formik.values.number}
//               onChange={(e) =>
//                 formik.setFieldValue(
//                   "number",
//                   formatPhoneNumber(e.nativeEvent.text, formik.values.number)
//                 )
//               }
//               InputLeftElement={
//                 <Text bold ml={3}>
//                   +1
//                 </Text>
//               }
//               placeholder="Enter your number"
//               keyboardType="numeric"
//             />
//             <FormControl.ErrorMessage>
//               {formik.errors.number}
//             </FormControl.ErrorMessage>
//           </FormControl>
//           <Button
//             isLoading={loading}
//             size="lg"
//             onPress={() => formik.handleSubmit()}
//           >
//             Get Security Code
//           </Button>
//         </VStack>
//       </KeyboardAwareScrollView>
//       <FirebaseRecaptchaVerifierModal
//         ref={recaptchaRef}
//         firebaseConfig={firebase.app().options}
//         attemptInvisibleVerification
//       />
//     </Layout>
//   );
// };

// export default PhoneLogin;
