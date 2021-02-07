import logo from './logo.svg';
import './App.css';
import Modal from 'react-modal'
import React, {useState} from 'react'

Modal.setAppElement('#root')
function App() {
  const [selectedImages, setSelectedImage] = useState([])

  const imageHandleChange = (e) =>{
    // console.log(e.target.files)
    if (e.target.files){
      const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
      console.log(fileArray)


      setSelectedImage((prevImages)=>prevImages.concat(fileArray))
      Array.from(e.target.files).map(
        (file)=>URL.revokeObjectURL(file)
      )
    }
  }

  const renderPhotos = (source) =>{
    return source.map((photo) =>{
      return <img src= {photo} key={photo}/>
    })
  }

  const [modalISOpen, setModalIsOpen] = useState(false)
  return (
    <div className="App">
      <button onClick = {() => setModalIsOpen(true)}>REPORT</button>
      <Modal isOpen={modalISOpen} onRequestClose={()=> setModalIsOpen(false)}>
        <form>
        <label>
          Name:
        <input type="text" name="name" />
        </label>
        <br/>
        <br/>
        Type of Emergency:  
        <select>
          <option selected value>Select....</option>
          <option value="robbery">Robbery</option>
          <option value="fire">Fire</option>
          <option  value="murder">Murder</option>
          <option value="earthquake">Earthquake</option>
        </select>
        <br/>
        <br/>
        <input type= "file" multiple name= "picture" onChange={imageHandleChange}></input>
        {renderPhotos(selectedImages)}
        <br/>
        <br/>
        <input type="submit" value="Submit" />
        <button onClick={() => setModalIsOpen(false)}> Close</button>
        </form>
      </Modal>
    </div>
  );
}

export default App;
