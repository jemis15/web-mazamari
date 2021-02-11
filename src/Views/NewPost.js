import Axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import MDEditor from '@uiw/react-md-editor';
import Compress from 'compress.js';

import Avatar from '../components/utilitarios/Avatar';
import imageDefault from '../assets/images/page-default-cover-photo-4x.png';

const TodoData = React.createContext(null);

const tipos = ['noticia', 'video', 'programa'];

function reducer(state, action) {
    switch (action.type) {
        case 'change':
            let item = state[action.name];

            if (item.validator) {
                const validation = item.validator.validate(action.value);
                if (validation.isValidated) {
                    item = {
                        ...item,
                        value: action.value,
                        dirty: true,
                        validator: { ...item.validator, mensaje: '' }
                    }
                } else {
                    item = {
                        ...item,
                        value: action.value,
                        dirty: true,
                        validator: { ...item.validator, mensaje: validation.mensaje }
                    }
                }
            }
            return { ...state, [action.name]: { ...item, value: action.value, dirty: true } };

        case 'validar':
            let image = state.image;
            let titulo = state.titulo;
            let descripcion = state.contenido;

            if (
                image.validator &&
                !image.validator.mensaje &&
                !image.dirty
            ) {
                const validation = image.validator.validate(image.value);
                if (!validation.isValidated) {
                    image = {
                        ...image,
                        validator: { ...image.validator, mensaje: validation.mensaje }
                    }
                }
            }
            if (
                titulo.validator &&
                !titulo.validator.mensaje &&
                !titulo.dirty
            ) {
                const validation = titulo.validator.validate(titulo.value);
                if (!validation.isValidated) {
                    titulo = {
                        ...titulo,
                        validator: { ...titulo.validator, mensaje: validation.mensaje }
                    }
                }
            }
            if (
                descripcion.validator &&
                !descripcion.validator.mensaje &&
                !descripcion.dirty
            ) {
                const validation = descripcion.validator.validate(descripcion.value);
                if (!validation.isValidated) {
                    descripcion = {
                        ...descripcion,
                        validator: { ...descripcion.validator, mensaje: validation.mensaje }
                    }
                }
            }
            return { ...state, image, titulo, descripcion };

        default:
            throw new Error('Hola mundo');
    }
}

function getTipoConenido(tipo) {
    return tipos.find(_tipo => _tipo === tipo) ? tipo : tipos[0];
}

function NewPost({ user }) {
    const { tipo } = useParams();
    const [state, dispatch] = useReducer(reducer, {
        titulo: {
            value: '',
            dirty: false,
            validator: {
                mensaje: '',
                validate: function (value) {
                    if (!value) {
                        return {
                            isValidated: false,
                            mensaje: 'Ingrese un titulo valido.'
                        };
                    }
                    if (value.length > 100) {
                        return {
                            isValidated: false,
                            mensaje: 'Escribe un titulo mas corto.'
                        };
                    }
                    return { isValidated: true, mensaje: '' };
                }
            }
        },
        image: {
            value: '',
            dirty: false,
            validator: {
                mensaje: '',
                validate: function (value) {
                    if (!value) {
                        return {
                            isValidated: false,
                            mensaje: 'Sube una foto.'
                        };
                    }
                    return { isValidated: true, mensaje: '' };
                }
            }
        },
        contenido: {
            value: '',
            dirty: false,
            validator: {
                mensaje: '',
                validate: function (value) {
                    if (value && value.length >= 500) {
                        return {
                            isValidated: false,
                            mensaje: 'Escribe una descripcion mas corto'
                        };
                    }
                    return { isValidated: true, mensaje: '' };
                }
            }
        },
        tipo_contenido: {
            value: getTipoConenido(tipo),
            dirty: false,
            validator: null
        },
        publicar: {
            value: true,
            dirty: false,
            validator: null
        }
    });
    const [modalAddVideo, setModalAddVideo] = useState(false);
    const [sending, setSending] = useState(false);

    const isValidFormulario = () => {
        const propsAValidar = ['titulo', 'image', 'contenido', 'publicar'];
        let validado = true;

        propsAValidar.forEach(prop => {
            // significa que es un campo que no requiere de validar
            if (!validado || !state[prop].validator) {
                return;
            }

            // verificamos si se hizo ina modificacion en el campo
            if (state[prop].dirty) {
                if (state[prop].validator.mensaje) {
                    validado = false;
                    return;
                }
            } else {
                validado = false;
                return;
            }
        });

        return validado;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (sending) { return; }

        if (!isValidFormulario()) {
            dispatch({ type: 'validar' });
            return;
        }

        alert('enviado');

        try {
            setSending(true);
            console.log('creado');
            setSending(false);
        } catch (error) {
            console.log(error);
            setSending(false);
        }
    }

    async function handleSelectImage(e) {
        const file = e.target.files;

        if (file.length <= 0) {
            return;
        }
        const compress = new Compress();

        compress.compress([...file], {
            size: 4,
            quality: .75,
            maxWidth: 1920,
            maxHeight: 1920,
            resize: true,
        }).then(data => {
            const img1 = data[0];
            // no se deve almacenar este tipo de dato,
            // fix este problema
            dispatch({ type: 'change', name: 'image', value: img1.prefix + img1.data });
        });
    }

    // __d(
    //     "MarketplaceComposerTitleInput.react",
    //     [
    //         "fbt",
    //         "CometFormTextInput.react",
    //         "MarketplaceComposerHighlightPreviewWrapper.react",
    //         "MarketplaceComposerInputWrapper.react",
    //         "MarketplaceComposerTitleField",
    //         "React",
    //         "marketplaceComposerDispatchers.hybrid",
    //         "useCometMarketplaceComposerPhotoPredictedCategories",
    //         "useLogMarketplaceModify"
    //     ],
    //     (function (a, b, c, d, e, f, g) {
    //         "use strict";
    //         e.exports = a;
    //         var h = b("React");
    //         function a() {
    //             var a = b("marketplaceComposerDispatchers.hybrid").useMarketplaceComposerCommonViewState(),
    //                 c = a.listingType,
    //                 d = a.photos,
    //                 e = a.title;
    //             a = b("marketplaceComposerDispatchers.hybrid").useMarketplaceComposerDispatcher();
    //             var f = a.dispatch;
    //             a = b("marketplaceComposerDispatchers.hybrid").useValidateMarketplaceComposerField(e);
    //             var i = b("useLogMarketplaceModify")("title_input"),
    //                 j = a[0] != null ? "ERROR" : null,
    //                 k = b("useCometMarketplaceComposerPhotoPredictedCategories")(),
    //                 l = h.useCallback(function (a) {
    //                     i(),
    //                     f(b("MarketplaceComposerTitleField").setTitle(a))
    //                 }, [f, i]);
    //             return h.jsx(b("MarketplaceComposerInputWrapper.react"),
    //                 {
    //                     children: h.jsx(b("MarketplaceComposerHighlightPreviewWrapper.react"),
    //                         {
    //                             field: e,
    //                             children: h.jsx(b("CometFormTextInput.react"),
    //                                 {
    //                                     helperText: a[0],
    //                                     label: g._("T\u00edtulo"),
    //                                     onBlur: function () {
    //                                         if (c.value !== "item" || j != null || d.value.length === 0) return;
    //                                         k(d.value[0].id, e.value)
    //                                     },
    //                                     onValueChange: l,
    //                                     validationState: j,
    //                                     value: e.value
    //                                 })
    //                         })
    //                 })
    //         }
    //     }), null);

    // __d("useMarketplacePriceChangeHandler",
    //     ["InputSelection", "React", "marketplaceFormatCurrency", "parseNumber"],
    //     (function (a, b, c, d, e, f) {
    //         "use strict";
    //         e.exports = a;
    //         var g = b("React"),
    //             h = 1e9;
    //         function i(a) { return a != null && a >= 0 && a < h }
    //         function a(a, c, d, e) {
    //             var f = g.useState(0), h = f[0], j = f[1];
    //             f = g.useState({ end: 0, start: 0 });
    //             var k = f[0], l = f[1];
    //             g.useEffect(function () {
    //                 d &&
    //                     a.current &&
    //                     a.current === document.activeElement &&
    //                     b("InputSelection").set(a.current, (k == null ? void 0 : k.start) + h, (k == null ? void 0 : k.end) + h)
    //             }, [h, k, d, a]);
    //             return g.useCallback(function (d) {
    //                 var f, g = b("parseNumber")(d);
    //                 f = (f = c) != null ? f : "USD"; if (c == null) return;
    //                 if (g == null || f == null) {
    //                     e("");
    //                     return
    //                 }
    //                 else if (i(g)) {
    //                     g = b("marketplaceFormatCurrency")(g, f);
    //                     f = g.lastIndexOf(d.charAt(d.length - 1));
    //                     f === -1 ? j(g.length - d.length === 1 ? 1 : 0) : j(g.slice(0, f + 1).length - d.length); e(g); a.current != null && l(b("InputSelection").get(a.current))
    //                 }
    //             }, [a, c, e])
    //         }
    //     }), null);


    function handleSelectVideoId(videoId) {
        dispatch({ type: 'change', name: 'contenido', value: videoId });
        dispatch({ type: 'change', name: 'image', value: `https://img.youtube.com/vi/${videoId}/0.jpg` });
    }

    function showModalAddVideo() {
        setModalAddVideo(true);
    }

    // switch (tipo) {
    //     case 'programa':
    //         return <Frame>
    //             <FrameLeft>
    //                 <h4>Desde el programa left</h4>
    //             </FrameLeft>
    //             <FrameRight>
    //                 <h4>Desde el programa right</h4>
    //             </FrameRight>
    //         </Frame>

    //     case 'video':
    //         return <Frame>
    //             <FrameLeft>
    //                 <h4>Desde el video left</h4>
    //             </FrameLeft>
    //             <FrameRight>
    //                 <h4>Desde el video right</h4>
    //             </FrameRight>
    //         </Frame>

    //     default:
    //         return <Frame>
    //             <FrameLeft>
    //                 <h4>Desde la noticia left</h4>
    //             </FrameLeft>
    //             <FrameRight>
    //                 <h4>Desde la noticia right</h4>
    //             </FrameRight>
    //         </Frame>
    // }

    return <TodoData.Provider value={dispatch}>
        <Frame>
            <FrameLeft>
                <Form onSubmit={handleSubmit} className="d-flex flex-column h-100">
                    <div className="px-3 pt-3 mb-3">
                        <h2>Crear noticia</h2>
                    </div>
                    <div className="px-3 overflow-auto">
                        <div className="mb-3 rounded d-flex align-items-center">
                            <div className="mr-3">
                                <Avatar
                                    image={`/apimuni/images/faces/${user.image}`}
                                    initials={user.nombre[0]}
                                    size="sm"
                                />
                            </div>
                            <div>
                                <h5 className="mb-0 text-truncate">{user.nombre}</h5>
                                <p className="mb-0 text-small">Publicacion en noticias</p>
                            </div>
                        </div>
                        <ImageAndVideo
                            label="Seleccione una imagen para la publicación"
                            image={state.image.value}
                            mensajeError={state.image.validator ? state.image.validator.mensaje : ''}
                            onChange={handleSelectImage}
                            onClick={showModalAddVideo}
                            as={state.tipo_contenido.value}
                        />

                        <div className="form-group">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className={`form-control form-control-sm ${state.titulo.validator && state.titulo.validator.mensaje ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    value={state.titulo.value}
                                    onChange={(e) => dispatch({ type: 'change', name: 'titulo', value: e.target.value })}
                                />
                                <label>T&iacute;tulo</label>
                                {state.titulo.validator && state.titulo.validator.mensaje && (
                                    <div className="invalid-feedback">{state.titulo.validator.mensaje}</div>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="form-floating">
                                <textarea
                                    className={`form-control form-control-sm ${state.contenido.validator && state.contenido.validator.mensaje ? 'is-invalid' : ''}`}
                                    placeholder=" "
                                    onChange={(e) => dispatch({ type: 'change', name: 'contenido', value: e.target.value })}
                                    style={{ height: '500px' }}
                                    value={state.contenido.value}
                                />
                                <label>Descripci&oacute;n</label>
                                {state.contenido.validator && state.contenido.validator.mensaje && (
                                    <div className="invalid-feedback">{state.contenido.validator.mensaje}</div>
                                )}
                            </div>
                        </div>

                        <Form.Group>
                            <Form.Check
                                id="form_post_publicar"
                                label="Al crearla sera publicado"
                                name="publicar"
                                checked={state.publicar.value}
                                onChange={(e) => dispatch({ type: 'change', name: e.target.name, value: e.target.checked ? true : false })}
                            />
                        </Form.Group>
                    </div>
                    <div className="p-3 mt-auto shadow border-top cursor-not-allowed">
                        <Button type="submit" block>
                            {sending ? 'Creando...' : 'Crear'}
                        </Button>
                    </div>
                </Form>
            </FrameLeft>
            <FrameRight>
                <div className="flex-fill py-5 h-100 overflow-auto">
                    <div
                        className="border shadow-sm rounded mx-auto bg-white overflow-hidden"
                        style={{ maxWidth: '970px' }}>
                        <div>
                            {state.image.value
                                ? <img
                                    className="w-100"
                                    src={state.image.value}
                                    alt="publicacion"
                                />
                                : <img className="w-100" src={imageDefault} alt="publicacion" />
                            }
                        </div>
                        <div className="container py-3" style={{ maxWidth: '700px' }}>
                            <div className="mb-3">
                                <span className="bg-success text-white d-inline-block border rounded px-3 py-1 text-small font-weight-600">Noticia</span>
                            </div>
                            <h2 className="t1 mb-5">
                                {state.titulo.value ? state.titulo.value : 'Titulo de tu publicación'}
                            </h2>
                            <div className="mx-auto" style={{ maxWidth: '670px' }}>
                                <MDEditor.Markdown source={state.contenido.value} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* {state.tipo_contenido.value !== 'noticia'
                        ? <ContentBlack
                            titulo={state.titulo.value}
                            image={state.image.value}
                            videoId={state.contenido.value}
                            tipo={state.tipo_contenido.value} />
                        : <div
                            className="flex-fill py-5 h-100 overflow-auto">
                            <div
                                className="border shadow-sm rounded mx-auto bg-white overflow-hidden"
                                style={{ maxWidth: '970px' }}>
                                <div>
                                    {state.image.value
                                        ? <img
                                            className="w-100"
                                            src={state.image.value}
                                            alt="publicacion"
                                        />
                                        : <img className="w-100" src={imageDefault} alt="publicacion" />
                                    }
                                </div>
                                <div className="container py-3" style={{ maxWidth: '700px' }}>
                                    <div className="mb-3">
                                        <span className="bg-success text-white d-inline-block border rounded px-3 py-1 text-small font-weight-600">Noticia</span>
                                    </div>
                                    <h2 className="t1 mb-5">
                                        {state.titulo.value ? state.titulo.value : 'Titulo de tu publicación'}
                                    </h2>
                                    {state.tipo_contenido === 'noticia' && <div className="mx-auto" style={{ maxWidth: '670px' }}>
                                        <MDEditor.Markdown source={state.contenido.value} />
                                    </div>}
                                </div>
                            </div>

                        </div> */}
            </FrameRight>

            <Modal show={modalAddVideo} onHide={() => setModalAddVideo(false)} animation={false} centered>
                <Modal.Header closeButton>Agregar video</Modal.Header>
                <SelectIdVideo
                    closeModal={() => setModalAddVideo(false)}
                    onSelected={handleSelectVideoId}
                />
            </Modal>
        </Frame>
    </TodoData.Provider>
}

const ControlTextarea = ({ label, value, rows, onChange, placeholder, validationState }) => {
    return <div className="form-group">
        <label>{label}</label>
        <textarea
            className={`form-control ${validationState === 'ERROR' && 'is-invalid'}`}
            value={value}
            rows={rows}
            onChange={onChange}
            placeholder={placeholder}
        />
    </div>
}

const FormGroup = (props) => {
    return <div className="form-control">
        {props.children}
    </div>
}
const FormInput = (props) => {
    return <input className={`form-control ${props.validate} ${props.className}`} {...props} />
}

const ControlText = ({ label, onChange, rows, placeholder, value, validationState, mensajeError, type = 'text' }) => {
    return <div className="form-group">
        <label>{label}</label>
        {type === 'textarea'
            ? <textarea
                className={`form-control ${validationState === "ERROR" && 'is-invalid'}`}
                value={value}
                onChange={onChange}
                rows={rows}
                placeholder={placeholder}
            />
            : <input
                type="text"
                className={`form-control ${validationState === "ERROR" && 'is-invalid'}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        }
        {validationState === "ERROR" && <div className="valid-feedback">{mensajeError}</div>}
    </div >
}

const SelectIdVideo = ({ closeModal, onSelected }) => {
    const [videoId, setVideoId] = useState('');
    const inpVideoId = useRef();

    useEffect(() => {
        inpVideoId.current.focus();
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        console.log(value);
        var video = value.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (!video) {
            setVideoId('');
            return;
        }

        if (video[1].toString().indexOf('?') !== -1) {
            setVideoId('');
            return;
        }

        setVideoId(video[1].toString());
    };
    const handleSelected = () => {
        if (videoId && videoId.length > 9) {
            closeModal();
            onSelected(videoId);
        }
    }

    return <>
        <Modal.Body>
            <Form.Group>
                <label>Introduce una url de un video de <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">youtube.com</a>.</label>
                <Form.Control
                    ref={inpVideoId}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=videoId"
                />
            </Form.Group>
            <div>{videoId}</div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={closeModal}>Cancelar</Button>
            <Button onClick={handleSelected} disabled={!videoId || videoId.length < 9}>Seleccionar</Button>
        </Modal.Footer>
    </>
}

const ImageAndVideo = ({ label, mensajeError, image, className, onClick, onChange, as }) => {
    let style = { border: '1px solid var(--grey-400)' };

    if (mensajeError) {
        style = { border: '1px solid var(--danger)' }
    }

    switch (as) {
        case 'video':
            return <FrameImageAndVideo label={label} mensajeError={mensajeError}>
                <div
                    className={`${className} ratio ratio-16x9 w-100 cursor-pointer rounded-lg overflow-hidden`}
                    style={style}
                    onClick={onClick}>
                    <div className="d-flex justify-content-center align-items-center">
                        {image
                            ? <img
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                src={image}
                                alt="publicacion"
                            />
                            : <div><i className="fab fa-youtube mr-1"></i>Seleccionar video</div>
                        }
                    </div>
                </div>
            </FrameImageAndVideo>
        default:
            return <FrameImageAndVideo label={label} mensajeError={mensajeError}>
                <label
                    className={`${className} w-100 mb-0 d-inline-block ratio ratio-16x9 cursor-pointer rounded-lg overflow-hidden`}
                    style={style}>
                    <div className="d-flex justify-content-center align-items-center">
                        {image
                            ? <img
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                                src={image}
                                alt={'publicaci\u00f3n'}
                            />
                            : <div><i className="far fa-image mr-1" />Seleccionar imagen</div>
                        }
                    </div>
                    <input type="file" className="d-none" onChange={onChange} />
                </label>
            </FrameImageAndVideo>
    }
}

const FrameImageAndVideo = ({ children, label, mensajeError }) => {
    return <div className="form-group">
        <div className="text-small mb-1"><span>{label}</span></div>
        {children}
        {mensajeError && <div className="text-danger small">{mensajeError}</div>}
    </div>


}

const ContentBlack = ({ titulo, image, videoId, tipo }) => {
    return <div className="w-100 h-100 p-3 overflow-hidden" style={{ backgroundColor: 'black' }}>
        <div className="container">
            <h3 className="t3 text-white">{titulo ? titulo : 'Titulo de la publicación'}</h3>
        </div>
        <div className="d-flex justify-content-center align-items-center h-100">
            {tipo === 'video'
                ? <>
                    {videoId
                        ? <div className="ratio ratio-16x9 w-75">
                            <div>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                        : <div>
                            <p>Seleccione el id del video de youtube</p>
                        </div>
                    }
                </>
                : <>
                    {image
                        ? <img
                            src={image}
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                            alt="publicacion"
                        />
                        : <img
                            src={imageDefault}
                            alt="publicacion"
                            style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                    }
                </>
            }
        </div>
    </div>
}

const Frame = (props) => (
    <div className="d-flex overflow-hidden" style={{
        height: '100vh',
        maxHeight: 'calc(100vh - var(--header-height) - var(--topbar-height))',
        position: 'sticky',
        top: 'calc(var(--header-height) + var(--topbar-height))'
    }}>
        {props.children}
    </div>

)
const FrameLeft = (props) => (
    <div className="w-100 h-100 border-right shadow bg-white"
        style={{ maxWidth: '360px' }}>
        {props.children}
    </div>
)
const FrameRight = (props) => (
    <div className="w-100 h-100">
        {props.children}
    </div>
)


export default NewPost;