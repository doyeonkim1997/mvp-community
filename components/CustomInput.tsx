// components/ui/CustomInput.tsx
import { TextInput, TextInputProps } from "react-native";

export default function CustomInput(props: TextInputProps) {
  return <TextInput {...props} />; // ✅ 스타일 없음 → 외부에서 주입
}
