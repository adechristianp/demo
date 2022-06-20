Ani-Animo is the platform to serve anime lovers to fulfill their love for anime.

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This web application has an `Anime List `page with pagination to show all anime provided by the API, `Anime Detail` to show the detail data of the anime, `Collection List` page to show collection group, and `Collection Detail` page to show the list of anime collection.

## Anime List
In the `Anime List` you can navigate to `Anime Detail` by clicking the anime `Card` and navigate to `Collection List` by clicking collection `Link` on the screen. You can bulk add anime to the collection by clicking the `Bulk Add` action, it will show a `checkbox` on top of each anime `Card` and will add one action button on the screen which is called `Collect`. After selecting your desired anime, and you click the `Collect` button, it will trigger a popup to select your desired collection to save the animes you've selected. If there is no collection added yet, you can add it by inputting the collection name on the input field in the popup and clicking the `Add` button to add a new collection group. After you select the collection you can click the `Save` button at the bottom of the popup to save the anime to the collection.

## Anime Detail
In the `Anime Detail` you also can add anime to the collection by click add button. It will show popup to select your desired collection. After the anime saved to the collection, the button `Collected In` will be enabled. When you click it, it will show list of collections where the anime is collected. When you click the collection name on the list, it will navigating to `Collection Detail` page.


## Collection List
In the `Collection List`, you will see a list of collections you've saved. On each collection list, there is an `edit` and `remove` icon. Edit icon is used to edit the collection name, by clicking the icon, will trigger the popup to input the collection name. The remove icon is used to remove the collection from the list. It will trigger a confirmation popup on clicking the icon.

## Collection Detail
In the `Collection Detail` will show the anime list you have saved to the collection. On each anime `Card` there is a `remove` icon. The remove icon is used to remove the selected anime from the collection. You can also edit the collection name insidte the `Collection Detail` page by clicking the edit icon beside the `Collection Name` bellow the `toolbar`.


