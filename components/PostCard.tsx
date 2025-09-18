// components/PostCard.tsx
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  post: DocumentData;
};

export default function PostCard({ post }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/detail/${post.id}`)}
      style={{
        padding: 12,
        borderBottomWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{post.title}</Text>
        {/* ✅ 이미지 첨부된 글이라면 사진 아이콘 표시 */}
        {post.imageUrl ? (
          <MaterialIcons name="image" size={18} color="gray" />
        ) : null}
      </View>
      <Text style={{ opacity: 0.6, fontSize: 12 }}>
        댓글 {post.commentCount ?? 0}
      </Text>
    </TouchableOpacity>
  );
}
