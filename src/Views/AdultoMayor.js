import React from 'react';

export default function AdultoMayor(){
    return <div className="container my-5   pl-5 pr-5 pb-5 shadow" style={{width:'800px', border:'2px solid #008000'}}>
        <h4 className="text-center mb-4  p-4 mx-n5"  style={{ background:' #008000', color:'white'}}>CIAM - Centro Integral de Atención al Adulto Mayor</h4>
        <div className="imagen text-center mb-5" >
        <img src="https://image.freepik.com/foto-gratis/moderna-sala-estar-mesa-frente-pared-blanca_375133-34.jpg" alt="AdultoMayor" class="rounded" />
        </div>
        <b className="mt-5">¿Que es CIAM?</b>
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sequi enimvoluptatum quod aliquid blanditiis, magnam fugiat sint? Natus, architecto fuga. Saepe natus illo nihil? Quam neque commodi corporis quae.
        </p>
        <b className="mt-4">Objetivos</b>
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sequi enim voluptatum quod aliquid blanditiis, magnam fugiat sint? Natus, architecto fuga. Saepe natus illo nihil? Quam neque commodi corporis quae.
        </p>
    </div>
}