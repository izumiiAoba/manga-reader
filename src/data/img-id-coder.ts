import { MangaInfo } from './use-manga-info';

const SEPARATOR = '>';

const encode = (
  {
    mangaId,
    chapterIndex,
    pageIndex,
  }: {mangaId: MangaInfo['id']; chapterIndex: number; pageIndex: number},
): string => [
  mangaId,
  chapterIndex,
  pageIndex,
].join(SEPARATOR);

const decode = (codeStr: string): Parameters<typeof encode>[0] | undefined => {
  const result = codeStr.split(SEPARATOR);
  if (result.length !== 3) return undefined;

  const mangaId = result[0];
  const chapterIndex = Number.parseInt(result[1], 10);
  const pageIndex = Number.parseInt(result[2], 10);
  if (!mangaId) return undefined;
  if (Number.isNaN(chapterIndex)) return undefined;
  if (Number.isNaN(pageIndex)) return undefined;

  return { mangaId, chapterIndex, pageIndex };
};

export default { encode, decode };
