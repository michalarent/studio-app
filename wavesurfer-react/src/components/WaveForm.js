import React from "react";

WaveForm.defaultProps = {
  waveColor: "violet",
  progressColor: "purple",
  id: "waveform"
};

export default function WaveForm({id, children}) {

  return <div id={id}>{children}</div>
}




