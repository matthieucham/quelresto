import {HttpClient} from 'aurelia-http-client';

export class Restos {
   // Dependency inject the HttpClient
  static inject() { return [HttpClient]; }

  constructor(http) {
    this.http = http; // Assign the http client for use later
    this.restos = [];
    this.subreddit_url = "http://localhost:8000/quelresto/restos/?format=json";
  }

  loadRestos() {
    return this.http.get(this.subreddit_url).then(r => {
      // Assign the list of posts from the json response from reddit
      this.restos = r.content;
    });
  }

  // This is called once when the route activates
  activate() {
    return this.loadRestos();
	//console.log('prout');
  }
}