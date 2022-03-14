import axios from './axios';
import { GAME_ID, NOMINATION_ID } from './consts';

export const getMyContests = async () => {
  try {
    const { data } = await axios.get('/auth/my-contests');
    return data;
  } catch (error) {
    return { error };
  }
};

export const joinToContest = async () => {
  try {
    const { data } = await axios.post(`/contests/${GAME_ID}/join`);

    return data;
  } catch (error) {
    return { error };
  }
};

export const getMe = async () => {
  try {
    const { data } = await axios.get('/auth/me');

    return data;
  } catch (error) {
    return { error };
  }
};

export const getAllQuestions = async () => {
  try {
    const { data } = await axios.get(
      `/contests/${GAME_ID}/nominations/${NOMINATION_ID}/tasks`
    );

    return data;
  } catch (error) {
    return { error };
  }
};

export const getQuestion = async (id) => {
  try {
    const { data } = await axios.get(
      `contests/${GAME_ID}/nominations/${NOMINATION_ID}/tasks/${id}`
    );

    return data;
  } catch (error) {
    return { error };
  }
};

export const postAnswer = async ({ text, id }) => {
  try {
    const { data } = await axios.post(
      `contests/${GAME_ID}/nominations/${NOMINATION_ID}/tasks/${id}/answer`,
      {
        text,
      }
    );

    return data;
  } catch (error) {
    return { error };
  }
};

export const getAllNominations = async () => {
  try {
    const { data } = await axios.get(`/contests/${GAME_ID}/nominations`);

    return data;
  } catch (error) {
    return { error };
  }
};

export const getRating = async (ratingId) => {
  try {
    const { data } = await axios.get(`contests/${GAME_ID}/rating/${ratingId}`);

    return data;
  } catch (error) {
    return { error };
  }
};
