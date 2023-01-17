import React, { useRef, useState, useEffect } from 'react';
import { updateOscillators } from './updateOscillators';

function MetaDataAudio({ attributes }) {
  const [audioCtx, setAudioCtx] = useState(null);
  const [oscillators, setOscillators] = useState({});
  const audioRef = useRef(null);

  useEffect(() => {
    let newOscillators = {};
    if (!audioCtx) {
      const newAudioCtx = new AudioContext();
      setAudioCtx(newAudioCtx);
    }
    if (audioCtx) {
      attributes.forEach((attribute) => {
        if (attribute.trait_type.startsWith('Face#')) {
          newOscillators[attribute.trait_type] = audioCtx.createOscillator();
          newOscillators[attribute.trait_type].connect(audioCtx.destination);
        }
      });
      setOscillators(newOscillators);
    }
  }, [attributes, audioCtx]);


  useEffect(() => {
    if (!audioCtx) {
      return;
    }
    updateOscillators(attributes, audioCtx, oscillators);
  }, [attributes, audioCtx, oscillators]);

  const displayFrequencies = () => {
    return attributes.filter(attribute => attribute.trait_type.startsWith('Face#')).map((attribute, index) => {
      const frequencyValue = attribute.value * 30;
      return <span key={attribute.trait_type}>{index !== 0 ? ', ': ''} {frequencyValue}</span>;
    });
  };

  return (
    <div>
      Frequencies: {displayFrequencies()}
      <audio ref={audioRef} />
    </div>
  );
}

export default MetaDataAudio;
