// components/CommentItem.tsx
import { DocumentData } from "firebase/firestore";
import { Text, View } from "react-native";

type Props = {
  comment: DocumentData;
};

export default function CommentItem({ comment }: Props) {
  return (
    <View style={{ paddingVertical: 6 }}>
      <Text style={{ fontSize: 14 }}>- {comment.text}</Text>
    </View>
  );
}
