import React, { useState, useEffect, useContext } from 'react';
import Button from '../../Buttons/Button';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { AuthContext } from '../../../Auth';
import { getDoc } from '../../FirebaseApp';
import app from '../../FirebaseApp';
import { createPost } from '../../FirebaseApp';
import LoadingSVG from '../../Assets/Loading';

function ShareStock(props: any) {
  const [postContent, setPostContent] = useState('');
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState<any>();
  const [loading, setLoading] = useState(false);

  const postStockInfoText = `${props.companyInfoAV.Name} /*/ ${props.companyInfoTD.meta.interval} /*/ `;

  type ChartImg = {
    name: string;
  };
  useEffect(() => {
    getDoc(app.auth().currentUser).then(data => {
      setUserInfo(data);
    });
  }, []);

  async function uploadChartImg(e: any) {
    e.preventDefault();
    setLoading(true);

    await getChartImage('.echarts-for-react').then((img: ChartImg | null) => {
      if (img) {
        const uploadTask = app
          .storage()
          .ref(`/images/${img.name}`)
          .put(img as any);
        uploadTask.on('state_changed', console.log, console.error, () => {
          app
            .storage()
            .ref('images')
            .child(img.name)
            .getDownloadURL()
            .then(url => {
              handlePostUpload(url);
            });
        });
      }
    });
  }

  async function handlePostUpload(url: string) {
    try {
      await createPost(app.auth().currentUser, {
        comments: [],
        media: url,
        content: postContent,
        companyDesc: postStockInfoText ?? 'Graph not found',
      }).then(() => {
        setPostContent('');
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  async function getChartImage(element: string) {
    const chartImg: any = await htmlToImage.toBlob(
      document.querySelector(element) as any,
      { quality: 0.7, backgroundColor: '#FFFFFF' }
    );

    if (chartImg) {
      const timestamp = new Date().getTime();
      chartImg.name = `chartimg-${currentUser.uid}-${timestamp}.jpg`;
      return chartImg;
    } else {
      return null;
    }
  }

  return (
    <div className='share-stock'>
      <form onSubmit={uploadChartImg}>
        {loading && <LoadingSVG hasErrorText className='sharing-loading' />}

        <textarea
          className={`share-stock-text ${loading && 'text-loading'}`}
          placeholder='Write text here...'
          value={postContent}
          onChange={event => setPostContent(event.target.value)}
          disabled={loading && true}
        />
        <Button type='secondary' text='Share' />
      </form>
    </div>
  );
}

export default ShareStock;
