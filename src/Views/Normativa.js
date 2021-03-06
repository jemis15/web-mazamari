import React from 'react';
import { Col, Row } from 'react-bootstrap';

export default function Normativa() {
    
    return <div className="container py-5">
        <section>
            <Row> 
                <Col sm="2">
                        <label><strong>Tipo normatividad: </strong></label>
                </Col>
                <Col sm="4">
                        <div className="form-group">
                            <select name="nivel" className="form-control" >
                                <option value="0"></option>
                                <option value="1">abc</option>
                                <option value="2">xyz</option>
                            </select>
                        </div>
                </Col>
                <Col sm="2">
                    <label><strong>  Año: </strong></label>
                </Col>
                <Col sm="4">
                    <input type="date" className="form-control"  name="fecha"  step="2" />
                </Col>
            </Row>
            
            <Row> 
                <Col sm="2">
                    <div className="form-group">
                        <label><strong>Fecha de Aprobación: </strong></label>
                    </div>
                </Col>
                <Col sm="4">
                    <input type="date" className="form-control"  name="fecha"  step="2" />
                </Col>
                <Col sm="2">
                        <label><strong>  Descripción: </strong></label>
                </Col>
                <Col sm="4">
                    <input type="text" className="form-control" placeholder="Descripción"/>
                </Col>
            </Row><br/>
                <a href="#" className="btn btn-info btn-lg " role="button" aria-pressed="true">Buscar</a>
        </section>
        <br/>
        <div className="table-responsive">
        <table className="table table-hover table-bordered">
            <thead className="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Descripción</th>
                <th scope="col">Tipo</th>
                <th scope="col">Aprobación</th>
                <th scope="col">Vigilancia</th>
                <th scope="col">Acción</th>
                <th scope="col">Observación</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
}