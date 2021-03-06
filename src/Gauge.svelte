<script>
  import { tweened } from 'svelte/motion'
  import { arc } from 'd3-shape';
  import { scaleLinear } from 'd3-scale';
  export let maxValue;
  export let minValue;
  export let value;
  export let unit;
  export let label;
  export let toFixed;
  export let fillColor = '#27cc95';

  let indicator = tweened(0)
  
  $: scale = scaleLinear()
    .domain([minValue || 0, maxValue])
    .range([0, 1]);
  $: precentage = scale(value);
  $: angleScale = scaleLinear()
    .domain([0, 1])
    .range([-Math.PI / 2, Math.PI / 2])
    .clamp(true);
  $: angle = angleScale(precentage);
  let backgroundArc = arc()
    .innerRadius(0.75)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(Math.PI / 2)
    .cornerRadius(1);
  $: filledArc = arc()
    .innerRadius(0.75)
    .outerRadius(1)
    .startAngle(-Math.PI / 2)
    .endAngle(angle)
    .cornerRadius(1);

  $: {
    indicator.set(angle)  
  }
</script>

<style>
  .value {
    font-size: 3.5em;
    font-weight: 900;
    font-feature-settings: 'zero', 'tnum' 1;
  }
  .gauge {
    position: relative;
    display: inline-block;
  }
  .label {
    width: 180px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%);
  }

  .labelName {
    font-size: 1.25em;
    color: #888;
    font-weight: bold;
    text-align: center;
  }

  .circle {
    width: 15em;
  }

  .dial {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transform-origin: center bottom;
    width: 10em;
    height: 5em;
  }
</style>

<div class="gauge">
  <svg viewBox="-1,-1,2,1" class="circle">
    <path d={backgroundArc()} fill="#aaa" />
    <path d={filledArc()} fill={fillColor} />
  </svg>
  <svg style={`transform: translateX(-50%) rotate(${$indicator}rad);`} class="dial" width="9" height="23" viewBox="0 0 9 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0L8.02368 18.5089C8.5256 20.8178 6.76678 23 4.40402 23V23C2.10447 23 0.360582 20.9267 0.754589 18.6611L4 0Z" fill="#C4C4C4"/>
  </svg>
    
  
  <span class="label">
    <span class="labelName">{label}</span>
    <div>
      <span class="value" style="color: {fillColor}"> {toFixed ? value.toFixed(toFixed) : Math.floor(value)} <small>{unit}</small></span>
    </div>
  </span>
</div>