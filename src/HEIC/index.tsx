/*
 * @Author: Hong.Zhang
 * @Date: 2022-10-08 17:01:46
 * @Description: 
 */
import React, { useEffect, useState } from 'react';
import heic2any from 'heic2any';

export default function HEIC(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, ...rest } = props;
  const [url, setUrl] = useState(src);

  useEffect(() => {
    async function getImageContent() {
      const res = await fetch(src||'');
      const type = res.headers.get('content-type') || 'image/*';
      if (type === 'image/heic') {
        const blob = await res.blob();
        const transfered = await heic2any({ 
          blob,
          toType: "image/jpeg",
          quality: 0.5,
        });
        if (!Array.isArray(transfered)) {
          setUrl(URL.createObjectURL(transfered));
        } 
      } else {
        // doNothing;
      }
    }
    getImageContent();
  }, [src]);

  return (
    <img
      src={url}
      {...rest}
    />
  );
}