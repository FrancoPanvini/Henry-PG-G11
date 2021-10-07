import React from 'react'
import axios from 'axios'
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {initialUser } from '../../../../redux/actions';
import CardAdopcion from '../CardsPefil/CardAdopcion';

function MisAdopciones() {
  const userId = localStorage.getItem('userId');
  const user = useSelector((state) => state.userData)
  const dispatch = useDispatch();
  const [pet, setPet] = useState([])

const initialPet = (userId) => {
  axios.get(`/pets?adopter=${userId}`)
  .then((res) => {
    setPet(res.data.rows)
    return res.data.rows
  })
}
  useEffect(() => {
    dispatch(initialUser(userId))
    initialPet(userId)
  }, [dispatch, userId]);

console.log(pet)
 
  
  return (
    <div className="container mx-auto  flex flex-col">
      <div className="container mx-auto p-2 overflow-auto h-96">
      {pet && pet.map(el => {
        return (
      <CardAdopcion photo={el.petPic} name ={el.name}
      />
        )
      })}
    </div>
    </div>
  )
}

export default MisAdopciones
