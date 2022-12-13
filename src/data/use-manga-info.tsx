import {
  createContext, createResource, ParentComponent, Resource, useContext,
} from 'solid-js';

export type MangaChapter = {
  name: string;
  total: number;
}

export type MangaInfo = {
  id: string;
  title: string;
  chapters: MangaChapter[];
}

const OSS_BUCKET: string = import.meta.env.VITE_ALI_OSS_BUCKET;
const DATA_FILE: string = 'manga-info.json';

const fetchMangaInfoFromAliOss = async (): Promise<MangaInfo[]> => {
  const response = await fetch(
    `${OSS_BUCKET}/${DATA_FILE}`,
    {
      method: 'POST',
    },
  );
  console.log(response);
  return [];
};

const CONTEXT_DEFAULT_PENDING = (() => undefined) as Resource<MangaInfo[]>;
CONTEXT_DEFAULT_PENDING.state = 'pending';
CONTEXT_DEFAULT_PENDING.loading = true;
const context = createContext<Resource<MangaInfo[]>>(CONTEXT_DEFAULT_PENDING);
const { Provider } = context;

const MangaInfoProvider: ParentComponent = (props) => {
  const [data] = createResource(fetchMangaInfoFromAliOss);

  return (
    <Provider value={data}>
      { props.children }
    </Provider>
  );
};

export const useMangaInfo = () => useContext(context);

export default MangaInfoProvider;
