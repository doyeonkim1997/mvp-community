// app/login.tsx
import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { auth } from "../src/firebase";

export default function LoginScreen() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = async () => {
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, pw);
      } else {
        await signInWithEmailAndPassword(auth, email, pw);
      }
      router.replace("/"); // 로그인 성공 → 홈(게시판)으로 이동
    } catch (e: any) {
      Alert.alert("오류", e.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {mode === "login" ? "로그인" : "회원가입"}
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />
      <TextInput
        placeholder="Password"
        value={pw}
        onChangeText={setPw}
        secureTextEntry
        style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
      />

      <Button
        title={mode === "login" ? "로그인" : "회원가입"}
        onPress={onSubmit}
      />

      <Text
        onPress={() => setMode(mode === "login" ? "signup" : "login")}
        style={{ textAlign: "center", marginTop: 8 }}
      >
        {mode === "login"
          ? "계정이 없나요? 회원가입"
          : "이미 계정이 있나요? 로그인"}
      </Text>
    </View>
  );
}
