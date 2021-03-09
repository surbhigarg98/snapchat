import React, { useCallback, useRef} from 'react'
import Webcam from 'react-webcam'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useHistory } from 'react-router-dom';
import './Webcapture.css'
const videoConstraints = {
    height:400,
    width:250,
    facingMode : "user"
};

function WebCapture() {
    const webcamRef = useRef(null)
     const dispatch = useDispatch()
     const history = useHistory()
    const capture = useCallback(()=>{   //usecallbacck will save the previous o/p in cache
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCameraImage(imageSrc))
      history.push('/preview')
    },[webcamRef])
    return (
        <div className="webCapture">
            <Webcam 
            height={videoConstraints.height}
            audio={false}
            ref={webcamRef}
            width={videoConstraints.width}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}/>
            <RadioButtonUncheckedIcon className="webCapture__button"
            fontSize="large"
            onClick={capture}/>
          
        </div>
    )
}

export default WebCapture
