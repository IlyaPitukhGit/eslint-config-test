import Toast from "react-native-toast-message";
import { Button, Platform, Text, View } from "react-native";
import { toastService} from "./components/Toast/ToastService";
import { TOAST_KEYS } from "./components/Toast/ToastKeys";

export default function Index() {

  const showToast =() => {
    toastService.show({
      key: TOAST_KEYS.ACTION.DOWNLOAD,
      position: 'bottom',
      bottomOffset: Platform.OS === 'ios' ? 34 : 36,
      type: "success",
    })
  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button title="show toast" onPress={showToast} />
      <Toast />
    </View>
  );
}
