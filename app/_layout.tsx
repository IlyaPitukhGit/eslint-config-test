import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

const showToas = () => {
    //test 3
    Toast.show();
    Toast.show();
};

export default function RootLayout() {
    return <Stack />;
}
