'use server'

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

export const getUserFavEmoticonIds = async (userId: string | null) => {
  if (!userId) {
    return [];
  }

  try {
    const response = await turso.execute({
      sql: "SELECT emoticon_id FROM saved_collection WHERE user_id = (:userId)",
      args: {
        userId,
      },
    });

    const { rows } = response;

    return rows.map((row) => row.emoticon_id) as string[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const saveEmoticonToDefaultCollection = async (userId: string, emoticonId: string): Promise<boolean> => {
  try {
    await turso.execute({
      sql: "INSERT INTO saved_collection (user_id, emoticon_id, name) VALUES (:userId, :emoticonId, :name)",
      args: {
        userId,
        emoticonId,
        name: "Default"
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const removeEmoticonFromDefaultCollection = async (userId: string, emoticonId: string): Promise<boolean> => {
  try {
    await turso.execute({
      sql: "DELETE FROM saved_collection WHERE user_id = (:userId) AND emoticon_id = (:emoticonId)",
      args: {
        userId,
        emoticonId,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}