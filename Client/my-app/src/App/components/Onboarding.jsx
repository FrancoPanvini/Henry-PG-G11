import React from 'react';




function Onboarding() {
  return (
    // <div className="relative grid grid-cols-3 2xl:h-80 h-screen80 bg-secondary">
    <div className="relative grid grid-cols-2 h-screen80  bg-gradient-to-r from-thirty to-fourty">
    {/* <div className="flex justify-evenly items-center h-96"> */}

      {/* <div className="bg-cachorroWeb bg-center-bottomish bg-cover relative onboarding-transparency-right" /> */}
      <div className="flex flex-col items-center justify-center">
      
        <span className="text-center text-white text-3xl">
          ENCUENTRA A TU COMPAÑERO IDEAL
          <br /> Y DALE UN HOGAR
        </span>
        <br /> 
        <button className="btn btn-lg bg-primary text-white border-secondary">
          REGISTRATE
        </button>
      </div>

     
       <div className="bg-gatitosWeb bg-leftish-center bg-cover relative onboarding-transparency-left" /> 
       
      
    </div>
  );
}

export default Onboarding;
