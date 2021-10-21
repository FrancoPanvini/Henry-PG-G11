import React, {useState, useRef} from 'react';
import { Text, View } from 'react-native';
import CreatePetComponent from '../../components/PetCreate/index'
import uploadImage from '../../helpers/uploadImage';
import axios from 'axios'

const CreatePet = ({data, usuario}) => {
    const [form, setForm] = useState({})
    const [photo, setPhoto] =useState("")



    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})
       
    }
    const onSubmit = async() => {
        console.log(photo.path)
        let newPhoto = uploadImage(photo)
        await setTimeout(() => {
            console.log(newPhoto)
            
            const newPet = {
                ...form,
                Ownerid: usuario.id,
                Cityid: 1,
                age: Number(form.age),
                photo:['https://upload.wikimedia.org/wikipedia/en/4/42/Casper_%28character%29.png'/* newPhoto._W */]
            }
            console.log(newPet)
            axios.post('adogtameapi.herokuapp.com/pets/', newPet)
            
        }, 5000);
        


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

    return <CreatePetComponent photo={photo} setPhoto={setPhoto} onChangeText={onChange} onSubmit={onSubmit} form={form} sheetRef={sheetRef} closeSheet={closeSheet} openSheet={openSheet} onFileSelected={onFileSelected}/>
}

export default CreatePet;
