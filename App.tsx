import { useState, useEffect, FormEvent } from 'react';

import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';
import Typist from 'react-typist';


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();
  }, [])

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;
    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }

  }
  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>
        {photos.length !== 0 &&
          <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
            <div>
              <input type="file" name="image" />
            </div>
            <div>
              <input type="submit" value="Enviar" />
            </div>
            {uploading && "Enviando..."}
          </C.UploadForm>

        }


        {loading &&
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div className="loading">
              <Typist>
                <span> Carregando...</span>
                <Typist.Backspace count={13} delay={400} />
                <span> Carregando...</span>
              </Typist>
            </div>

          </C.ScreenWarning>

        }

        {!loading && photos.length > 0 &&
          <C.PhotoList>

            {photos.map((item, index) => (

              <PhotoItem key={index} url={item.url} name={item.name} />


            ))}
          </C.PhotoList>

        }


        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😱</div>
            <div>
              <Typist>
                <p> Ainda não foi enviado nenhuma imagem.</p>
                <Typist.Delay ms={100} />
                <br />
                Faça o upload de uma imagem abaixo.
              </Typist>
            </div>
            <C.UploadForm className="form" method="POST" onSubmit={handleFormSubmit}>
                <input type="file" name="image" />
                <input type="submit" value="Enviar" />
              {uploading && "Enviando..."}
            </C.UploadForm>
          </C.ScreenWarning>
        }
      </C.Area>
    </C.Container>
  );
}

export default App;