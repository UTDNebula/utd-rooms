import styles from './UTDRoomsShrug.module.css';

export default function UTDRoomsShrug() {
  return (
    <svg
      width="768"
      height="384"
      viewBox="0 0 384 384"
      version="1.1"
      id="svg1"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      stroke="black"
      strokeWidth={16}
    >
      <path
        d="m 173.547,276.555 -43.308,13.588"
        id="yl"
        className={styles.yl}
      />
      <path
        d="M 210.453,107.446 253.761,93.857"
        id="yr"
        className={styles.yr}
      />
      <path d="m 185.063,115.411 -49.5,-15.53" id="lt" className={styles.lt} />
      <path
        d="m 253.761,93.857 68.684,21.55 0.014,0.004"
        id="rt"
        className={styles.rt}
      />
      <path d="m 198.938,268.589 49.5,15.53" id="rb" className={styles.rb} />
      <path d="m 61.541,268.589 68.698,21.554" id="lb" className={styles.lb} />
      <path d="m 61.541,268.589 48.782,-151.42" id="ba" className={styles.ba} />
      <path
        d="m 185.063,115.411 c -18.27467,58.244 -36.54933,116.488 -54.824,174.732"
        id="bb"
        className={styles.bb}
      />
      <path
        d="M 253.761,93.857 C 235.48667,152.10133 217.21233,210.34567 198.938,268.59"
        id="bc"
        className={styles.bc}
      />
      <path
        d="m 322.459,115.411 -48.782,151.42"
        id="bd"
        className={styles.bd}
      />

      <ellipse
        strokeDasharray="445.7102910026 445.7102910026"
        strokeDashoffset="498.947909095"
        transform={'rotate(180 192 191.24606)'}
        id="ea"
        className={styles.ea}
        cx="192"
        cy="191.24606"
        rx="70.936996"
        ry="70.937004"
      />
      <ellipse
        strokeDasharray="445.7102910026 445.7102910026"
        strokeDashoffset="498.947909095"
        transform={'rotate(0 192 191.24606)'}
        id="eb"
        className={styles.eb}
        cx="192"
        cy="191.24606"
        rx="70.936996"
        ry="70.937004"
      />
    </svg>
  );
}
