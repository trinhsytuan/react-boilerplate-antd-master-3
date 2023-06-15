import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CloudUploadOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';

import { API } from '@api';

import './DropzoneImage.scss';

function DropzoneImage({ allowChange, stateRerender, multiple, imgUrl, width, height, ...props }) {
  const [imagePreview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(null);
  }, [stateRerender]);

  function handleSelectImages(files) {
    if (!Array.isArray(files) || !files.length) return;
    if (multiple) {
      props.handleDropMulti(files);
    } else {
      setPreview(files[0]);
      props.handleDrop(files[0]);
    }
  }

  const existImg = imagePreview || imgUrl;
  return <>
    <Dropzone
      multiple={multiple} accept={'image/*'}
      disabled={!allowChange}
      onDrop={acceptedFiles => handleSelectImages(acceptedFiles)}
    >
      {({ getRootProps, getInputProps }) => (
        <div className={`custom-dropzone ${allowChange ? '' : 'disabled'}`} style={{ width, height }}>
          <div {...getRootProps()} className="bg-upload">
            <input {...getInputProps()} />

            {existImg && <>
              {imagePreview
                ? <img src={URL.createObjectURL(imagePreview)} alt=""/>
                : <img src={API.PREVIEW_ID.format(imgUrl)} alt=""/>}
            </>}
            {!existImg && allowChange && <div>
              <CloudUploadOutlined style={{ fontSize: 20 }}/>
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </div>}

          </div>
        </div>
      )}
    </Dropzone>
  </>;
}

DropzoneImage.propTypes = {
  handleDrop: PropTypes.func,
  handleDropMulti: PropTypes.func,
  multiple: PropTypes.bool,
  width: PropTypes.number || PropTypes.string,
  height: PropTypes.number || PropTypes.string,
  allowChange: PropTypes.bool,
};

DropzoneImage.defaultProps = {
  handleDrop: () => null,
  handleDropMulti: () => null,
  multiple: false,
  width: 150,
  height: 150,
  allowChange: true,
};


export default DropzoneImage;
