import { Image } from "react-native";


function getFileUri(file){
  return Image.resolveAssetSource(file).uri;
}

const podcasts = [
  {
    id: "1",
    title: "91.3 WYEP",
    image: getFileUri(require("./stations/wyep.png")),
    url: "https://ais-sa3.cdnstream1.com/2557_128.mp3?DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY5ODcyMDYyNiwiaXNzIjoidGlzcnYifQ.wKfoT6_xslTV5l4T2L4jjGz3cVuwd7-6M02UVPYXH60",
  },
  {
    id: "2",
    title: "Highway 65 Radio",
    image: getFileUri(require("./stations/highway_65_radio.webp")),
    url: "https://hydra.cdnstream.com/1924_64",
  },
  {
    id: "3",
    title: "94.9 The Rock",
    image: getFileUri(require("./stations/the_rock.webp")),
    url: "https://15113.live.streamtheworld.com/CKGEFM.mp3?DIST=TuneIn&TGT=TuneIn&maxServers=2&gdpr=0&us_privacy=1YNY&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTY5ODcyMjE3MCwiaXNzIjoidGlzcnYifQ.BmjvAiT-b5zw3t3c_LiAY3gLgbu3P9bn8Dz-kpqefz0",
  },
  {
    id: "4",
    title: "Urbanadio.com",
    image: getFileUri(require("./stations/urbanadio.webp")),
    url: "https://hydra.cdnstream.com/1537_128",
  },
  {
    id: "5",
    title: "Jovem Pan FM Brasília",
    image: getFileUri(require("./stations/jovem_pan.webp")),
    url: "https://ssl1.transmissaodigital.com:2274/stream"
  }
];

export default podcasts;
