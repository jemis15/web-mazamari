import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Media, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';

import MultiItemsCarousel from '../components/MultiItemsCarousel';
import Section from '../components/Section';

import fotoAlcalde from '../assets/images/img1.jpg';
import imagebanner from '../assets/images/paisajes.jpg'

export default function Inicio() {
  return <>
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay={true}
      autoPlaySpeed={5000}
      centerMode={false}
      className=""
      containerClass=""
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1,
          partialVisibilityGutter: 30
        }
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable>
      <WithStyled />
      <WithStyled />
      <WithStyled />
    </Carousel>

    <form className="bg-dark position-relative d-none d-lg-block">
      <div className="py-3 position-absolute" style={{ bottom: 0, left: 0, right: 0 }}>
        <div className="container position-relative">
          <div className="position-absolute icon-convinado bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
            <i className="fas fa-sync" />
          </div>
          <div className="d-inline-block h-100" style={{ width: "20%" }}>
            <select className="w-100 h-100 p-3 border-0 d-inline-block">
              <option>opcion 1</option>
              <option>opcion 2</option>
              <option>opcion 3</option>
              <option>opcion 4</option>
            </select>
          </div>
          <div className="d-inline-block h-100" style={{ width: "20%" }}>
            <select className="w-100 h-100 p-3 border-0 d-inline-block">
              <option>opcion 1</option>
              <option>opcion 2</option>
              <option>opcion 3</option>
              <option>opcion 4</option>
            </select>
          </div>
          <div className="d-inline-block h-100" style={{ width: "20%" }}>
            <input className="w-100 h-100 p-3 border-0" type="date" />
          </div>
          <div className="d-inline-block h-100" style={{ width: "20%" }}>
            <input className="w-100 h-100 p-3 border-0" type="date" />
          </div>
          <div className="d-inline-block h-100" style={{ width: "20%" }}>
            <button className="btn-danger p-3 d-inline-block w-100 h-100 border-0">BUSCAR</button>
          </div>
        </div>
      </div>
    </form>

    <Container className="p-5 mt-5">
      <Row>
        <Col md="auto">
          <img
            width="250"
            className="avatar-decorate rounded"
            src={fotoAlcalde}
            alt="alcalde de mazamari"
          />
        </Col>
        <Col>
          <Media.Body>
            <Card.Title>MARCELINO CAMARENA TORRES</Card.Title>
            <h6><i>Alcalde Distrital de Mazamari</i></h6>
            <p className="mb-0">
              Tenemos el firme propósito de transformar de manera estructural la gestión del distrito con un enfoque innovador, coherente y eficaz. Nuestro gobierno actuará en tres ejes fundamentales: política pública de desarrollo humano, desarrollo sostenible y economía local. Los vecinos de Mazamari deben tener todas las condiciones para realizar sus actividades en el distrito. Es así que los primeros 90 días de gestión realizaremos, consultas vecinales, un censo socio económico y el presupuesto participativo. Esta información marcará nuestra gestión.
              Finalmente, quiero transmitirles nuestro ideal de gobierno: "No hay que darle a nuestro distrito el tiempo que nos sobra, sino el tiempo que se merece". Seamos los grandes agentes y voluntarios del cambio. En todos está el poder de construir un nuevo Mazamari.
              La seguridad es el derecho por excelencia y es nuestra responsabilidad. Es así que nos proponemos crear fronteras vivas, un sistema de video vigilancia articulado para instaurar el orden y a la par generar conciencia de ayuda y apoyo a nuestro prójimo que nos necesita en adversidades. El equilibrio medioambiental y creación de zonas ecoturísticas será uno de nuestros ejes de desarrollo.
            				</p>
          </Media.Body>
        </Col>
      </Row>
    </Container>

    <MultiItemsCarousel
      title={<><i className="fas fa-link text-primary" /> <span>Links de interes</span></>}
      grupo="principal"
    />

    <div className="mt-5 mb-5">
      <Section />
    </div>

    <MultiItemsCarousel
      title={<><i className="fas fa-link text-primary" /> <span>Links de interes</span></>}
      grupo="secundario"
    />
  </>
}

function WithStyled() {
  return <div className="text-center">
    <a href="#to" className="d-inline-block">
      <img
        src={imagebanner}
        className="img-fluid"
        loading="lazy"
        alt="banner header"
      />
    </a>
  </div>
}