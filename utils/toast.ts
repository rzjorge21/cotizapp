import Toast from "react-native-toast-message";

export function ShowSuccess(message: string){
  Toast.show({
    type: 'success',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000
  })
}

export function ShowInfo(message: string){
  Toast.show({
    type: 'info',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000
  })
}

export function ShowError(message: string){
  Toast.show({
    type: 'error',
    text1: message,
    position: 'bottom',
    visibilityTime: 3000
  })
}