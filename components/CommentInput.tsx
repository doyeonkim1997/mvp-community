// components/CommentInput.tsx
import { useState } from "react";
import { Button, TextInput, View } from "react-native";

type Props = {
  onSubmit: (text: string) => void;
};

export default function CommentInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText(""); // 입력 후 초기화
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
      <TextInput
        placeholder="댓글 달기"
        value={text}
        onChangeText={setText}
        style={{ flex: 1, borderWidth: 1, borderRadius: 8, padding: 10 }}
      />
      <Button title="등록" onPress={handleSubmit} />
    </View>
  );
}
