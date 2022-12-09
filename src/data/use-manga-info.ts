export type MangaChapter = {
  name: string;
  total: number;
}

export type MangaInfo = {
  id: string;
  title: string;
  chapters: MangaChapter[];
}

const fetchMangaInfoFromAliOss = async () => {

};

const useMangaInfo = (): MangaInfo[] => {

};

export default useMangaInfo;
