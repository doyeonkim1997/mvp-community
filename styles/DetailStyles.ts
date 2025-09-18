// styles/DetailStyles.ts
import { StyleSheet } from "react-native";

export const DetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 12,
    resizeMode: "cover",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  content: {
    fontSize: 15,
    marginBottom: 50,
    lineHeight: 20,
  },
  commentHeader: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});
