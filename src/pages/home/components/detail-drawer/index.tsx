import { A as Link } from '@solidjs/router';
import {
  Component, JSX, Show, For,
} from 'solid-js';
import { Portal } from 'solid-js/web';
import UrlTransformer from '$src/data/url-transformer';
import { MangaChapter, MangaInfo } from '$src/data/use-manga-info';
import { URL_PREFIX } from '$src/router';
import styles from './style.module.less';

type Props = {
    info?: MangaInfo;
    onClose: () => void;
}

const MangaDetailDrawer: Component<Props> = (props) => {
  const handleClose = () => {
    props.onClose();
  };

  const renderChapterList = (chapters: MangaChapter[]): JSX.Element => (
    <For each={chapters}>
      { ({ name }, index) => (
        <Link
          class={styles.chapter}
          href={`${URL_PREFIX}/read/${props.info!.id}/${index()}`}
        >
          { name }
        </Link>
      ) }
    </For>
  );

  return (
    <Portal mount={document.getElementById('root') ?? undefined}>
      <Show when={props.info}>
        <div class={styles.bgMask} onClick={handleClose} />
        <div class={styles.detailDrawer}>
          <div class={styles.briefInfo}>
            <img src={UrlTransformer.getCover(props.info!.id)} alt="cover" />
            <h5>{ props.info!.title }</h5>
          </div>
          <div class={styles.chapterList}>{ renderChapterList(props.info!.chapters) }</div>
        </div>
      </Show>
    </Portal>
  );
};

export default MangaDetailDrawer;
