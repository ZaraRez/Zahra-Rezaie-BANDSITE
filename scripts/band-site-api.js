class BandSiteApi {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
  }

  async postComment(comment) {
    try {
      const response = await fetch(
        `${this.baseUrl}/comments?api_key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error posting comment:", error);
      throw error;
    }
  }

  async getComments() {
    try {
      const response = await fetch(
        `${this.baseUrl}/comments?api_key=${this.apiKey}`
      );
      let data = await response.json();
      // Sort comments from newest to oldest
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return data;
    } catch (error) {
      console.error("Error getting comments:", error);
      throw error;
    }
  }

  async getShows() {
    try {
      const response = await fetch(
        `${this.baseUrl}/shows?api_key=${this.apiKey}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getting shows:", error);
      throw error;
    }
  }
}

const apiKey = "51bcfc4c-0d5d-47dd-9c45-3f67d8a9d3e4";
const bandSiteApi = new BandSiteApi(apiKey);

export default bandSiteApi;
