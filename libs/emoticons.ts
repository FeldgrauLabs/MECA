import { turso } from "./turso";

export interface GetEmoticonParams {
  pageNumber: number;
  pageSize: number;
  query?: string;
}

export interface Emoticon {
  id: string;
  display: string;
  chunkText: string;
}

export const getEmoticons = async ({
  pageNumber = 1,
  pageSize = 10,
  query = '',
}: GetEmoticonParams): Promise<Emoticon[]> => {
  try {
    const response = await turso.execute({
      sql: `SELECT * FROM emoticon WHERE chunk_text LIKE (:query) LIMIT (:limit) OFFSET (:offset)`,
      args: {
        query: `%${query}%`,
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      },
    });
  
    const { rows } = response;
  
    return rows.map((row) => ({
      id: row.id,
      display: row.emoticon,
      chunkText: row.chunk_text,
    })) as Emoticon[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getEmoticon = async (id: string): Promise<Emoticon | null> => {
  try {
    const response = await turso.execute({
      sql: "SELECT * FROM emoticon WHERE id = (:id)",
      args: {
        id,
      },
    });

    const { rows } = response;

    if (rows.length === 0) {
      return null;
    }

    const row = rows[0];

    return {
      id: row.id,
      display: row.emoticon,
      chunkText: row.chunk_text,
    } as Emoticon;
  } catch (error) {
    console.error(error);
    return null;
  }
}