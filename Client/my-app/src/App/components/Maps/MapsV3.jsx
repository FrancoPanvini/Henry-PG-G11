import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { FaDog } from 'react-icons/fa';
import axios from 'axios';
import {format} from 'timeago.js'
//import Modal from '../pop-up/modal'

export default function MapsV2() {
  const [ubication, setUbication] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const isLogged = useSelector((state) => state.isLogged);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '84vh',
    latitude: 4.710989,
    longitude: -74.08175,
    zoom: 10,
  });

  useEffect(() => {
    const ubications = async () => {
      try {
        const res = await axios.get('/pets');
        setUbication(res.data.rows);
        console.log(res.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    ubications();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id)
  }

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken='pk.eyJ1IjoiZGF2aWRtZW5sb3AiLCJhIjoiY2t1Z2RmdWZ4MjJ3MjMwbWF2Z2Fwb2tmZiJ9.8YK2w11gWN9DUwXsG_tHjQ'
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle='mapbox://styles/davidmenlop/ckugem2fr00vy18p8doohuwax'>
        {ubication.map((p) => (
          <div>
            <Marker
              latitude={4.710989} //p.lat
              longitude={-74.08175} //p.long
              offsetLeft={-20}
              offsetTop={-10}>
              <div>
                <FaDog style={{ fontSize: viewport.zoom * 2, cursor:"pointer" }} onClick={()=> handleMarkerClick(p.id)} />
              </div>
            </Marker>
            {p.id === currentPlaceId &&
            <Popup
              latitude={4.710989} //p.lat
              longitude={-74.08175} //p.long
              closeButton={true}
              closeOnClick={false}
              onClose={()=>setCurrentPlaceId(null)}
              anchor='left'>
              <div className='h-50 w-52 flex flex-col justify-around'>
                <label className='text-primary text-base border-b-2 my-2 w-max'>
                  Nombre:
                </label>
                <h4 className='font-bold'>{p.name}</h4>
                <label className='text-primary text-base border-b-2 my-2 w-max'>
                  Tipo:
                </label>
                <h4 className='font-bold'>{p.type}</h4>
                <label className='text-primary text-base border-b-2 my-2 w-max'>
                  Sexo:
                </label>
                <h4 className='font-bold'>{p.sex}</h4>
                <label className='text-primary text-base border-b-2 my-2 w-max'>
                  Edad:
                </label>
                <h4 className='font-bold'>{p.age}</h4>
                <label className='text-primary text-base border-b-2 my-2 w-max'>
                  Publicado:{' '}
                </label>
                <span className='date'>{format(p.createdAt)}</span>
                {isLogged ? (
              <div>
                <button
                  className="btn bg-yellow-600 text-white border-yellow-700 rounded-md"
                  onClick={() => setIsOpen(true)}
                >
                  <h2 className="p-2">Postulate</h2>
                </button>

                <Modal
                  open={isOpen}
                  onClose={() => setIsOpen(false)}
                ></Modal>
              </div>
            ) : null}
                
              </div>
            </Popup>
            }
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}
