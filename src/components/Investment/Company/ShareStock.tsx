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
  const [chartImg, setChartImg] = useState<Blob | null | undefined>();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setUserInfo(data);
    });

    console.log(currentUser);
  }, []);

  async function handleUpload(e: any) {  
    e.preventDefault();
    setLoading(true);

    const getChart: Blob | any = await getChartImage('.echarts-for-react');
    setChartImg(getChart);
  }

  useEffect(() => {
    !uploading && uploadChartImg();
  }, [chartImg])

  async function uploadChartImg(){
    if(chartImg !== undefined) {
      setUploading(true);
      const uploadTask = app.storage().ref(`/images/${chartImg.name}`).put(chartImg);
      await uploadTask.on("state_changed", console.log, console.error, () => {
      app.storage()
        .ref("images")
        .child(chartImg.name)
        .getDownloadURL()
        .then((url) => {
          handlePostUpload(url)
          console.log("upload", url);
        })
      });
    } else {
      handlePostUpload('')
    }
  }

  async function handlePostUpload(url: string) {
    try {
      await createPost(app.auth().currentUser, {
        comments: [],
        media: url,
        content: postContent,
      }).then(() => {
        setPostContent('');
        setLoading(false);
        setUploading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setUploading(false);
    }
  }

  async function getChartImage(element: string){
    const chartImg = await htmlToImage.toBlob(document.querySelector(element), { quality: 0.7, backgroundColor: "#FFFFFF" });
    const timestamp = new Date().getTime();
    chartImg.name = `chartimg-${currentUser.uid}-${timestamp}.jpg`;
    return chartImg;
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

