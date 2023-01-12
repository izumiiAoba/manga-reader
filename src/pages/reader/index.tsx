import { useLocation } from '@solidjs/router';
import { Component, createMemo, onMount } from 'solid-js';
import ImgIdCoder from '$src/data/img-id-coder';

const useReadingInfo = () => {
  const location = useLocation();
  const info = createMemo(() => {
    const hash = location.hash.slice(1);
    return ImgIdCoder.decode(hash);
  });
  return info()?;
};

const Reader: Component = () => {
  const info = useReadingInfo();

  onMount(() => {
    if (!info()) return;
    console.log(info());
  });

  return <></>;
};

export default Reader;
