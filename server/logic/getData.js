import extractor from "unfluff"; //html body extractor
import Parser from "rss-parser";
const parser = new Parser();
import got from "got"; //http client

import News from "./db.js";

const getData = async (url, category, source) => {
  //parsing the rss feed
  let feed = await parser.parseURL(url);

  let items = feed.items;

  //looping over items in RSS feed.
  items.map(async (item) => {
    //defining things from item
    let title = item.title;
    let link = item.link;
    let description = await item.contentSnippet;
    let date = item.pubDate;

    //check if the thing already exists in deb or not
    let alreadyExists = await News.exists({ link: link });

    if (!alreadyExists) {
      //getting the HTML of the article from link
      const response = await got(link);

      //parsing the received HTML to get useful data from it.
      const data = extractor(response.body);

      let content = await data.text;
      let imgLink = await data.image;

      //saving the data into the database
      News.create(
        {
          title,
          link,
          description,
          date,
          content,
          imgLink,
          category,
          source,
        },
        () => {
          console.log("DATA INSERTED");
        }
      );
    }
  });
};

export default getData;
