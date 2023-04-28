// import { Feather } from "@expo/vector-icons";
// import { Layout } from "components/common";
// import { useFormik } from "formik";
// import {
//   FormControl,
//   Input,
//   Icon,
//   Button,
//   VStack,
//   Heading,
//   Text,
//   Link,
//   HStack,
// } from "native-base";
// import React, { useEffect } from "react";
// import * as yup from "yup";
// import * as userApi from "lib/userApi";
// import { useAppDispatch, useAppSelector } from "hooks/redux";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useNavigation } from "@react-navigation/native";
// import { phoneLogin, readUser } from "redux-store/slices/user";

// const schema = yup.object().shape({
//   code: yup
//     .string()
//     .length(6, "Must be exactly 6 digits!")
//     .required("Verification code is required!"),
// });

// const SecurityCode = () => {
//   const nav = useNavigation();
//   const dispatch = useAppDispatch();
//   const formik = useFormik({
//     validationSchema: schema,
//     initialValues: {
//       code: "",
//     },
//     onSubmit: async ({ code }) => {
//       const data = await dispatch(phoneLogin(code)).unwrap();
//       await dispatch(readUser(data.uid)).catch(() =>
//         nav.navigate("PhoneSignup")
//       );
//     },
//   });

//   return (
//     <Layout>
//       <KeyboardAwareScrollView
//         contentContainerStyle={{ flex: 1, justifyContent: "space-evenly" }}
//       >
//         <VStack space={5} alignItems="center" px={5}>
//           <Heading>Verification</Heading>
//           <Text color="muted.500" bold>
//             Your will get a verification code via SMS!
//           </Text>
//         </VStack>
//         <VStack space={10} px={5}>
//           <FormControl isInvalid={!!formik.errors.code}>
//             <FormControl.Label>Verification Code</FormControl.Label>
//             <Input
//               value={formik.values.code}
//               onChange={(e) => formik.setFieldValue("code", e.nativeEvent.text)}
//               placeholder="Enter your code"
//               keyboardType="numeric"
//             />
//             <FormControl.ErrorMessage>
//               {formik.errors.code}
//             </FormControl.ErrorMessage>
//           </FormControl>
//           <Button size="lg" onPress={() => formik.handleSubmit()}>
//             Log In
//           </Button>
//           <HStack>
//             <Text color="muted.400" bold>
//               Didn't receive the code?
//             </Text>
//             <Button
//               onPress={() => nav.navigate("PhoneNumber")}
//               variant="unstyled"
//               p={0}
//             >
//               Resend Again
//             </Button>
//           </HStack>
//         </VStack>
//       </KeyboardAwareScrollView>
//     </Layout>
//   );
// };

// export default SecurityCode;
