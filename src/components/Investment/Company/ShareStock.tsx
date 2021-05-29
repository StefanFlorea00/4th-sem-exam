import React, { useState, useEffect, useContext} from 'react';
import Button from '../../Buttons/Button';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AuthContext } from '../../../Auth';
import { getDoc } from '../../FirebaseApp';
import './ShareStock.scss';
import app from '../../FirebaseApp';
import { createPost, getCollection } from '../../FirebaseApp';
import LoadingSVG from '../../Assets/Loading';


function ShareStock(props: any) {

  const [postContent, setPostContent] = useState("");
  const {currentUser} = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<any>()
  const [chartImg, setChartImg] = useState<File>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setUserInfo(data);
    });

    console.log(currentUser);
  }, []);

  async function handleUpload(e: any) {  
    e.preventDefault();
    setLoading(true);

    getChartImage('.echarts-for-react');
    console.log(chartImg);

    if(chartImg !== undefined) {
      const uploadTask = app.storage().ref(`/images/${chartImg.name}`).put(chartImg);
      await uploadTask.on("state_changed", console.log, console.error, () => {
      app.storage()
        .ref("images")
        .child(chartImg.name)
        .getDownloadURL()
        .then((url) => {
          setChartImg(undefined);
          handlePostUpload(e, url)
          console.log("upload", url);
        })
      });
    } else {
      handlePostUpload(e, '')
    }
  }

  async function handlePostUpload(e:any, url: string) {
    try {
      await createPost(app.auth().currentUser, {
        comments: [],
        media: url,
        content: postContent,
      }).then(() => {
        setPostContent('');
        setLoading(false);
      });
    } catch (err) {
      console.log(err)
    }
  }

  async function getChartImage(element: string){
    htmlToImage.toBlob(document.querySelector(element), { quality: 0.95, backgroundColor: "#FFFFFF" })
      .then(function (blob) {
          const timestamp = new Date().getTime();
          blob.name = `chartimg${currentUser.uid}-${timestamp}.jpg`;
          setChartImg(blob);
      });
  }

  return (
    <div className='share-stock'>
          <form onSubmit={handleUpload}>
            {loading && <LoadingSVG className="sharing-loading" />}
            <textarea className='share-stock-text' placeholder="Write text here..." value={postContent} onChange={(event) => setPostContent(event.target.value)}/>
            <Button type='secondary' text="Share"/>
          </form>
    </div>
  );
}

export default ShareStock;

