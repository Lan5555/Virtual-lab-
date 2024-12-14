import anime from "animejs";
import { useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
interface Props {
  top1?: number;
  width?: number;
  height?: number;
  bottom1?: number;
  left1?: number;
  right1?: number;
  source: string;
  onclick?: () => void;
  callBack?: string;
}

const CreateImage: React.FC<Props> = ({
  top1 = 0,
  width = 100,
  height = 100,
  left1 = 'auto',
  right1 = 'auto',
  bottom1 = 'auto',
  source,
  onclick,
  callBack
}) => {
  // Consolidate all animations into one useEffect hook
  useEffect(() => {
    let animationInstance: anime.AnimeInstance | null = null;

    if (callBack) {
      switch (callBack) {
        case 'Spin':
          animationInstance = anime({
            targets: '.spin',
            rotate: '360deg',
            easing: 'easeInOutQuad',
            duration: 1000,
            loop: true
          });
          break;

        case 'Rotate':
          animationInstance = anime({
            targets: '.rotate',
            rotate: '90deg',
            easing: 'easeInOutQuad',
            duration: 2000,
            loop: true
          });
          break;

        case 'Scale':
          animationInstance = anime({
            targets: '.scale',
            scale: [0, 1],
            easing: 'easeInOutQuad',
            duration: 2000
          });
          break;

        case 'Transform':
          animationInstance = anime({
            targets: '.translate',
            translateX: 250,
            translateY: 100,
            easing: 'easeInOutQuad',
            duration: 2000
          });
          break;
        case 'Hello world':
          alert('Hello world');
          break
        default:
          break;
      }
    }

    // Cleanup function to stop animations if callBack changes or component unmounts
    return () => {
      if (animationInstance) {
        animationInstance.pause();
      }
    };
  }, [callBack]); // Dependencies are based on the callBack prop

  // Dynamically set the class based on the callBack prop
  const animationClass = callBack ? callBack.toLowerCase() : '';

  return (
    <img
      src={`/misc/competition/practical/${source}.png`}
      alt={''}
      style={{
        position: 'fixed',
        top: `${top1}px`,
        left: `${left1}px`,
        right: `${right1}px`,
        bottom: `${bottom1}px`,
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 200,
        transition: 'all 0.3s ease-in-out'
      }}
      onClick={onclick}
      className={animationClass} // Assign the class based on callback prop
    />
  );
};

export default CreateImage;
