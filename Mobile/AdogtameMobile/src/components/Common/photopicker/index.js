import React from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePickerCropper from 'react-native-image-crop-picker'

import { Button } from 'react-native-paper';

const PhotoPicker = React.forwardRef(({onFileSelected, setPhoto}, ref) => {
    const options = [
        {name:"Usar la cámara", icon: "camera", onPress:()=>{
            ImagePickerCropper.openCamera({
                width:300,
                height:300,
                cropping:true,
                freeStyleCropEnabled:true
            }).then((images) =>{
                onFileSelected(images)
                setPhoto(images)
                console.log(images.path)
            }).catch((error) => {
                console.log('error', error)
            })
        }},
        {name:"Elegir de la galería", icon: "picture-in-picture-bottom-right-outline", onPress:()=>{
            ImagePickerCropper.openPicker({
                width:300,
                height:300,
                cropping:true,
                freeStyleCropEnabled:true
            }).then((images) =>{
                onFileSelected(images)
                setPhoto(images)
            }).catch((error) => {
                console.log('error', error)
            })
        }}
    ]
    return (
        <RBSheet
          ref={ref}
          height={150}
          openDuration={250}
          closeOnDragDown
          customStyles={{
            container: {

            }
          }}
        >
            <View style={styles.optionsWrapper}> 
            {options.map(({name,onPress,icon}) => (

                <TouchableOpacity onPress={onPress} style={styles.optionsWrapper} key={name}>
                    <View style={styles.pickerOption}>

                    <Button icon={icon}></Button>
                    <Text icon={icon}>{name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            </View>
        </RBSheet>
    )
})

export default PhotoPicker
