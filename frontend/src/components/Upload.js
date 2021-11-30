import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
import { Link } from "react-router-dom";
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { fileUpload, clearErrors, allFiles } from '../actions/fileActions';
import { logout } from '../actions/userActions'
import { FaTimes, FaDownload, FaShare } from 'react-icons/fa'
import axios from 'axios'
import fileDownload from "js-file-download";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FilePond, File, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

const Upload = ({ history }) => {

  const [file, setFile] = useState();

  //const [uploads, setUploads] = useState()

  // const handleChange = (name) => (e) => {
  //   const value = name === "file" ? e.target.files[0] : e.target.value;
  //   setData({ ...data, [name]: value });
  // };

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading } = useSelector(state => state.allfiles)
  const { uploads } = useSelector(state => state.allfiles)
  
  const { user } = useSelector(state => state.auth);



  useEffect(() => {

    dispatch(allFiles());
    
  

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error])

  // const submitHandler = e => {
  //   e.preventDefault();

  //   let formData = new FormData();
  //     formData.append("file", data.file);
  //     formData.append("name", data.name);

  //   dispatch(fileUpload(formData));
  // };

  const submitHandler = e => {
    dispatch(fileUpload(file));
  }

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/share/${id}`)
      if (res.ok) {
       // const updatedUpload = uploads.filter((upload) => upload._id !== id);
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const logoutHandler = () => {
    dispatch(logout());
    alert.success(`Logged out successfully👋`)
  }

  return (
    <Fragment>
      <MetaData title={'Upload'} />
      <header className="header">
        <Link className="add" to = '#'>About</Link>
        <Link className="add" to='/'>
          <img className="favimg" src="/favicon.png" alt="hosting-logo" />
        </Link>
        {user ? (
          <div className="c">
            <p className="user-name">{ `${user && user.name}🧑🏼` }</p>
            <button onClick={ logoutHandler } className="logout-btn" to = '/SignUp'>Logout</button>
          </div>
        ) : !loading && (
          <div>
            <Link className="add" to = '/login'>Login</Link>
            <Link className="add-create" to = '/SignUp'>Create account</Link>
        </div>
        )}
        
      </header>

      <div className="upload-text">
        <h1>Upload and share your images.</h1>
      </div>

      <p className="upload-p">
        Choose / Drag and drop anywhere you want and start uploading your images now.
        Fast and secure way to save your files and doc. protection...</p>

      <form className="action" onSubmit={submitHandler} encType='multipart/form-data'>
        <FilePond
          files={file}
          onupdatefiles={setFile}
          allowMultiple={true}
          maxFiles={3}
          server="/api/v1/share"
          name="file"
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
      </form>

      <div className="uploading">
      <h1>ALL UPLOADS🚀</h1>
      </div>
      {uploads.length === 0 ?
        <h1 className="nodownload">There are no downloads yet..😥</h1> : (
          <Fragment>
            <div className="uploads">
            {uploads && uploads.map(upload => (
              <div key={upload._id} className="main-upload">
              <img src={upload.file.url} alt="src" className="img-upload" />
              <div className='p-2'>
                  <h2>{ upload.name }</h2>
                <div className='space'>
                  <button className="btn-danger" style={{ cursor: 'pointer' }}
                      disabled={loading ? true : false}
                      onClick={() => handleDelete(upload._id)}
                    >
                      <FaTimes/>
                  </button>
                  <button className="btn-download" style={{ cursor: 'pointer' }}
                      disabled={loading ? true : false}
                    onClick={() => {handleDownload(upload.file.url, `${upload.name}`)}}>
                      <FaDownload/>
                  </button>
                    <CopyToClipboard text={upload.file.url}>
                      <button className="btn-share" style={{ cursor: 'pointer' }}
                        onClick={() => alert.success('Link Copied')}>
                        <FaShare/>
                      </button>
                    </CopyToClipboard>
                </div>
              </div>
            </div>
          ))}
      </div>
          </Fragment>
        )
        
      }
    </Fragment>
  );
};

export default Upload;
