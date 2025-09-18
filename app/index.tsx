import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button, FlatList, View } from "react-native";
import PostCard from "../components/PostCard";
import { auth, db } from "../src/firebase";

export default function PostListScreen() {
  const router = useRouter();
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const [user, setUser] = useState<User | null>(null);

  // 로그인 상태 구독
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, setUser);
    return () => unsubAuth();
  }, []);

  // 게시글 구독

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubPosts = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsubPosts();
  }, []);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* ✅ 여기서 네비바 제목 바꾸기 */}
      <Stack.Screen options={{ title: "커뮤니티" }} />

      {/* 헤더 우측에 글 작성 / 로그인 버튼 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 12,
        }}
      >
        <Button
          title="글 작성"
          onPress={() => {
            if (!user) {
              router.push("/login");
            } else {
              router.push("/create");
            }
          }}
        />

        {user ? (
          <Button
            title="로그아웃"
            onPress={() => signOut(auth).then(() => router.replace("/login"))}
          />
        ) : (
          <Button title="로그인" onPress={() => router.push("/login")} />
        )}
      </View>

      {/* ✅ PostCard 적용 */}
      <FlatList
        data={posts}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => <PostCard post={item} />}
      />
    </View>
  );
}
