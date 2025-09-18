import * as Crypto from "expo-crypto";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { Alert, Button, Image, View } from "react-native";
import CustomInput from "../components/CustomInput";
import { auth, db, storage } from "../src/firebase";
import { CommonStyles } from "../styles/CommonStyles";
import { CreateStyles } from "../styles/CreateStyles";

export default function PostCreateScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("사진 접근 권한이 필요합니다.");
    }
    const res = await ImagePicker.launchImageLibraryAsync({ quality: 0.8 });
    if (!res.canceled) setImage(res.assets[0].uri);
  };

  const onSubmit = async () => {
    try {
      let imageUrl: string | undefined;
      if (image) {
        const blob = await (await fetch(image)).blob();
        const filename = Crypto.randomUUID();
        const r = ref(
          storage,
          `posts/${auth.currentUser?.uid}/${filename}.jpg`
        );
        await uploadBytes(r, blob);
        imageUrl = await getDownloadURL(r);
      }

      const docRef = await addDoc(collection(db, "posts"), {
        uid: auth.currentUser?.uid,
        title,
        text,
        imageUrl: imageUrl ?? null,
        createdAt: serverTimestamp(), // ✅ 고침
        commentCount: 0,
      });

      router.replace(`/detail/${docRef.id}`);
    } catch (e: any) {
      Alert.alert("오류", e.message);
    }
  };

  return (
    <View>
      <CustomInput
        placeholder="제목을 입력하세요"
        value={title}
        onChangeText={setTitle}
        style={CommonStyles.input}
      />
      <CustomInput
        placeholder="내용을 입력하세요"
        value={text}
        onChangeText={setText}
        multiline
        style={CreateStyles.textArea}
      />
      {image && <Image source={{ uri: image }} />}
      <Button title="이미지 선택" onPress={pickImage} />
      <Button title="등록" onPress={onSubmit} />
    </View>
  );
}
