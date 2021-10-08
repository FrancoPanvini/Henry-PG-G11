import React,{useState, useEffect} from "react";
import Carousel from "react-elastic-carousel";
import { IoIosCloseCircle } from "react-icons/io";
import  PopUpForms  from "./PopUpForms";
import ReactDom from "react-dom";
import { getFormByPet } from "../../../../services/getFormByPet";

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];
const FormSlider=({UserId, adult, dedication, oldPets, oldPetsDesc, otherPets, otherPetsDesc, residence, residents, onClose, id }) => {
    const [forms, setForms] = useState()

    useEffect(()=>{
        const getForm = async (id) => {
          const form = await getFormByPet(id);
          console.log(form.data);
          setForms(form.data);
        }
        getForm(id);
      },[id]);

   return ReactDom.createPortal(
    <>
    <div className="fixed inset-0 bg-gray-50 bg-opacity-70 z-20 overflow-y-scroll" />
    <div className="fixed inset-0 z-30 overflow-y-scroll ">
      <div className="relative top-10 mx-auto w-9/12 p-6 bg-fourty rounded-2xl grid justify-items-center  ">
        <div>
         {/* <Carousel breakPoints={breakPoints} className="z-40"> */}
             <div className="w-96">pene</div>
            {forms?.map((el) => {
                return(
                    <div key={el.id}>
                     <PopUpForms UserId={el.UserId} adult={el.adult} dedication={el.dedication} oldPets={el.oldPets}  oldPetsDesc={el.oldPetsDesc} otherPets={el.otherPets} otherPetsDesc={el.otherPetsDesc} residence={el.residence} residents={el.residents} />
                    </div>
                )
            })}
            
        {/* </Carousel> */}
        </div>
      </div>
    </div>
  </>,
  document.getElementById("portal")
    )
}


export default FormSlider