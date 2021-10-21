import storage from '@react-native-firebase/storage';

export default async(file) => {
  const path = 'pets/' + file.path;
  const ref = storage().ref(path);

  const task = ref.putFile(file.path);
  let url
  await task
    .catch((error) => {
      onError(error);
    });
  url = await ref.getDownloadURL();
  console.log('url', url);
  return url

};