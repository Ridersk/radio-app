interface StationBase {
  id: string;
  title: string;
  image: string;
}

interface Station extends StationBase {
  url: string;
}

interface StationCategory {
  id: string;
  title: string;
  image: string;
}
