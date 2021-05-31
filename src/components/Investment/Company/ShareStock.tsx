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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setUserInfo(data);
    });
  }, []);

  async function uploadChartImg(e:any){
    e.preventDefault();
    setLoading(true);

    await getChartImage('.echarts-for-react').then((img)=>{
      const uploadTask = app.storage().ref(`/images/${img.name}`).put(img);
      uploadTask.on("state_changed", console.log, console.error, () => {
      app.storage()
        .ref("images")
        .child(img.name)
        .getDownloadURL()
        .then((url) => {
          handlePostUpload(url)
          console.log("upload", url);
        })
      });
    })
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
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
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
          <form onSubmit={uploadChartImg}>
            {loading && <LoadingSVG className="sharing-loading" />}
            <textarea className='share-stock-text' placeholder="Write text here..." value={postContent} onChange={(event) => setPostContent(event.target.value)}/>
            <Button type='secondary' text="Share"/>
          </form>
    </div>
  );
}

export default ShareStock;

