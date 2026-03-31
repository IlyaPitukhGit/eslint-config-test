import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export default function RootLayout() {
    Toast.show();
    return <Stack />;
}
