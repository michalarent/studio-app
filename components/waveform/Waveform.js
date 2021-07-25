import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import dynamic from "next/dynamic";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#eee",
  progressColor: "OrangeRed",
  cursorColor: "OrangeRed",
  barWidth: 6,
  barRadius: 3,
  responsive: false,
  height: 20,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
});

export default function Waveform({ url, isPlaying }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(isPlaying);
  const [volume, setVolume] = useState(0.5);
  const [loaded, setLoaded] = useState(false);

  // create new WaveSurfer instance
  // On component mount and when url changes
  useEffect(() => {
    setPlay(isPlaying);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    console.log(loaded);
    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        setLoaded(true);
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
    });
    return () => wavesurfer.current.destroy();
  }, [url]);
  console.log(loaded);
  const handlePlayPause = () => {
    setPlay(!playing);

    wavesurfer.current.playPause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div id="waveform" ref={waveformRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>{!playing ? "Play" : "Pause"}</button>
        <input
          type="range"
          id="volume"
          name="volume"
          // waveSurfer recognize value of `0` same as `1`
          //  so we need to set some zero-ish value for silence
          min="0.01"
          max="1"
          step=".025"
          onChange={onVolumeChange}
          defaultValue={volume}
        />
        <label htmlFor="volume">Volume</label>
      </div>
    </div>
  );
}
