// styles/CreateStyles.ts
import { StyleSheet } from "react-native";

export const CreateStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    minHeight: 120,
    textAlignVertical: "top", // 멀티라인 입력칸용
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
});
