import React, {useState, useRef} from 'react';
import { Text, View } from 'react-native';
import CreatePetComponent from '../../components/PetCreate/index'

const CreatePet = () => {
    const [form, setForm] = useState({})



    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})
    }
    const onSubmit = () => {
    }

    const sheetRef = useRef(null)
    const closeSheet = () => {
        if(sheetRef.current){
            sheetRef.current.close()
        }
    }
    const openSheet = () => {
        if(sheetRef.current){
            sheetRef.current.open()
        }
    }
    const onFileSelected=(images)=> {
        closeSheet()

    }

    return <CreatePetComponent onChangeText={onChange} onSubmit={onSubmit} form={form} sheetRef={sheetRef} closeSheet={closeSheet} openSheet={openSheet} onFileSelected={onFileSelected}/>
}

export default CreatePet;
