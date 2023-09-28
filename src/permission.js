import { PermissionsAndroid, Platform } from "react-native";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useDispatch } from "react-redux";
import { setTrue } from "./redux/slice/checkSlice";

const isPermission = async (dispatch) => {

  async function hasAndroidPermission() {
    if (Platform.Version >= 33) {
      const [readMediaImagesPermission, readMediaVideoPermission] = await Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]);
      return readMediaImagesPermission && readMediaVideoPermission;
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  }

  async function requestAndroidPermission() {
    if (Platform.Version >= 33) {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  }

  if (Platform.OS === "android" && !(await hasAndroidPermission())) {

    const response =  await requestAndroidPermission();
    dispatch(setTrue(true))
    return response;
  }

  return true;

};

const savePicture = async (tag, type, album) => {
  try {
    if (Platform.OS === "android" && !(await isPermission())) {
      return;
    }

    await CameraRoll.save(tag, { type, album });
  } catch (error) {
    console.error("Error saving picture:", error);
  }
};

export { isPermission, savePicture };

