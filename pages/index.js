import React from "react";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";
import TrackCard from "../components/track/TrackCard";
import data from "../components/track/dummy.json";
import { getAllTracks } from "../lib/graphcms";

export async function getStaticProps() {
  const { tracks } = await getAllTracks();

  return {
    props: { tracks },
  };
}

export default function Home({ tracks }) {
  console.log(tracks);

  var wavesurfers = [];

  const colors = [
    "#1446A0",
    "#DB3069",
    "#F5D547",
    "#EBEBD3",
    "#3C3C3B",
    "#258EA6",
    "#549F93",
    "#806D40",
    "#42BFDD",
  ];

  // get random item from array
  const getRandom = (array) => array[Math.floor(Math.random() * array.length)];

  // get random item from array and remove it from array, when array is empty reinitialize it
  const getRandomAndRemove = (array) => {
    const item = getRandom(array);
    array.splice(array.indexOf(item), 1);
    array.push(
      "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
    );
    return item;
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("Uploaded a file");
    });
  };

  const onSubmit = (data) => {
    const file = data.track[0];

    dbx.filesUpload.put(data.track[0]).then(() => {
      console.log("Uploaded a file");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <>
        <p>Checkit</p>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            width: "83vw",
            overflowY: "scroll",
            border: "1px white solid",
          }}
        >
          {tracks.map((track) => (
            <>
              <TrackCard
                title={track.title}
                url={track.file.url}
                tags={track.tags}
                id={track.id}
                color={getRandomAndRemove(colors)}
                progressColor={getRandomAndRemove(colors)}
                wavesurfers={wavesurfers}
              />
            </>
          ))}
        </motion.div>
      </>
    </motion.div>
  );
}
