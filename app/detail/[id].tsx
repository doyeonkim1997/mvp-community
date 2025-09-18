import { Stack, useLocalSearchParams } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view"; // ✅ 추가
import CommentInput from "../../components/CommentInput";
import CommentItem from "../../components/CommentItem";
import { auth, db } from "../../src/firebase";
import { DetailStyles } from "../../styles/DetailStyles";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();
  const [post, setPost] = useState<DocumentData | null>(null);
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsubPost = onSnapshot(doc(db, "posts", id as string), (s) => {
      setPost({ id: s.id, ...s.data() });
    });

    const q = query(
      collection(db, "comments"),
      where("postId", "==", id),
      orderBy("createdAt", "asc")
    );
    const unsubComments = onSnapshot(q, (snap) =>
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );

    return () => {
      unsubPost();
      unsubComments();
    };
  }, [id]);

  const addComment = async (commentText: string) => {
    if (!commentText.trim()) return;

    if (!auth.currentUser) {
      Alert.alert("로그인 필요해요", "로그인 후에 댓글을 작성할 수 있어요.");
      return;
    }

    await addDoc(collection(db, "comments"), {
      postId: id,
      uid: auth.currentUser?.uid,
      text: commentText, // ✅ text 대신 commentText 사용
      createdAt: serverTimestamp(),
    });

    await updateDoc(doc(db, "posts", id as string), {
      commentCount: increment(1),
    });
  };

  if (!post) return null;

  return (
    <View style={DetailStyles.container}>
      <Stack.Screen options={{ title: post.title ?? "상세" }} />

      {post.imageUrl ? (
        <Image source={{ uri: post.imageUrl }} style={DetailStyles.image} />
      ) : null}

      <Text style={DetailStyles.content}>{post.text}</Text>

      {/* ✅ KeyboardAwareFlatList */}
      <KeyboardAwareFlatList
        data={comments}
        keyExtractor={(i) => i.id}
        ListHeaderComponent={
          <Text style={DetailStyles.commentHeader}>
            댓글 {post.commentCount ?? comments.length}
          </Text>
        }
        renderItem={({ item }) => <CommentItem comment={item} />}
        contentContainerStyle={{ paddingBottom: 80 }} // 입력창 자리 확보
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true} // 안드로이드에서도 적용
      />

      {/* ✅ 입력창 항상 하단 고정 */}
      <View style={DetailStyles.commentRow}>
        <CommentInput onSubmit={addComment} />
      </View>
    </View>
  );
}
