function ItemsBox() {
  const apps = [
    {
      name: "Search",
      image: "google.jpg",
      url: "www.google.com",
    },
    {
      name: "Photos",
      image: "photos.png",
      url: "www.google.com",
    },
    {
      name: "Maps",
      image: "maps.png",
      url: "www.google.com",
    },
    {
      name: "Apps",
      image: "play.png",
      url: "www.google.com",
    },
    {
      name: "Meet",
      image: "vedios.png",
      url: "www.google.com",
    },
    {
      name: "Scripts",
      image: "scripts.png",
      url: "www.google.com",
    },
    {
      name: "Drive",
      image: "drive.png",
      url: "www.google.com",
    },
  ];
  return (
    <div className="items">
      <div className="apps">
        {apps.map((app, i) => {
          return (
            <div className="app">
              <a href={app.url} target="blank">
                <div className="app-img">
                  <img src={app.image} alt={app.name} />
                </div>
                <h5>{app.name}</h5>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsBox;
