export function updateOscillators(attributes, audioCtx, oscillators) {
  // Use attributes to change the oscillator frequency and type
  if (oscillators) {
    attributes.forEach((attribute, index) => {
      if (attribute.trait_type.startsWith('Face#') && oscillators[attribute.trait_type]) {
        //Adjust frequency value 
        let frequencyValue = attribute.value * 30;

        oscillators[attribute.trait_type].frequency.value = frequencyValue;

        //Adjust the type of the oscillator based on the color of the face
        /*if (attribute.trait_type.includes("red")) {
          oscillators[attribute.trait_type].type = 'square';
        } else if (attribute.trait_type.includes("orange")) {
          oscillators[attribute.trait_type].type = 'square';
        } else if (attribute.trait_type.includes("yellow")) {
          oscillators[attribute.trait_type].type = 'square';
        } else if (attribute.trait_type.includes("green")) {
          oscillators[attribute.trait_type].type = 'square';
        } else if (attribute.trait_type.includes("blue")) {
          oscillators[attribute.trait_type].type = 'square';
        } else if (attribute.trait_type.includes("purple")) {
          oscillators[attribute.trait_type].type = 'square';
        }*/

        // all square
        oscillators[attribute.trait_type].type = 'square';

        //Add a rhythm to the sound
        oscillators[attribute.trait_type].start(audioCtx.currentTime + index * 0.3);
        oscillators[attribute.trait_type].stop(audioCtx.currentTime + (index * 0.3) + 0.1);
      }
    });
  }
}
