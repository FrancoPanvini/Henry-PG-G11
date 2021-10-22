import React, {useState, useRef} from 'react';
import { Text, View } from 'react-native';
import CreatePetComponent from '../../components/PetCreate/index'
import uploadImage from '../../helpers/uploadImage';
import axios from 'axios'

const CreatePet = ({data, usuario}) => {
    const [form, setForm] = useState({})
    const [photo, setPhoto] =useState("")
    const [loading, setLoading] = useState(false)



    const onChange = ({name, value}) => {
        setForm({...form, [name]: value})
       
    }
    const onSubmit = async() => {
        setLoading(true)
        console.log(photo.path)
        let newPhoto;
        if(photo.path){
            newPhoto = uploadImage(photo)
        }
        await setTimeout(() => {
            const newPet = {
                ...form,
                Ownerid: usuario.id,
                Cityid: usuario.cityId,
                lat: usuario.lat,
                lng: usuario.lng,
                age: Number(form.age),
                photo:[newPhoto?._W]
            }
            console.log(newPet)
            axios.post('https://adogtameapi.herokuapp.com/pets/', newPet)
                .catch(err=>console.log(err))
            
        }, 8000);
        setLoading(false)
        


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
        setPhoto(images)

    }

    return <CreatePetComponent loading={loading} photo={photo} setPhoto={setPhoto} onChangeText={onChange} onSubmit={onSubmit} form={form} sheetRef={sheetRef} closeSheet={closeSheet} openSheet={openSheet} onFileSelected={onFileSelected}/>
}

export default CreatePet;
