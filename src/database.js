import { Client, ID, Query, TablesDB } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.equal("searchTerm", searchTerm)
    ]);

    if (result.rows.length > 0) {
      const row = result.rows[0];

      await tablesDB.updateRow(DATABASE_ID, TABLE_ID, row.$id, {
        count: row.count + 1
      });
    } else {
      await tablesDB.createRow(DATABASE_ID, TABLE_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await tablesDB.listRows(DATABASE_ID, TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])

    return result.rows;
  } catch (error) {
    console.error(error);
  }
}