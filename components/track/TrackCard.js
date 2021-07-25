import React from "react";
import styles from "./TrackCard.module.css";
import { IoIosPlay } from "react-icons/io";
import dynamic from "next/dynamic";
import { useRef, useCallback, useMemo } from "react";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min";
import WaveForm from "../../wavesurfer-react/src/components/WaveForm.js";

export default function TrackCard({
  title,
  album,
  image,
  duration,
  priceNormal,
  priceExclusive,
  url,
  id,
  color,
  wavesurfers,
  handleAddWavesurfer,
  tags,
}) {
  const [timelineVis, setTimelineVis] = React.useState(true);
  const [cursorVis, setCursorVis] = React.useState(true);
  console.log(tags);

  const WaveSurfer = dynamic(
    () => import("../../wavesurfer-react/src/containers/WaveSurfer.js"),
    { ssr: false }
  );
  //   const WaveForm = dynamic(
  //     () => import("../../wavesurfer-react/src/components/WaveForm.js"),
  //     { ssr: false }
  //   );

  const plugins = [
    {
      plugin: TimelinePlugin,
      options: {
        container: "#timeline",
      },
    },
    {
      plugin: CursorPlugin,
      options: {
        opacity: 1,
        color: "white",

        container: "#cursor",
      },
    },
  ];

  const wavesurferRef = useRef();

  const handleWSMount = useCallback((waveSurfer) => {
    wavesurferRef.current = waveSurfer;

    if (wavesurferRef.current) {
      wavesurferRef.current.load(url);

      wavesurferRef.current.on("ready", () => {
        console.log("WaveSurfer is ready");
      });

      wavesurferRef.current.on("loading", (data) => {
        console.log("loading --> ", data);
      });

      if (window) {
        window.surferidze = wavesurferRef.current;
      }
    }
  });

  //remove item from array
  const removeItem = (array, item) => {
    const i = array.indexOf(item);
    array.splice(i, 1);
    return array;
  };

  const play = useCallback(() => {
    wavesurferRef.current.playPause();
    for (var v in wavesurfers) {
      if (wavesurfers[v].current.isPlaying()) {
        if (wavesurfers[v] != wavesurferRef) {
          wavesurfers[v].current.pause();
        }
      }
    }
    wavesurfers.push(wavesurferRef);
  }, [wavesurferRef.current]);

  console.log(color);

  return (
    <div className={styles.track}>
      <div className={styles.trackCard}>
        <span className={styles.playButton} onClick={play}>
          <IoIosPlay color="black" size="3vh" />
        </span>
        <span className={styles.trackCardTitle}>{title}</span>
        <span className={styles.trackTags}>
          {tags.split("\n").map((tag, i) => (
            <span
              key={i}
              className={styles.trackCardTags}
              style={{ backgroundColor: color }}
            >
              {tag + " "}
            </span>
          ))}
        </span>
        <span className={styles.trackCardTitle}>{}</span>
      </div>
      <div className={styles.Waveform}>
        <WaveSurfer plugins={plugins} onMount={handleWSMount}>
          <WaveForm
            barWidth={4}
            barGap={3}
            barRadius={1}
            id={"waveforms" + id}
            className={styles.wave}
            waveColor={color}
            progressColor={"darkgray"}
          />

          <div className={styles.cursor} />
          <div id="timeline" className={styles.timeline} />
        </WaveSurfer>
      </div>
    </div>
  );
}
