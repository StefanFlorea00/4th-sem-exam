import React, {useState, useEffect} from 'react';
import "./Loading.scss";
export type Props = {
  className?: string;
  hasErrorText?: boolean;
};

function LoadingSVG(props: Props) {

  const [errorText, setErrorText] = useState("YEet");
  const texts = ["Asking the companies", "Making an impact", "Getting Data","Counting the money", "Making an impact", "Making an impact", "Pro tip: If you have questions, ask in the chatrooms!", "Pro tip: You can zoom on charts", "Share the stock graph if you have doubts"]

  useEffect(() => {
    setErrorText(texts[Math.floor(Math.random()*10)]);
    const interval = setInterval(() => {
      console.log(errorText)
      setErrorText(texts[Math.floor(Math.random()*10)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="loading-svg">
      <svg
        className={props.className}
        version='1.1'
        id='L9'
        xmlns='http://www.w3.org/2000/svg'
        xmlns-Href='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 100 100'
        enableBackground='new 0 0 0 0'
        xmlSpace='preserve'>
        
        <path
          id='circle'
          fill='#fff'
          d='M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50'
        >
          <animateTransform
            attributeName='transform'
            attributeType='XML'
            type='rotate'
            dur='1s'
            from='0 50 50'
            to='360 50 50'
            repeatCount='indefinite'
          />
        </path>
      </svg>
      {props.hasErrorText && <p className="centered">{errorText}</p>}
    </div>
  );
}

export default LoadingSVG;
