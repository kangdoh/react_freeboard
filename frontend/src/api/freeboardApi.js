import axios from "axios";

export const getFreeBoardView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/boards/${id}`);
      return res.data;
    }
    catch (error) {
      console.error("boardView Error", error);
      throw error
    }
};


