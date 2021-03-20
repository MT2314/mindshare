import axios from "axios";

export default {
  // Gets all journals
  getJournals: function() {
    return axios.get("/api/journal");
  },
  // Gets the journal with the given id
  getJournal: function(id) {
    return axios.get("/api/journal/" + id);
  },
  // Deletes the journal with the given id
  deleteJournal: function(id) {
    return axios.delete("/api/journal/" + id);
  },
  // Saves a journal to the database
  saveJournal: function(journalData) {
    return axios.post("/api/journal", journalData);
  }
};
